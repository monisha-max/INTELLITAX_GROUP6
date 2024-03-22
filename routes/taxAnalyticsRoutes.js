const express = require('express');
const router = express.Router();
const UserTaxDetails = require('../models/userTaxDetails');
const Chart = require('chart.js/auto');

router.get('/tax-analytics', async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(403).send({ message: 'Not logged in' });
        }

        // Retrieve all tax details for the user from the database
        const userTaxDetails = await UserTaxDetails.find({ user: userId });
        const years = userTaxDetails.map(detail => detail.year);
        const allGrossSalaries = userTaxDetails.map(detail => detail.grossSalary);
        const allBaseSalaries = userTaxDetails.map(detail => detail.baseSalary);
        const allHraReceived = userTaxDetails.map(detail => detail.hraReceived);
        const allRentPaid = userTaxDetails.map(detail => detail.rentPaid);
        const allDearAllowances = userTaxDetails.map(detail => detail.dearAllowances);
        const allLtaReceived = userTaxDetails.map(detail => detail.ltaReceived);
        const allTaxableSalaries = userTaxDetails.map(detail => detail.taxableSalary);
        const allCalculatedTaxes = userTaxDetails.map(detail => detail.calculatedTaxOld);
        const allSurcharges = userTaxDetails.map(detail => detail.surcharge);
        const allFinalTaxes = userTaxDetails.map(detail => detail.finalTax);

        // Render a new HTML page to display tax analytics
        let htmlResponse = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Tax Analytics</title>
                    <style>
                    .title {
                        text-align: center;
                        margin-top: 20px; 
                        font-size: 24px; 
                        color: #766cab; 
                    }
                    
                    body { 
                        font-family: Arial, sans-serif; 
                        line-height: 1.6;
                        background-color: #FFFFFF;
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
                        color: #d35400; 
                        font-size: 24px; 
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
                        max-width: 48%; 
                        height: auto !important;
                        flex: 1;
                        
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        border-spacing: 0;
                        margin-bottom: 20px;
                    }
                    
                    thead {
                        background-color: #AD88C6; /* Change to desired color */
                        color: #FFFFFF; /* Change to desired color */
                    }
                    
                    th, td {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #ddd; /* Change to desired color */
                    }
                    
                    th {
                        font-weight: bold;
                    }
                
                    </style>
                </head>
                <body>
                    <h1 class="title">Tax Analytics</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Gross Salary</th>
                                <th>Taxable Salary</th>
                                <th>Calculated Tax (Old Regime)</th>
                                <th>Surcharge</th>
                                <th>Final Tax</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

        // Loop through each tax detail and add it to the HTML response
        userTaxDetails.forEach(detail => {
            htmlResponse += `
                    <tr>
                        <td>${detail.year}</td>
                        <td>${detail.grossSalary}</td>
                        <td>${detail.taxableSalary}</td>
                        <td>${detail.calculatedTaxOld}</td>
                        <td>${detail.surcharge}</td>
                        <td>${detail.finalTax}</td>
                    </tr>
                `;
        });

        // Close the HTML response
        htmlResponse += `
                        </tbody>
                    </table>
                    <div class="row">
                        <canvas id="taxChart"></canvas>
                        <canvas id="lineChart"></canvas>
                    </div>
    
                    <div class="row">
                        <canvas id="taxChart1"></canvas>
                        <canvas id="lineChart1"></canvas> 
                    </div>
    
                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                    <script>
                        document.addEventListener("DOMContentLoaded", function() {
                            const ctx = document.getElementById('taxChart').getContext('2d');
                            const taxChart = new Chart(ctx, {
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
                </body>
                </html>
            `;

        res.send(htmlResponse);

    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send({ message: 'An error occurred', errorDetails: error.message });
    }
});

module.exports = router;
