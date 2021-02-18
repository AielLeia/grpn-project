const express = require('express');
const { getAllChaineDescriptive } = require('../controllers');

const router = express.Router();

router.route('/').get(getAllChaineDescriptive);

module.exports = router;
