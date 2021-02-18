const express = require('express');
const {
  getAllUnitePedagogiqueByModuleFormation,
  updateUnitePedagogique,
  deleteUnitePedagogique,
  getUnitePedagogique,
  addUnitePedagogique,
  getAllUnitePedagogique,
} = require('../controllers');

const router = express.Router();

router.route('/').post(addUnitePedagogique).get(getAllUnitePedagogique);

router
  .route('/:id/par-module-formation')
  .get(getAllUnitePedagogiqueByModuleFormation);

router
  .route('/:id')
  .get(getUnitePedagogique)
  .put(updateUnitePedagogique)
  .delete(deleteUnitePedagogique);

module.exports = router;
