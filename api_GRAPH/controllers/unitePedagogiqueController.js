const asyncHandler = require('express-async-handler');
const neode = require('../config/db');

// @desc    Recupère tout les unités pédagogique par module de formation
// @route   GET /unite-pedagogique/:id/par-module-pedagogique
// @access  Private: Enseignant
const getAllUnitePedagogiqueByModuleFormation = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const {
      records: unitePedagogique,
    } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.identifiant_module_formation = $id RETURN nn,n',
      { id: parseInt(id) }
    );
    if (unitePedagogique.length === 0) {
      throw new Error('Aucunes unités pédagogiques encore disponible');
    }
    const unitePedagogiqueToArray = [unitePedagogique[0].get('nn').properties];
    for (const up of unitePedagogique) {
      unitePedagogiqueToArray.push(up.get('n').properties);
    }
    res.json(unitePedagogiqueToArray);
  }
);

module.exports = { getAllUnitePedagogiqueByModuleFormation };
