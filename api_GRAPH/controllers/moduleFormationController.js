const asyncHandler = require('express-async-handler');
const neode = require('../config/db');

// @desc    Recupère tout les modules de formations
// @route   /module-formation
// @access  Private: Enseignant
const getAllModuleFormation = asyncHandler(async (req, res) => {
  try {
    const moduleFormation = await (await neode.all('ModuleFormation')).toJson();
    res.json(moduleFormation);
  } catch (e) {
    res.status(404);
    throw new Error('Impossible de récupèrer les modules de formations');
  }
});

module.exports = { getAllModuleFormation };
