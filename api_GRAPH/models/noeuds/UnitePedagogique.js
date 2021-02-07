module.exports = {
  id: {
    type: 'uuid',
    empty: false,
    primary: true,
  },
  identifiant_unite_pedagogique: {
    type: 'number',
    empty: false,
  },
  nom: {
    type: 'string',
    empty: false,
  },
  url_resource: {
    type: 'string',
    empty: false,
  },
};
