require('colors');
const mysqlDriver = require('mysql');
const util = require('util');

const connection = mysqlDriver.createConnection({
  host: 'localhost',
  user: 'springstudent',
  password: 'Springstudent_98',
  database: 'FormationBD',
  port: 3306,
});

const comptes = [
  {
    pseudo: 'junior',
    motDePasse: 'junior',
    nom: 'ELENGA JUNIOR',
    prenom: 'Junior',
    addresseMail: 'juniorelengaalphonse@gmail.com',
  },
  {
    pseudo: 'ismed',
    motDePasse: 'ismael',
    nom: 'MOHAMED BOUH',
    prenom: 'Ismael',
    addresseMail: 'ismael@gmail.com',
  },
  {
    pseudo: 'ali',
    motDePasse: 'ali',
    nom: 'HADJ-SAID',
    prenom: 'Ali',
    addresseMail: 'ali@gmail.com',
  },
];

const main = async () => {
  connection.connect();
  /** @type {mysqlDriver.QueryFunction} */
  const query = util.promisify(connection.query).bind(connection);

  await query('set foreign_key_checks=0'); // Désactivation de la vérification des clé étrangère

  /// ========================================================================
  /// Destruction puis ré-création de toute les tables de la base de données.
  /// ========================================================================
  await query('DROP TABLES IF EXISTS Compte');
  await query('DROP TABLES IF EXISTS Compte_has_Messages');
  await query('DROP TABLES IF EXISTS Messages');
  await query('DROP TABLES IF EXISTS ModuleFormation');
  await query('DROP TABLES IF EXISTS NiveauFormation');
  await query('DROP TABLES IF EXISTS UnitePedagogique');
  await query('DROP TABLES IF EXISTS UnitePedagogique_has_NiveauFormation');
  console.log(
    'Destruction puis ré-création de toute les tables de la base de données.'
      .bgGreen.white.bold
  );

  /// ========================================================================
  /// Construction de la table des comptes
  /// ========================================================================
  await query(
    'CREATE TABLE `Compte` (' +
      '`pseudo` varchar(45) NOT NULL,' +
      '`motDePasse` varchar(256) DEFAULT NULL,' +
      '`nom` varchar(45) DEFAULT NULL,' +
      '`prenom` varchar(45) DEFAULT NULL,' +
      '`adresseMail` varchar(45) DEFAULT NULL' +
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8;'
  );
  console.log('Contruction de la table des comptes: '.underline.cyan.bold);
  for (const c of comptes) {
    await query(`
      INSERT INTO Compte (pseudo, motDePasse, nom, prenom, adresseMail) VALUES
      ('${c.pseudo}', '${c.motDePasse}', '${c.nom}', '${c.prenom}', '${c.addresseMail}');
    `);
    console.log(
      `\t-> Insertion: ('${c.pseudo}', '${c.motDePasse}', '${c.nom}', '${c.prenom}', '${c.addresseMail}')`
        .green.bold
    );
  }

  /// ========================================================================
  /// Construction de la table des messages
  /// ========================================================================
  await query(`
    CREATE TABLE Messages (
      idMessages int(11) NOT NULL,
      messageEnvoye varchar(45) DEFAULT NULL,
      messageRecu varchar(45) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log('Construction de la table des messages: '.underline.cyan.bold);

  /// ========================================================================
  /// Construction de la table de jointure entre compte et message
  /// ========================================================================
  await query(`
    CREATE TABLE Compte_has_Messages (
      Compte_pseudo varchar(45) NOT NULL,
      Messages_idMessages int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log(
    'Construction de la table de jointure entre compte et message: '.underline
      .cyan.bold
  );

  await query('set foreign_key_checks=1'); // Réactivation de la vérifcation des clès étrangère
};

main().then(() => process.exit(0));
