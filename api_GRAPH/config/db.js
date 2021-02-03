const Neode = require('neode');
const {
  ChaineDescriptive,
  RelationDescription,
  RelationSuccession,
  UnitePedagogique,
} = require('../models');

const neode = Neode.fromEnv();

neode.with({
  ChaineDescriptive,
});

module.exports = neode;
