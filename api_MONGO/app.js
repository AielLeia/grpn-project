/**
 * *******************************************************************************************************************************************************
 *                                                               
 *                                                                   AUTEUR: ALI HADJ-SAID
 *                                                  API MONGODB POUR LA GESTION DES MESSAGES UTILISATEURS
 * 
 * VERSION MONGO dB : 4.4.3
 * VERSION NODE.JS 12.18.2
 * 
 * 
 * *******************************************************************************************************************************************************
 */

/*
*body-parser pour faciliter la récupération des parametres envoyés en method POST
*/
var bodyParser = require('body-parser');
/*
*Mongoose un module pour manipuler facilement la base de données mongoDb
*/
var mongoose= require('mongoose')

/**
 * Utilisation du framwork Express.Js
 */
var express = require('express');
var app = express();
/**
 * Url de connexion a la base de données
 * Host : localhost
 * PORT 27017 (pardefault)
 * base de données: dbProjet
 * 
 */
var url = "mongodb://localhost:27017/dbprojet";

const Message=require('./models/message')
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/**
 * Envoyer un message pour un utilisateur 
 * idSource: identifiant de celui qui envoie le message
 * idDestination: un tableau de identifiants des utilisateurs
 * contenu: le contenu du message à envoyer 
 */
  app.post('/envoyerMessage', function(req, res) {
    const message = new Message({
      _id:mongoose.Types.ObjectId(),
      idSource: req.body.idSource,
      idDestination:req.body.idDestination,
      contenu:req.body.contenu,
      date:Date()
    });

    console.log("/////"+req.body.idSource);
    message.save().
    then(r=>{res.json({"message":"ok"})})  // message enregistré avec succes
    .catch(r=>{res.json({"message":"erreur"})}); // erreur enregistrement du message 
  });
    
/**
 * @auteur: Ali HADJ-SAID
 * lister tous les messages recus 
 * parametre un identifiant du l'utilisateur 
 * 
 */
  app.get('/messagesRecus/:pseudo', function(req, res) {
    const param = req.params.pseudo;
    const query= (Message.find({idDestination:param}).sort({"date":1}));
    query.exec().then(res1=>res.send(res1));
    
  });

/**
 * @auteur: Ali HADJ-SAID
 * lister tosu les messages envoyés 
 * parametre un identifiant du l'utilisateur 
 * 
 */

  app.get('/messagesEnvoyes/:pseudo', function(req, res) {
    const query= (Message.find({"idSource":req.params.pseudo}).sort({"date":1}));
    query.exec().then(res1=>res.send(res1));
    
  });

  /**
 * @auteur: Ali HADJ-SAID
 * lister tous les messages 
 * parametre un identifiant du l'utilisateur 
 * 
 */

  app.get('/messages/:pseudo', function(req, res) {
    const query= (Message.find({"$or":[{"idSource":req.params.pseudo},{idDestination:req.params.pseudo}]}).sort({"date":1}));
    query.exec().then(res1=>res.send(res1));
    
  });

/**
 * @auteur: Ali HADJ-SAID
 * renvoie le nombre messages d'un utilisateur 
 * parametre un identifiant du l'utilisateur 
 * 
 */
  app.get('/nbMessages/:pseudo', function(req, res) {
    const query= (Message.find({"$or":[{"idSource":req.params.pseudo},{"idDestination":req.params.pseudo}]}).sort({"date":1}));
    query.exec().then(res1=>res.send({"res":res1.length}));
    
  });

  /**
 * @auteur: Ali HADJ-SAID
 * renvoie le nombre de messages envoyés  d'un utilisateur 
 * parametre un identifiant du l'utilisateur 
 * 
 */
  app.get('/nbMessagesEnvoyes/:pseudo', function(req, res) {
    const query= (Message.find({"idSource":req.params.pseudo}));
    query.exec().then(res1=>res.send({"res":res1.length}));
    
  });

/**
 * @auteur: Ali HADJ-SAID
 * renvoie le nombre de messages Recus  d'un utilisateur 
 * parametre un identifiant du l'utilisateur 
 * 
 */

  app.get('/nbMessagesRecus/:pseudo', function(req, res) {
    const query= (Message.find({"idDestination":req.params.pseudo}));
    query.exec().then(res1=>res.send({"res":res1.length}));
    
  });



