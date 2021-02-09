const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'springstudent',
  password: 'Springstudent_98',
  database: 'FormationBD',
});

connection.connect();
app.get('/', function (req, res) {
  res.send('get api mariadb');
});

//autentification d'un compte.
app.post('/login/Connexion', function (req, res) {
  console.log("post appelé pour l'authentification");
  console.log(req.body);
  connection.query(
    'SELECT pseudo , motdepasse FROM Compte where pseudo = "?" and motdepasse = "?";',
    [req.body.pseudo, req.body.motdepasse],
    function (err, result) {
      if (err) {
        return res.json({ error: true, message: 'Error occurred' + err });
      } else {
        console.log('compte connecté');
        res.json({ Connexion: 'ok' });
      }
    }
  );
});

//recuperation des infos d'un compte.
app.get('/infosDeCompte/:pseudo', function (req, res) {
  console.log("get appelé recuperation des infos d'un compte.");
  console.log(req.params);
  connection.query(
    "SELECT * FROM  Compte where pseudo = '" + req.params.pseudo + "'",
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

//creation d'un compte dans la base de données
app.post('/creationDeCompte', function (req, res) {
  console.log("post appelé pour la creation d'un compte");
  console.log(req.body);
  connection.query(
    'insert into Compte (pseudo,motdepasse) values (?,?);',
    [req.body.pseudo, req.body.motdepasse],
    function (err, result) {
      if (err) throw err;
      console.log('compte inséré');
      res.json({ 'Compte créé ': 'Ok' });
    }
  );
});

//modification d'un compte dans la base de données
app.put('/modificationDeCompte', (req, res) => {
  var sql =
    "UPDATE COMPTE SET pseudo='" +
    req.body.pseudo +
    "', motdepasse='" +
    req.body.motdepasse +
    "' WHERE pseudo=" +
    req.params.pseudo;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//Supprime d'un compte dans la base de données
app.delete('/supprimeDeCompte/:pseudo', (req, res) => {
  var sql = 'DELETE FROM Compte WHERE  pseudo=' + req.params.pseudo;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ 'Compte supprimé ': 'Ok' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(
    'le serveur fonctionne pour l"API mariadb fonctionne sur le port : ' + port
  );
});
