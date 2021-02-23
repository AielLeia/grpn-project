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

module.exports = router;
