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

router.get('/listeMF', function (req, res) {
  console.log("get appelé recuperation de la Liste des MF.");
  connection.query(
    "SELECT * FROM  ModuleFormation",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length <= 0) {
        res.json({ ModuleFormation: 'Liste des MF vide' });
      } else {
        res.json(results[0]);
      }
    }
  );
});

module.exports = router;
