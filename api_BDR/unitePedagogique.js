const mysql = require('mysql');
const router = require('express').Router();
var CryptoJS = require('crypto-js');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: parseInt(process.env.PORT),
});

connection.connect();

router.get('/listeUP', function (req, res) {
  console.log("get appelé recuperation de la Liste des UP.");
  connection.query(
    "SELECT * FROM  UnitePedagogique",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length <= 0) {
        res.json({ ModuleFormation: 'Liste des UP vide' });
      } else {
        res.json(results[0]);
      }
    }
  );
});

//unite-pedagogique a creer 
router.post('/creationUnitePedagogique/', function (req, res) {
  console.log("post appelé pour la creation d'un UP");
  console.log(req.body);
  const id = Math.floor(Math.random() * 1000) + 2;
  connection.query(
    'INSERT INTO `UnitePedagogique` (`idUP`, `nomUP`, `Compte_pseudo`) values ( "'+id+'",?,?);',
    [
      req.body.nomUP,
      req.body.Compte_pseudo,
    ],
    function (err, result) {
      if (err) throw err;
      console.log();
      if (result.length <= 0) {
        res.json({ CreationCompte: 'Veuillez vérifier le UnitePedagogique ' });
      } else {
        console.log('UnitePedagogique inséré');
        res.json({ 'UnitePedagogique ': 'Ok' });
      }
    }
  );

  
});


module.exports = router;
