

const express = require('express');
const router = express.Router();
const UserTaxDetails = require('../models/userTaxDetails');

router.get('/suggestions', async (req, res) => {
    try {
        const userId = req.session.userId;
        const taxYear = req.session.taxYear; // Retrieve tax year from query parameter

        if (!userId) {
            return res.status(403).send({ message: 'Not logged in' });
        }
        // Retrieve user tax details for the specified tax year
        const userTaxDetails = await UserTaxDetails.findOne({ user: userId, year: taxYear });

        if (!userTaxDetails) {
            return res.status(404).send({ message: 'Tax details not found for the specified year' });
        }

        // Extract necessary data from the retrieved document
        const { section24, section80E, hraReceived, ltaReceived, investment80c, section80CCD1B, section80TTA, section80D, section80G, section80CCD2, baseSalary } = userTaxDetails;
        const finalTax = req.session.finalTax;

        // Initialize variables to store suggestions
        let suggestions = [];

        if (finalTax == 0) {
            suggestions.push("Hurray!! You are not bound to pay any taxes!");
        } else {
            // Suggestions based on property related questions
            if (section24 == 0) {
                suggestions.push("Consider claiming deductions under Section 24 for property-related expenses.");
            }

            // Suggestions based on study loan questions
            if (section80E == 0) {
                suggestions.push("Explore deductions under Section 80E for study loan interest payments.");
            }

            // Suggestions for HRA
            if (hraReceived == 0) {
                suggestions.push("Check if you are eligible to claim deductions under HRA.");
            }

            // Suggestions for LTA
            if (ltaReceived == 0) {
                suggestions.push("Explore claiming deductions under LTA for work-related travel expenses.");
            }

            // Suggestions for Section 80C
            if (investment80c + section80CCD1B < 150000) {
                suggestions.push("Consider investing in EPF, PPF, NPS, ELSS, and insurance plans for additional deductions under Section 80C.");
            }

            // Suggestions for Section 80TTA
            if (section80TTA < 10000) {
                suggestions.push("Explore investments under Section 80TTA for additional tax benefits.");
            }

            // Suggestions for Section 80D
            if (section80D == 0 || section80D < 40000) {
                suggestions.push("Consider purchasing medical insurance to avail deductions under Section 80D.");
            }

            // Suggestions for Section 80G
            if (section80G == 0) {
                suggestions.push("Explore deductions for contributions made to charitable organizations under Section 80G.");
            }

            // Suggestions for Section 80CCD2
            if (section80CCD2 == 0) {
                suggestions.push("Check if your employer provides contributions to NPS for additional tax benefits under Section 80CCD2.");
            }

            // Additional common deductions
            suggestions.push("You can also claim deductions for medical expenses, income from royalties or patents, and deductions for disabled individuals.");

            // Suggestions for first-time homeowners
            if (baseSalary > 0) {
                suggestions.push("For first-time homeowners, explore deductions on your taxable income for the purchase of your first home.");
            }
        }

        // Render HTML page with suggestions or send JSON response
        res.render('suggestions', { suggestions });
    } catch (error) {
        // Handle any errors that occur during database retrieval
        console.error('Error fetching user tax details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
