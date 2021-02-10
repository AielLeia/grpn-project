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

module.exports = { getAllUnitePedagogiqueByModuleFormation };
