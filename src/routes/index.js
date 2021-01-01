const express = require('express');
const {desapier_spinner} = require('../lib/helpers')

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
    desapier_spinner;
});

module.exports = router;