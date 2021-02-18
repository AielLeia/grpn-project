const asyncHandler = require('express-async-handler');
const neode = require('../config/db');

// @desc    Recupère tout les modules de formations
// @route   GET /module-formation
// @access  Private: Enseignant
const getAllChaineDescriptive = asyncHandler(async (req, res) => {
  const chaineDescriptive = await (
    await neode.all('ChaineDescriptive')
  ).map((cd) => cd.get('nom'));
  res.json(chaineDescriptive);
});

module.exports = { getAllChaineDescriptive };
