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

let neode;

if (process.env.NODE_ENV === 'test') {
  neode = new Neode('bolt://localhost:7687', 'neo4j', 'dbtest12345');
} else {
  neode = Neode.fromEnv();
}

neode.with({
  ChaineDescriptive,
  Enseignant,
  ModuleFormation,
  NiveauFormation,
  UnitePedagogique,
});

// (:NiveauFormation)  - [:ASSOCIE] -> (:ModuleFormation)
neode
  .model('NiveauFormation')
  .relationship(
    'associe',
    'relationships',
    'ASSOCIE',
    'direction_out',
    'ModuleFormation',
    RelationAssociation
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
    RelationCommencePar
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
    RelationSuccession
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
    RelationCreation
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
    RelationDescription
  );

module.exports = neode;
