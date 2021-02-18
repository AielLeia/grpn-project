
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const routeCompte = require('./compte');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('get api mariadb');
});

// /api-bdr/compte/login/Connexion 
app.use('/api-bdr/compte', routeCompte);


const port = 3000;
app.listen(port, () => {
  console.log(
    'le serveur fonctionne pour l"API mariadb fonctionne sur le port : ' + port
  );
});
