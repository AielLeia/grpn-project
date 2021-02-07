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
    'direction_out',
    'NiveauFormation',
    RelationAssociation,
    true,
    true
  );

// (:ModuleFormation) - [:COMMENCE_PAR] -> (:UnitePedagogique)
neode
  .model('ModuleFormation')
  .relationship(
    'commence_par',
    'relationship',
    'COMMENCE_PAR',
    'direction_out',
    'UnitePedagogique',
    RelationCommencePar,
    true,
    true
  );

// (:UnitePedagogique) - [:SUIS] -> (:UnitePedagogique)
neode
  .model('UnitePedagogique')
  .relationship(
    'suis',
    'relationship',
    'SUIS',
    'direction_out',
    'UnitePedagogique',
    RelationSuccession,
    true,
    true
  );

// (:Enseignant) - [:A_CREER] -> (:UnitePedagogique)
neode
  .model('Enseignant')
  .relationship(
    'a_creer',
    'relationships',
    'A_CREER',
    'direction_out',
    'UnitePedagogique',
    RelationCreation,
    true,
    true
  );

// (:ChaineDescriptive) - [:DECRIT] -> (:UnitePedagogique)
neode
  .model('ChaineDescriptive')
  .relationship(
    'decrit',
    'relationships',
    'DECRIT',
    'direction_out',
    'UnitePedagogique',
    RelationDescription,
    true,
    true
  );

module.exports = neode;
