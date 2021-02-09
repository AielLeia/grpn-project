const express = require('express');
const {
  getAllModuleFormation,
  addModuleFormation,
  deleteModuleFormation,
} = require('../controllers');

const router = express.Router();

router.route('/').get(getAllModuleFormation).post(addModuleFormation);
router.route('/:id').delete(deleteModuleFormation);

module.exports = router;
