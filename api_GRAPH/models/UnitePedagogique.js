module.exports = {
  identifiant_unite_pedagogique: {
    type: 'uuid',
    primary: true,
    empty: false,
  },
  identifiant_enseignant: {
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
