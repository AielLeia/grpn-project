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

// @desc    Recupère tout les modules de formations d'un enseigant
// @route   GET /module-formation/:id/par-enseigant
// @access  Private: Enseignant
const getAllModuleFormationParEnseigant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const moduleFormationFromNeo4j = await neode.cypher(
    'MATCH (e:Enseignant) - [:A_CREER] -> (:UnitePedagogique) <- [:COMMENCE_PAR] - (mf:ModuleFormation) WHERE e.identifiant_enseignant = $id RETURN e,mf',
    { id: parseInt(id) }
  );
  const moduleFormationToArray = [];
  for (const mf of moduleFormationFromNeo4j.records) {
    moduleFormationToArray.push(mf.get('mf').properties);
  }
  res.json(moduleFormationToArray);
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
  await moduleFormation.delete();
  res.status(204).json();
});

// @desc    Modification d'un module de formation existant
// @route   PUT /module-formation/:id
// @access  Private: Enseignant
const updateModuleFormation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const moduleFormation = await neode
    .model('ModuleFormation')
    .first('identifiant_module_formation', parseInt(id));
  if (!moduleFormation) {
    res.status(404);
    throw new Error('Module formation non reconnue');
  }
  let result = await moduleFormation.update({ nom });
  res.status(200).json({ ...(await result.toJson()) });
});

module.exports = {
  getAllModuleFormation,
  addModuleFormation,
  deleteModuleFormation,
  updateModuleFormation,
  getAllModuleFormationParEnseigant,
};
