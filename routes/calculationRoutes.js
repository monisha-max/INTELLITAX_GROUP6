const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getOldTax, getSurcharge } = require('../utils/taxCalculations');
const UserTaxDetails = require('../models/userTaxDetails');

router.post('/calculate-tax', async (req, res) => {
    console.log('Session:', req.session);
    try {
        const {
            grossSalary: rawGrossSalary,
            baseSalary: rawBaseSalary,
            hraReceived: rawHraReceived,
            rentPaid: rawRentPaid,
            dearAllowance: rawDearAllowance,
            ltaReceived: rawLtaReceived,
            investment80c: rawInvestment80c,
            section80TTA: rawSection80TTA,
            section80D: rawSection80D,
            section80G: rawSection80G,
            section24: rawSection24,
            section80CCD1B: rawSection80CCD1B,
            section80CCD2: rawSection80CCD2,
            section80E: rawSection80E
        } = req.body;

        const grossSalary = parseFloat(req.body.grossSalary);
        const baseSalary = parseFloat(req.body.baseSalary);
        const hraReceived = parseFloat(req.body.hraReceived);
        const rentPaid = parseFloat(req.body.rentPaid);
        const dearAllowance = parseFloat(req.body.dearAllowance);
        const ltaReceived = parseFloat(req.body.ltaReceived);
        const investment80c = parseFloat(req.body.investment80c);
        const section80TTA = parseFloat(req.body.section80TTA);
        const section80D = parseFloat(req.body.section80D);
        const section80G = parseFloat(req.body.section80G);
        const section24 = parseFloat(req.body.section24);
        const section80CCD1B = parseFloat(req.body.section80CCD1B);
        const section80CCD2 = parseFloat(req.body.section80CCD2);
        const section80E = parseFloat(req.body.section80E);



        const userId = req.session.userId;
        if (!userId) {
            return res.status(403).send({ message: 'Not logged in' });
        }

        const taxYear = req.session.taxYear;

        let deductableAmount = 50000; // Fixed deductible amount
        // Add other deductions based on user input
        deductableAmount += Math.min(0.12 * baseSalary, 750000); // EPF Deduction
        deductableAmount += hraReceived;
        deductableAmount += Math.min(rentPaid, 60000); // Rent Paid
        deductableAmount += dearAllowance;
        deductableAmount += Math.min(ltaReceived, 50000); // LTA Received
        deductableAmount += Math.min(investment80c, 150000); // Investment under Section 80C
        deductableAmount += Math.min(section80TTA, 10000); // Section 80TTA
        deductableAmount += section80D; // Section 80D
        deductableAmount += section80G; // Section 80G
        deductableAmount += Math.min(section24, 200000); // Section 24
        deductableAmount += Math.min(section80CCD1B, 50000); // Section 80CCD1B
        deductableAmount += Math.min(section80CCD2, 0.1 * baseSalary); // Section 80CCD2
        deductableAmount += section80E; // Section 80E

        if (deductableAmount > grossSalary) {
            // Handle the case where deductions exceed gross salary, perhaps set a minimum taxable salary of 0
            taxableSalary = Math.max(0, grossSalary - deductableAmount);
        } else {
            // Otherwise, proceed normally
            taxableSalary = grossSalary - deductableAmount;
        }
        let calculatedTaxOld = getOldTax(taxableSalary);
        let surcharge = getSurcharge(grossSalary, calculatedTaxOld);
        let finalTax = calculatedTaxOld + 0.04 * calculatedTaxOld + surcharge;
        req.session.finalTax = finalTax;

        // Check if the user already has tax details for the selected tax year
        let taxDetails = await UserTaxDetails.findOne({ user: userId, year: taxYear });

        // If tax details already exist, update them; otherwise, create a new entry
        if (taxDetails) {
            taxDetails = await UserTaxDetails.findOneAndUpdate(
                { user: userId, year: taxYear },
                {
                    grossSalary,
                    baseSalary,
                    hraReceived,
                    rentPaid,
                    dearAllowance,
                    ltaReceived,
                    investment80c,
                    section80TTA,
                    section80D,
                    section80G,
                    section24,
                    section80CCD1B,
                    section80CCD2,
                    section80E,
                    taxableSalary,
                    calculatedTaxOld,
                    surcharge,
                    finalTax
                },
                { new: true }
            );
        } else {
            taxDetails = new UserTaxDetails({
                user: userId,
                year: taxYear,
                grossSalary,
                baseSalary,
                hraReceived,
                rentPaid,
                dearAllowance,
                ltaReceived,
                investment80c,
                section80TTA,
                section80D,
                section80G,
                section24,
                section80CCD1B,
                section80CCD2,
                section80E,
                taxableSalary,
                calculatedTaxOld,
                surcharge,
                finalTax
            });
            await taxDetails.save();
        }
        const allTaxDetails = await UserTaxDetails.find({ user: userId }).sort({ year: 1 });

        // Preparing data for the chart
        const years = allTaxDetails.map(detail => detail.year);
        const allGrossSalaries = allTaxDetails.map(detail => detail.grossSalary);
        const allBaseSalaries = allTaxDetails.map(detail => detail.baseSalary);
        const allHraReceived = allTaxDetails.map(detail => detail.hraReceived);
        const allRentPaid = allTaxDetails.map(detail => detail.rentPaid);
        const allDearAllowances = allTaxDetails.map(detail => detail.dearAllowance);
        const allLtaReceived = allTaxDetails.map(detail => detail.ltaReceived);
        const allTaxableSalaries = allTaxDetails.map(detail => detail.taxableSalary);
        const allCalculatedTaxes = allTaxDetails.map(detail => detail.calculatedTaxOld);
        const allSurcharges = allTaxDetails.map(detail => detail.surcharge);
        const allFinalTaxes = allTaxDetails.map(detail => detail.finalTax);

        let htmlResponse = `
        <html>
        <head>
            <title>Tax Calculation Result for Year ${taxYear}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6;
                    background-color: #AD88C6;
                    margin: 0;
                }
                .result { 
                    margin: 20px; 
                    padding: 20px; 
                    background-color:#FFFFFF; 
                    border-radius: 10px; 
                    color:#000000;
                }
                .bold { 
                    font-weight: bold; 
                }
                .year-heading {
                    color: #d35400; /* Choose a color that stands out */
                    font-size: 24px; /* Adjust the size as needed */
                    margin-bottom: 10px;
                }
                .row {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #AD88C6;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
        
                .button:hover {
                    background-color: #0056b3;
                }
                canvas {
                    margin-top: 20px;
                    max-width: 48%; /* Adjusted for side-by-side layout */
                    height: auto !important;
                    flex: 1;
                    
                }

            </style>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
            <div class="result">
               <h2 class="year-heading">Tax Calculation for Year: ${taxYear}</h2>
              
                <p><span class="bold">Update:</span> Tax calculated successfully</p>
                <p><span class="bold">Gross Salary:</span> ${grossSalary}</p>
                <p><span class="bold">Taxable Salary:</span> ${taxableSalary}</p>
                <p><span class="bold">Calculated Tax (Old Regime):</span> ${calculatedTaxOld}</p>
                <p><span class="bold">Surcharge:</span> ${surcharge}</p>
                <p><span class="bold">Final Tax:</span> ${finalTax}</p>
                <a href="/suggestions" class="button">Go to Suggestions</a>
                <div class="row">
                    <canvas id="taxChart"></canvas>
                    <canvas id="lineChart"></canvas>
                </div>

        
               <div class="row">
                    <canvas id="taxChart1"></canvas>
                    <canvas id="lineChart1"></canvas> 
              </div>
              
            </div>
            <script>
        const ctx = document.getElementById('taxChart').getContext('2d');
        const taxChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(years)},
                datasets: [
                    {
                        label: 'Gross Salary',
                        data: ${JSON.stringify(allGrossSalaries)}, // Use allGrossSalaries instead of grossSalaries
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    
                    {
                        label: 'Base Salary',
                        data: ${JSON.stringify(allBaseSalaries)},
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'HRA Received',
                        data: ${JSON.stringify(allHraReceived)},
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Rent Paid',
                        data: ${JSON.stringify(allRentPaid)},
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Dearness Allowance',
                        data: ${JSON.stringify(allDearAllowances)},
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'LTA Received',
                        data: ${JSON.stringify(allLtaReceived)},
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ${JSON.stringify(years)},
                datasets: [
                    {
                        label: 'Gross Salary',
                        data: ${JSON.stringify(allGrossSalaries)}, // Use allGrossSalaries instead of grossSalaries
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    
                    {
                        label: 'Base Salary',
                        data: ${JSON.stringify(allBaseSalaries)},
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'HRA Received',
                        data: ${JSON.stringify(allHraReceived)},
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Rent Paid',
                        data: ${JSON.stringify(allRentPaid)},
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Dearness Allowance',
                        data: ${JSON.stringify(allDearAllowances)},
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'LTA Received',
                        data: ${JSON.stringify(allLtaReceived)},
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        const ctx1 = document.getElementById('taxChart1').getContext('2d');
        const taxChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(years)},
                datasets: [
                    {
                        label: 'Gross Salary',
                        data: ${JSON.stringify(allGrossSalaries)},
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Taxable Salary',
                        data: ${JSON.stringify(allTaxableSalaries)},
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Calculated Tax (Old Regime)',
                        data: ${JSON.stringify(allCalculatedTaxes)},
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Surcharge',
                        data: ${JSON.stringify(allSurcharges)},
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Final Tax',
                        data: ${JSON.stringify(allFinalTaxes)},
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            const lineCtx1 = document.getElementById('lineChart1').getContext('2d');
        const lineChart1 = new Chart(lineCtx1, {
            type: 'line',
            data: {
                labels: ${JSON.stringify(years)},
                datasets: [
                    {
                        label: 'Gross Salary',
                        data: ${JSON.stringify(allGrossSalaries)},
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Taxable Salary',
                        data: ${JSON.stringify(allTaxableSalaries)},
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Calculated Tax (Old Regime)',
                        data: ${JSON.stringify(allCalculatedTaxes)},
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Surcharge',
                        data: ${JSON.stringify(allSurcharges)},
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Final Tax',
                        data: ${JSON.stringify(allFinalTaxes)},
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
    </script>
`;



        res.send(htmlResponse);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send({ message: 'An error occurred', errorDetails: error.message });
    }
});

module.exports = router;
