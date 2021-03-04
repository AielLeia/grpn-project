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
  fetch('http://localhost:3001/api-bdr/compte/login/Connexion', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.Connexion === 'ok') {
        const url =
          'http://localhost:3001/api-bdr/compte/infosDeCompte/' +
          req.body.pseudo;
        fetch(url)
          .then((fetchResponse) => fetchResponse.json())
          .then((fetchResponseData) => {
            return res.json(fetchResponseData);
          })
          .catch((err) => console.error(err));
      } else {
        res.status(404);
        res.json(data);
      }
    });
  //.then(json => console.log(json));
});

app.get('/serveurInt/:pseudo', (req, res) => {
  console.log(req.params);
  const url =
    'http://localhost:3001/api-bdr/compte/infosDeCompte/' + req.params.pseudo;
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

app.get('/module-formation/:id/par-enseignant', async (req, res) => {
  const { id } = req.params;
  const response = await fetch(
    `http://localhost:5000/api-graph/module-formation/${id}/par-enseignant`
  );
  const data = await response.json();
  res.json(data);
});

app.get('/unite-pedagogique/:id/par-module-formation', async (req, res) => {
  const { id } = req.params;
  const response = await fetch(
    `http://localhost:5000/api-graph/unite-pedagogique/${id}/par-module-formation`
  );
  const data = await response.json();
  res.json(data);
});

//port sur lequel le front va communiquer
const port = 7289;

app.listen(port, () => {
  console.log('Serveur central OK  -- sur le port : ' + port);
});
