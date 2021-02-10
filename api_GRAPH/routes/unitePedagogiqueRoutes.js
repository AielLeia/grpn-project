const express = require('express');
const {
  getAllUnitePedagogiqueByModuleFormation,
  updateUnitePedagogique,
  deleteUnitePedagogique,
} = require('../controllers');

const router = express.Router();

router
  .route('/:id/par-module-formation')
  .get(getAllUnitePedagogiqueByModuleFormation);

router.route('/:id').put(updateUnitePedagogique).delete(deleteUnitePedagogique);

module.exports = router;
