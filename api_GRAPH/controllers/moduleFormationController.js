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
  const niveauFormationFromNeo4j = await neode
    .model('NiveauFormation')
    .first('nom', nomNiveauFormation);
  if (!niveauFormationFromNeo4j) {
    throw new Error('Niveau de formation Inconnue');
  }
  const moduleFormationCreated = await neode
    .model('ModuleFormation')
    .create({ nom: nomModuleFormation, identifiant_module_formation });
  const resultRelation = await moduleFormationCreated.relateTo(
    niveauFormationFromNeo4j,
    'associe'
  );
  res.status(201).json({
    niveauFormation: {
      ...(await niveauFormationFromNeo4j.toJson()),
    },
    moduleFormation: {
      ...(await moduleFormationCreated.toJson()),
    },
    relation: {
      to: resultRelation.startNode().get('nom'),
      from: resultRelation.endNode().get('nom'),
    },
  });
});

// @desc    Supprime un module de formation
// @route   DELETE /module-formation/:id
// @access  Private: Enseignant
const deleteModuleFormation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const moduleFormation = await neode
    .model('ModuleFormation')
    .first('identifiant_module_formation', parseInt(id));
  if (!moduleFormation) {
    res.status(404);
    throw new Error('Module formation non reconnue');
  }
  let result = await moduleFormation.delete();
  res.status(204).json();
});

module.exports = {
  getAllModuleFormation,
  addModuleFormation,
  deleteModuleFormation,
};
