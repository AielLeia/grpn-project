const express = require('express');
const { getAllUnitePedagogiqueByModuleFormation } = require('../controllers');

const router = express.Router();

router
  .route('/:id/par-module-formation')
  .get(getAllUnitePedagogiqueByModuleFormation);

module.exports = router;
