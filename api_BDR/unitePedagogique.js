const mysql = require('mysql');
const router = require('express').Router();
var CryptoJS = require("crypto-js");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'FormationBD',
    port: 8889
  });

  connection.connect();



  module.exports = router;