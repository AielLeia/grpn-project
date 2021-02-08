const express = require('express');
const { getAllModuleFormation, addModuleFormation } = require('../controllers');

const router = express.Router();

router.route('/').get(getAllModuleFormation).post(addModuleFormation);

module.exports = router;
