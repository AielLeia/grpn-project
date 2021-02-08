require('dotenv');
const express = require('express');
const { moduleFormationRoute } = require('./routes');

const app = express();

app.use(express.json());

app.use('/api-graph/module-formation', moduleFormationRoute);

const port = process.env.APP_PORT || 5000;
app.listen(port, () =>
  console.log(`Serveur tourne sur http://localhost:${port}`)
);
