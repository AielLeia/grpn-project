const Neode = require('neode');
const {
  noeud: {
    ChaineDescriptive,
    Enseignant,
    ModuleFormation,
    NiveauFormation,
    UnitePedagogique,
  },
  relation: {
    RelationAssociation,
    RelationCommencePar,
    RelationCreation,
    RelationDescription,
    RelationSuccession,
  },
} = require('../models');

const neode = Neode.fromEnv();

neode.with({
  ChaineDescriptive,
  Enseignant,
  ModuleFormation,
  NiveauFormation,
  UnitePedagogique,
});

// (:ModuleFormation) - [:ASSOCIE] -> (:NiveauFormation)
neode
  .model('ModuleFormation')
  .relationship(
    'associe',
    'relationships',
    'ASSOCIE',
    'direction_both',
    'NiveauFormation',
    RelationAssociation,
    true,
    true
  );

module.exports = neode;
