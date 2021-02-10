const express = require('express');
const {
  getAllUnitePedagogiqueByModuleFormation,
  updateUnitePedagogique,
} = require('../controllers');

const router = express.Router();

router
  .route('/:id/par-module-formation')
  .get(getAllUnitePedagogiqueByModuleFormation);

router.route('/:id').put(updateUnitePedagogique);

module.exports = router;
