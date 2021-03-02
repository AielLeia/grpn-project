require('dotenv').config();
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const routeCompte = require('./compte');
const routeMF = require('./moduleDeFormation');
const routeNF = require('./niveauDeFormation');
const routeUP = require('./unitePedagogique');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('get api mariadb');
});

// /api-bdr/compte/login/Connexion
app.use('/api-bdr/compte', routeCompte);
app.use('/api-bdr/MF', routeMF);
app.use('/api-bdr/NF', routeNF);
app.use('/api-bdr/UP', routeUP);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(
    'le serveur fonctionne pour l"API mariadb fonctionne sur le port : ' + port
  );
});
