const express = require('express');
const router = express.Router();

// Route to render the index page
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
