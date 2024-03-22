const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserTaxDetails = require('../models/userTaxDetails'); // Import the UserTaxDetails model

// Route to render the dashboard
router.get("/dashboard", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            res.redirect('/login');
            return;
        }

        // Fetch all tax details for the user
        const allTaxDetails = await UserTaxDetails.find({ user: userId }).sort({ year: 1 });

        // Extracting data for charts
        const chartData = {
            years: allTaxDetails.map(detail => detail.year),
            taxableSalaries: allTaxDetails.map(detail => detail.taxableSalary),
            surcharges: allTaxDetails.map(detail => detail.surcharge),
            finalTaxes: allTaxDetails.map(detail => detail.finalTax),
            grossSalaries: allTaxDetails.map(detail => detail.grossSalary),
            baseSalaries: allTaxDetails.map(detail => detail.baseSalary),
            hraReceived: allTaxDetails.map(detail => detail.hraReceived),
            rentPaid: allTaxDetails.map(detail => detail.rentPaid),
            dearAllowance: allTaxDetails.map(detail => detail.dearAllowance),
            ltaReceived: allTaxDetails.map(detail => detail.ltaReceived)
        };

        // Render the dashboard view with chart data
        res.render("dashboard", { chartData });
    } catch (error) {
        console.error("Error in dashboard:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render the timer view
router.get("/timer", (req, res) => {
    res.render("timer");
});

// Route to render the tax year selection page
router.get('/select-tax-year', (req, res) => {
    res.render('year');
});

// Route to handle the selection of tax year
router.post('/select-tax-year', (req, res) => {
    const { year } = req.body;
    req.session.taxYear = year; // Store selected tax year in session
    res.redirect('/tax-calculation'); // Redirect to tax calculation page after selecting tax year
});

module.exports = router;
