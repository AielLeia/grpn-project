const express = require('express');
const { getAllModuleFormation } = require('../controllers');

const router = express.Router();

router.route('/').get(getAllModuleFormation);

module.exports = router;
