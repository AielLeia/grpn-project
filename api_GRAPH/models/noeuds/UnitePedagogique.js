module.exports = {
  id: {
    type: 'uuid',
    empty: false,
    primary: true,
    required: true,
  },
  identifiant_unite_pedagogique: {
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
  url_resource: {
    type: 'string',
    empty: false,
    required: true,
  },
};
