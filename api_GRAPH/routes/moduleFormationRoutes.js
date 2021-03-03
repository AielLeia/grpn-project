const express = require('express');
const {
  getAllModuleFormation,
  addModuleFormation,
  deleteModuleFormation,
  updateModuleFormation,
  getAllModuleFormationParEnseigant,
} = require('../controllers');

const router = express.Router();

router.route('/').get(getAllModuleFormation).post(addModuleFormation);
router.route('/:id').delete(deleteModuleFormation).put(updateModuleFormation);
router.route('/:id/par-enseignant').get(getAllModuleFormationParEnseigant);

module.exports = router;
