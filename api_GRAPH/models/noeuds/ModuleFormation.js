module.exports = {
  id: {
    type: 'uuid',
    empty: false,
    primary: true,
    required: true,
  },
  identifiant_module_formation: {
    type: 'number',
    empty: false,
    required: true,
    unique: true,
  },
  nom: {
    type: 'string',
    empty: false,
    required: true,
  },
};
