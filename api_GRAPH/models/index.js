const UnitePedagogique = require('./noeuds/UnitePedagogique');
const ChaineDescriptive = require('./noeuds/ChaineDescriptive');
const ModuleFormation = require('./noeuds/ModuleFormation');
const NiveauFormation = require('./noeuds/NiveauFormation');
const Enseignant = require('./noeuds/Enseignant');

const RelationDescription = require('./relations/RelationDescription');
const RelationSuccession = require('./relations/RelationSuccession');
const RelationCreation = require('./relations/RelationCreation');
const RelationCommencePar = require('./relations/RelationCommencePar');
const RelationAssociation = require('./relations/RelationAssociation');

module.exports = {
  ChaineDescriptive,
  RelationDescription,
  RelationSuccession,
  UnitePedagogique,
  ModuleFormation,
  NiveauFormation,
  Enseignant,
  RelationAssociation,
  RelationCommencePar,
  RelationCreation,
};
