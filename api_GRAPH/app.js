require('dotenv');
const express = require('express');
const asyncHandler = require('express-async-handler');
const neodeInstance = require('./config/db');

const app = express();

app.use(express.json());

app.post(
  '/',
  asyncHandler(async (req, res) => {
    const { nom } = req.body;
    try {
      await neodeInstance.create('ChaineDescriptive', {
        nom,
      });
      res.json({ message: 'OK!' });
    } catch (e) {
      res.json({ message: e.message });
    }
  })
);

const port = process.env.APP_PORT || 5000;
app.listen(port, () =>
  console.log(`Serveur tourne sur http://localhost:${port}`)
);
