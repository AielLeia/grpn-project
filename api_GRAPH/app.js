require('dotenv');
const express = require('express');
const asyncHandler = require('express-async-handler');
const neodeInstance = require('./config/db');

const app = express();

app.use(express.json());

app.post(
  '/',
  asyncHandler(async (req, res) => {
    const { nomModuleFormation, nomNiveauFormation } = req.body;
    try {
      await neodeInstance.batch([
        {
          query: 'CREATE (:ModuleFormation {nom: $nomModuleFormation})',
          params: { nomModuleFormation },
        },
        {
          query: 'CREATE (:NiveauFormation {nom: $nomNiveauFormation})',
          params: { nomNiveauFormation },
        },
        {
          query:
            'MATCH (mf:ModuleFormation {nom: $nomModuleFormation}), (nf:NiveauFormation {nom: $nomNiveauFormation}) CREATE (mf)-[:ASSOCIE]->(nf)',
          params: { nomModuleFormation, nomNiveauFormation },
        },
      ]);
      res.json({ message: 'OK!' });
    } catch (e) {
      res.json({ message: e });
    }
  })
);

app.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const result = await neodeInstance
        .query()
        .match('mf', 'ModuleFormation')
        .relationship('ASSOCIE', 'out')
        .to('nf', 'NiveauFormation')
        .return('mf', 'nf')
        .execute();
      // const result = await neodeInstance.query(query, params);
      res.json({ result: result.records });
    } catch (e) {
      res.json({ message: e });
    }
  })
);

const port = process.env.APP_PORT || 5000;
app.listen(port, () =>
  console.log(`Serveur tourne sur http://localhost:${port}`)
);
