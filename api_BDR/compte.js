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

 
  // Encrypt
  const motDePasseEncrypter  =(motDePasse)=>{ 
    const resultat= CryptoJS.AES.encrypt(motDePasse, 'test123').toString(); 
    console.log('hash : ' + resultat)
    return   resultat;
  } 

   // Decrypt
  const motDePasseDeCrypter  =(motDePasse) => 
  {
    const resultatDecrypt=  CryptoJS.AES.decrypt(motDePasse, 'test123');
    console.log(resultat);
     const resultatFinal= resultatDecrypt.toString(CryptoJS.enc.Utf8);
     console.log(resultatFinal);
     return resultatFinal;
}



  
//autentification d'un compte.
router.post('/login/Connexion', function(req, res) {
    console.log("post appelé pour l'authentification");
    console.log(req.body);
    connection.query('SELECT pseudo , motdepasse FROM Compte where pseudo = ? and motDePasse = ?;'
    ,[req.body.pseudo, motDePasseEncrypter(req.body.motDePasse) ], 
        function (err, result) {
            if (err) throw err;
            if (result.length <= 0) {
              console.log('Veuillez vérifier votre pseudo ou de mot de passe ');
              res.json({ Connexion: 'Veuillez vérifier votre pseudo ou de mot de passe ' });
            }else{
              console.log('Compte connnecté');
              res.json({ Connexion: 'ok' });
            }
            
          });
    
      }); 
  
  //recuperation des infos d'un compte.
  router.get('/infosDeCompte/:pseudo', function (req, res) {
    console.log("get appelé recuperation des infos d'un compte.");
    console.log(req.params);
    connection.query(
      "SELECT * FROM  Compte where pseudo = '" + req.params.pseudo + "'",
      function (error, results, fields) {
        if (error) throw error;
        if (result.length <= 0) {
          res.json({ infosDeCompte: 'Veuillez vérifier le pseudo Rechercher ' });
        }else{
          res.json(results[0]);
        }
        
      }
    );
  });
  
  //creation d'un compte dans la base de données
  router.post('/creationDeCompte', function (req, res) {
    console.log("post appelé pour la creation d'un compte");
    console.log(req.body);
    connection.query(
      'insert into Compte (pseudo,motdepasse,nom,prenom, adresseMail) values (?,?,?,?,?);',
      [req.body.pseudo, motDePasseEncrypter(req.body.motdepasse) , req.body.nom, req.body.prenom , req.body.adresseMail],
      function (err, result) {
        if (err) throw err;
        if (result.length <= 0) {
          res.json({ infosDeCompte: 'Veuillez vérifier le pseudo Rechercher ' });
        }else{
          console.log('compte inséré');
          res.json({ 'Compte créé ': 'Ok' });
        }
      }
    );
  });
  
  //modification d'un compte dans la base de données
  router.put('/modificationDeCompte', function(req, res)  {
    console.log("put appelé pour la modification d'un compte");
    console.log(req.body);
    connection.query(
      'UPDATE COMPTE SET pseudo= ? , motdepasse= ?,nom = ?,prenom = ?, adresseMail = ? WHERE pseudo = "'+req.body.pseudo+'" ',
    [req.body.pseudo, motDePasseEncrypter(req.body.motdepasse) , req.body.nom, req.body.prenom , req.body.adresseMail],
    function (err, results)  {
      if (err) throw err;
      console.log('Compte modifié');
      res.json({ 'Compte modiffié ': 'Ok' });
    });
  });
  
  //Supprime d'un compte dans la base de données
  router.delete('/supprimeDeCompte/:pseudo', (req, res) => {
    var sql = "DELETE FROM Compte WHERE  pseudo='" + req.params.pseudo + "'";
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json({ 'Compte supprimé ': 'Ok' });
    });
  });
  
  module.exports = router;
  