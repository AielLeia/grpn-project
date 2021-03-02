const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { URL, URLSearchParams } = require('url');

//connexion
app.post('/serveurInt', (req, res) => {
  //console.log(req.body);
  const body = { pseudo: req.body.pseudo, motDePasse: req.body.motDePasse };
  fetch('http://localhost:3000/api-bdr/compte/login/Connexion', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
  //.then(json => console.log(json));
});

app.get('/serveurInt/:pseudo', (req, res) => {
  console.log(req.params);
  const url =
    'http://localhost:3000/api-bdr/compte/infosDeCompte/' + req.params.pseudo;
  //let url = new URL('http://localhost:3000/api-bdr/compte/infosDeCompte/')
  //url.search = new URLSearchParams({
  //   pseudo: req.params.pseudo
  // })
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => console.error(err));
});

//port sur lequel le front va communiquer
const port = 7289;

app.listen(port, () => {
  console.log('Serveur central OK  -- sur le port : ' + port);
});
