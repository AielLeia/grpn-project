const express = require('express');
const {
  getAllModuleFormation,
  addModuleFormation,
  deleteModuleFormation,
  updateModuleFormation,
} = require('../controllers');

const router = express.Router();

router.route('/').get(getAllModuleFormation).post(addModuleFormation);
router.route('/:id').delete(deleteModuleFormation).put(updateModuleFormation);

module.exports = router;
