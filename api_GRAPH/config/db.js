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

// (:ModuleFormation) - [:ASSOCIE] -> (:NiveauFormation)
neode
  .model('ModuleFormation')
  .relationship(
    'associe',
    'relationships',
    'ASSOCIE',
    'direction_both',
    'NiveauFormation',
    RelationAssociation
  );

// (:ModuleFormation) - [:COMMENCE_PAR] -> (:UnitePedagogique)
neode
  .model('ModuleFormation')
  .relationship(
    'commence_par',
    'relationship',
    'COMMENCE_PAR',
    'direction_both',
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
    'direction_both',
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
    'direction_both',
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
    'direction_both',
    'UnitePedagogique',
    RelationDescription
  );

module.exports = neode;
