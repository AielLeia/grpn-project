const asyncHandler = require('express-async-handler');
const neode = require('../config/db');

// @desc    Recupère tout les unités pédagogique par module de formation et dans l'ordre
// @route   GET /unite-pedagogique/:id/par-module-pedagogique
// @access  Private: Enseignant
const getAllUnitePedagogiqueByModuleFormation = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const {
      records: unitePedagogique,
    } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [s:SUIS*] -> (n:UnitePedagogique) WHERE mf.identifiant_module_formation = $id RETURN nn,n,s',
      { id: parseInt(id) }
    );
    if (unitePedagogique.length === 0) {
      res.status(404);
      throw new Error('Aucunes unités pédagogiques encore disponible');
    }
    const unitePedagogiqueToArray = [
      {
        ...unitePedagogique[0].get('nn').properties,
        ...unitePedagogique[0].get('s')[0].properties,
      },
    ];
    unitePedagogique.forEach((up, index) => {
      const suivant = unitePedagogique[index + 1]?.get('s')[index + 1]
        ?.properties || { identifiant_unite_pedagogique_suivant: null };
      unitePedagogiqueToArray.push({
        ...up.get('n').properties,
        ...suivant,
      });
    });
    res.json(unitePedagogiqueToArray);
  }
);

// @desc    Mise à jour d'une unité pédagogique
// @route   PUT /unite-pedagogique/:id
// @access  Private: Enseignant
const updateUnitePedagogique = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    unitePedagogique: { nom, url },
    chainesDescriptive,
  } = req.body;
  let unitePedagogiqueNeo4j = await neode
    .model('UnitePedagogique')
    .first('identifiant_unite_pedagogique', parseInt(id));
  if (!unitePedagogiqueNeo4j) {
    res.status(404);
    throw new Error('Unité pédagogique non reconnue');
  }
  unitePedagogiqueNeo4j = await unitePedagogiqueNeo4j.update({
    url_resource: url,
    nom,
  });

  /** @type {Neode.Relationship} */
  let newRelation;
  for (const cd of chainesDescriptive) {
    const { records: result } = await neode.cypher(
      'MATCH (cd:ChaineDescriptive)  WHERE cd.nom = $nom RETURN cd, exists((cd) - [:DECRIT] -> (:UnitePedagogique {identifiant_unite_pedagogique: $id})) as relation',
      {
        nom: cd,
        id: parseInt(id),
      }
    );
    if (result.length != 0) {
      const relation = result[0].get('relation');
      if (!relation) {
        newRelation = await (
          await neode.model('ChaineDescriptive').first('nom', nom)
        ).relateTo(unitePedagogiqueNeo4j, 'decrit');
      }
    } else {
      newRelation = await (
        await neode.model('ChaineDescriptive').create({ nom: cd })
      ).relateTo(unitePedagogiqueNeo4j, 'decrit');
    }
  }
  res.json({
    ...(await unitePedagogiqueNeo4j.toJson()),
    to: newRelation?.endNode().get('nom'),
    from: newRelation?.startNode().get('nom'),
  });
});

// @desc    Suppression d'une unité pédagogique
// @route   DELETE /unite-pedagogique/:id
// @access  Private: Enseignant
const deleteUnitePedagogique = asyncHandler(async (req, res) => {
  /**
    -> Détacher le noeud de sa description ou ses description
    -> Détacher le noeud de son enseignant

    -> Si le noeud est un noeud de début:
      -> Mettre à jour le commencement du module de formation
    -> Si le noeud est un noeud du millieu:;
      -> Récupération du noeud parent et mise à jour de celui-çi
    
    -> Suppression du module de l'unité pédagogique
  */
});

// @desc    Récupère une unité pédagogique
// @route   GET /unite-pedagogique/:id
// @access  Private: Enseignant
const getUnitePedagogique = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const unitePedagogique = await neode
    .model('UnitePedagogique')
    .first('identifiant_unite_pedagogique', parseInt(id));
  if (!unitePedagogique) {
    res.status(404);
    throw new Error('Unité pédagogique non reconnue');
  }
  res.json(await unitePedagogique.toJson());
});

// @desc    Ajoute une nouvelle unité pédagogique
// @warn    L'ajout d'une unité pédagogique ne se fait qu'a la fin d'une chaine
// @route   POST /unite-pedagogique
// @access  Private: Enseignant
const addUnitePedagogique = asyncHandler(async (req, res) => {
  const {
    unitePedagogique: { identifiant_unite_pedagogique, nom, url },
    identifiant_unite_pedagogique_precedent,
    isFirst,
    identifiant_module_formation,
  } = req.body;
  let unitePedagogiquePrecedent = null;
  let moduleFormation = null;
  if (!isFirst) {
    unitePedagogiquePrecedent = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        parseInt(identifiant_unite_pedagogique_precedent)
      );
    if (!unitePedagogiquePrecedent) {
      res.status(404);
      throw new Error("Impossible de créer l'unité pédagogique");
    }
  } else {
    moduleFormation = await neode
      .model('ModuleFormation')
      .first(
        'identifiant_module_formation',
        parseInt(identifiant_module_formation)
      );
    if (!moduleFormation) {
      res.status(404);
      throw new Error("Impossible de créer l'unité pédagogique");
    }
  }
  const newUnitePedagogique = await neode.model('UnitePedagogique').create({
    identifiant_unite_pedagogique,
    nom,
    url_resource: url,
  });
  let relation;
  if (unitePedagogiquePrecedent !== null) {
    relation = await unitePedagogiquePrecedent.relateTo(
      newUnitePedagogique,
      'suis',
      {
        identifiant_unite_pedagogique_suivant: newUnitePedagogique.get('id'),
      }
    );
  } else {
    relation = await moduleFormation.relateTo(
      newUnitePedagogique,
      'commence_par'
    );
  }
  res.json({
    ...(await newUnitePedagogique.toJson()),
    ...(await relation.toJson()),
  });
});

module.exports = {
  getAllUnitePedagogiqueByModuleFormation,
  updateUnitePedagogique,
  deleteUnitePedagogique,
  getUnitePedagogique,
  addUnitePedagogique,
};
