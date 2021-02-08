const asyncHandler = require('express-async-handler');
const neode = require('../config/db');

// @desc    Recupère tout les modules de formations
// @route   GET /module-formation
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

// @desc    Ajoute un nouveau module de formation et l'associe à un niveau de formation
// @route   POST /module-formation
// @access  Private: Enseignant
const addModuleFormation = asyncHandler(async (req, res) => {
  const {
    moduleFormation: { nom: nomModuleFormation, identifiant_module_formation },
    niveauFormation: { nom: nomNiveauFormation },
  } = req.body;
  try {
    const moduleFormationCreated = await neode
      .model('ModuleFormation')
      .create({ nom: nomModuleFormation, identifiant_module_formation });
    const 
  } catch (e) {
    res.status(404);
    throw new Error('Impossible de récupèrer les modules de formations');
  }
});

module.exports = { getAllModuleFormation, addModuleFormation };
