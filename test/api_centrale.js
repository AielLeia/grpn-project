const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');

app.use(cors());

app.get('/serveurInt', (req, res) => {

    fetch(`http://localhost:3000/api-bdr/compte/login/Connexion`)
        .then(response => 
            response.json()
            )
        .then(response => {
            return res.send(response);
        })
        .catch(err => console.error(err))
});
//port sur lequel le front va communiquer
const port = 7289;

app.listen(port, () => {
    console.log("Serveur central OK");
});