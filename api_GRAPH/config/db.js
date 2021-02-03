const Neode = require('neode');
const {
  ChaineDescriptive,
  RelationDescription,
  RelationSuccession,
  UnitePedagogique,
  Enseignant,
  ModuleFormation,
  NiveauFormation,
  RelationAssociation,
  RelationCommencePar,
  RelationCreation,
} = require('../models');

const neode = Neode.fromEnv();

neode.with({
  ChaineDescriptive,
});

module.exports = neode;
