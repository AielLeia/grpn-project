module.exports = {
  id: {
    type: 'uuid',
    empty: false,
    primary: true,
    required: true,
  },
  identifiant_enseignant: {
    type: 'number',
    empty: false,
    required: true,
    unique: true,
  },
};
