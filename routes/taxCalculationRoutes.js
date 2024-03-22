const express = require('express');
const router = express.Router();
const UserTaxDetails = require('../models/userTaxDetails'); // Import the UserTaxDetails model

// Route to render the tax calculation page
router.get('/tax-calculation', async (req, res) => {
    try {
        // Check if tax year is selected
        if (!req.session.taxYear) {
            res.render('year'); // Render the page to select tax year if not selected
            return;
        }

        const userId = req.session.userId;
        if (!userId) {
            return res.status(403).send({ message: 'Not logged in' });
        }

        const taxYear = req.session.taxYear;

        // Check if there are previous tax details for the user for the selected tax year
        const previousTaxDetails = await UserTaxDetails.findOne({ user: userId, year: taxYear });

        // Fetch previous year's data for statistical display
        const allTaxDetails = await UserTaxDetails.find({ user: userId, year: { $ne: taxYear } });

        if (previousTaxDetails) {
            return res.render('usertaxdetails', { previousTaxDetails, update: true, allTaxDetails });
        } else {
            return res.render('usertaxdetails', { update: false, allTaxDetails });
        }
    } catch (error) {
        console.error("Error fetching previous inputs:", error);
        res.status(500).send({ message: 'An error occurred', errorDetails: error.message });
    }
});

module.exports = router;
