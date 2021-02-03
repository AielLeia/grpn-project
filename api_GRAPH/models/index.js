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
  noeud: {
    ChaineDescriptive,
    UnitePedagogique,
    ModuleFormation,
    NiveauFormation,
    Enseignant,
  },
  relation: {
    RelationDescription,
    RelationSuccession,
    RelationAssociation,
    RelationCommencePar,
    RelationCreation,
  },
};
