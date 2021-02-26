require('colors');
require('dotenv').config();
const CryptoJs = require('crypto-js');
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT),
});

/// ========================================================================
/// Définition des données à insérer
/// ========================================================================

/**
 * @type {{id: number, pseudo: string, motDePasse: string, nom: string, prenom: string, adresseMail: string}[]}
 */
const comptes = [
  {
    id: 1,
    pseudo: 'junior',
    motDePasse: CryptoJs.AES.encrypt('junior', 'test123').toString(),
    nom: 'ELENGA JUNIOR',
    prenom: 'Junior',
    adresseMail: 'juniorelengaalphonse@gmail.com',
  },
  {
    id: 2,
    pseudo: 'ismed',
    motDePasse: CryptoJs.AES.encrypt('ismael', 'test123').toString(),
    nom: 'MOHAMED BOUH',
    prenom: 'Ismael',
    adresseMail: 'ismael@gmail.com',
  },
  {
    id: 3,
    pseudo: 'ali',
    motDePasse: CryptoJs.AES.encrypt('ali', 'test123').toString(),
    nom: 'HADJ-SAID',
    prenom: 'Ali',
    adresseMail: 'ali@gmail.com',
  },
];

/**
 * @type {{id: number, nom: string}[]}
 */
const niveauFormations = [
  {
    id: 1,
    nom: 'Terminal',
  },
  {
    id: 2,
    nom: 'Première',
  },
  {
    id: 3,
    nom: 'Seconde',
  },
];

/**
 * @type {{id: number, nom: string, compte_id: number}[]}
 */
const moduleFormations = [
  {
    id: 1,
    nom: 'Physique',
    compte_id: 1,
  },
  {
    id: 2,
    nom: 'Svt',
    compte_id: 2,
  },
  {
    id: 3,
    nom: 'Maths',
    compte_id: 3,
  },
];

/**
 * @type {{niveau_formation_id: number, module_formation_id: number}[]}
 */
const niveauFormationsModuleFormmations = [
  {
    niveau_formation_id: 1,
    module_formation_id: 1,
  },
  {
    niveau_formation_id: 1,
    module_formation_id: 2,
  },
  {
    niveau_formation_id: 1,
    module_formation_id: 3,
  },
  {
    niveau_formation_id: 2,
    module_formation_id: 1,
  },
  {
    niveau_formation_id: 2,
    module_formation_id: 2,
  },
  {
    niveau_formation_id: 2,
    module_formation_id: 3,
  },
  {
    niveau_formation_id: 3,
    module_formation_id: 1,
  },
  {
    niveau_formation_id: 3,
    module_formation_id: 2,
  },
  {
    niveau_formation_id: 3,
    module_formation_id: 3,
  },
];

/**
 * @type {{id: numbeer, nom: string, compte_id: number, module_formation_id: number}[]}
 */
const unitePedagogiques = [
  {
    id: 1,
    nom: 'Chapitre 1 - Introduction',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 2,
    nom: 'Chapitre 2 - Ondes et matière',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 3,
    nom: 'Chapitre 3 - Lois et modèle',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 4,
    nom: 'Chapitre 4 - Défis du XX1e siècle',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 5,
    nom: 'Chapitre 5 - Physique quantite',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 6,
    nom: 'Chapitre 6 - Introduction à la chimie organique',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 7,
    nom: 'Chapitre 7 - Les transformations chimiques',
    compte_id: 1,
    module_formation_id: 1,
  },
  {
    id: 8,
    nom: 'Chapitre 1 - Nombre et calculs',
    compte_id: 3,
    module_formation_id: 3,
  },
  {
    id: 9,
    nom: 'Chapitre 2 - Géométrie',
    compte_id: 3,
    module_formation_id: 3,
  },
  {
    id: 10,
    nom: 'Chapitre 3 - Fonctions',
    compte_id: 3,
    module_formation_id: 3,
  },
  {
    id: 11,
    nom: 'Chapitre 4 - Statistiques et probabilités',
    compte_id: 3,
    module_formation_id: 3,
  },
  {
    id: 12,
    nom: 'Chapitre 5 - Algorithmique et programmation',
    compte_id: 3,
    module_formation_id: 3,
  },
  {
    id: 13,
    nom: 'Chapitre 1 - Le patrimoine génétique',
    compte_id: 2,
    module_formation_id: 2,
  },
  {
    id: 14,
    nom: 'Chapitre 2 - La tectonique des plaques',
    compte_id: 2,
    module_formation_id: 2,
  },
  {
    id: 15,
    nom: "Chapitre 3 - Nourrir l'humanité",
    compte_id: 2,
    module_formation_id: 2,
  },
  {
    id: 16,
    nom: 'Chapitre 4 - Féminin et masculin',
    compte_id: 2,
    module_formation_id: 2,
  },
  {
    id: 17,
    nom: 'Chapitre 5 - Les variations génétiques et la santé',
    compte_id: 2,
    module_formation_id: 2,
  },
  {
    id: 18,
    nom: "Chapitre 6 - De l'œil au cerveau",
    compte_id: 2,
    module_formation_id: 2,
  },
];

const main = async () => {
  connection.connect();
  /** @type {mysqlDriver.QueryFunction} */
  const query = util.promisify(connection.query).bind(connection);

  /// ========================================================================
  /// Destuction de la base de donnée, puis ré-création de de celle-ci
  /// ========================================================================
  await query(`DROP DATABASE IF EXISTS ${process.env.DATABASE}`);
  await query(`CREATE DATABASE ${process.env.DATABASE}`);
  await query(`USE ${process.env.DATABASE}`);
  console.log(
    `Destuction de la base de donnée, puis ré-création de de celle-ci: ${process.env.DATABASE}`
      .bgGreen.white.bold
  );

  await query('set foreign_key_checks=0'); // Désactivation de la vérification des clé étrangère

  /// ========================================================================
  /// Construction de la table des comptes
  /// ========================================================================
  await query(
    `CREATE TABLE compte (
        id INT(11) NOT NULL AUTO_INCREMENT,
        pseudo varchar(255) NOT NULL,
        motDePasse varchar(255) NOT NULL,
        nom varchar(255) NOT NULL,
        prenom varchar(255) NOT NULL,
        adresseMail varchar(255) NOT NULL,
        admin TINYINT(1) NOT NULL DEFAULT 0,
        CONSTRAINT PK_id PRIMARY KEY (id),
        CONSTRAINT UNIQUE_pseudo UNIQUE (pseudo)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
  );
  console.log('Contruction de la table des comptes: '.underline.cyan.bold);
  for (const c of comptes) {
    await query(`
      INSERT INTO compte (id, pseudo, motDePasse, nom, prenom, adresseMail) VALUES
      (${c.id}, "${c.pseudo}", "${c.motDePasse}", "${c.nom}", "${c.prenom}", "${c.addresseMail}");
    `);
    console.log(
      `\t-> Insertion: (${c.id}, ${c.pseudo}", "${c.motDePasse}", "${c.nom}", "${c.prenom}", "${c.addresseMail}")`
        .green.bold
    );
  }

  /// ========================================================================
  /// Construction de la table des module de formation
  /// ========================================================================
  await query(`
    CREATE TABLE module_formation (
      id int(11) NOT NULL AUTO_INCREMENT,
      nom varchar(255) DEFAULT NULL,
      compte_id int(11) NOT NULL,
      CONSTRAINT PK_id PRIMARY KEY (id),
      CONSTRAINT UNIQUE_nom UNIQUE (nom)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log(
    'Contruction de la table des modules des formation: '.underline.cyan.bold
  );
  for (const mf of moduleFormations) {
    await query(`
      INSERT INTO module_formation (id, nom, compte_id) VALUES
      (${mf.id}, "${mf.nom}", ${mf.compte_id});
    `);
    console.log(
      `\t-> Insertion: (${mf.id}, "${mf.nom}", ${mf.compte_id})`.green.bold
    );
  }

  /// ========================================================================
  /// Construction de la table des niveaeux de formations
  /// ========================================================================
  await query(`
    CREATE TABLE niveau_formation (
      id int(11) NOT NULL AUTO_INCREMENT,
      nom varchar(255) NOT NULL,
      CONSTRAINT PK_id PRIMARY KEY (id),
      CONSTRAINT UNIQUE_nom UNIQUE (nom)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log(
    'Contruction de la table des niveaux de formations: '.underline.cyan.bold
  );
  for (const nf of niveauFormations) {
    await query(`
      INSERT INTO niveau_formation (id, nom) VALUES
      (${nf.id}, "${nf.nom}");
    `);
    console.log(`\t-> Insertion: (${nf.id}, "${nf.nom}")`.green.bold);
  }

  /// ========================================================================
  /// Construction de la table de jointure entre les niveaux de formations
  /// et les modules de formations
  /// ========================================================================
  await query(`
    CREATE TABLE niveau_formation_module_formation (
      niveau_formation_id int(11) NOT NULL,
      module_formation_id int(11) NOT NULL,
      CONSTRAINT PK_niveau_formation_id_module_formation_id PRIMARY KEY (niveau_formation_id, module_formation_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log(
    'Contruction de la table des niveaux de formations: '.underline.cyan.bold
  );
  for (const nf_mf of niveauFormationsModuleFormmations) {
    await query(`
      INSERT INTO niveau_formation_module_formation (niveau_formation_id, module_formation_id) VALUES
      (${nf_mf.niveau_formation_id}, ${nf_mf.module_formation_id});
    `);
    console.log(
      `\t-> Insertion: (${nf_mf.niveau_formation_id}, ${nf_mf.module_formation_id})`
        .green.bold
    );
  }

  /// ========================================================================
  /// Construction de la table des unités pédagogiques
  /// ========================================================================
  await query(`
    CREATE TABLE unite_pedagogique (
      id int(11) NOT NULL AUTO_INCREMENT,
      nom varchar(255) NOT NULL,
      compte_id int(11) NOT NULL,
      module_formation_id int(11) NOT NULL,
      CONSTRAINT PK_id PRIMARY KEY (id),
      CONSTRAINT UNIQUE_nom UNIQUE(nom)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
  console.log(
    'Contruction de la table des niveaux de formations: '.underline.cyan.bold
  );
  for (const up of unitePedagogiques) {
    await query(`
      INSERT INTO unite_pedagogique (id, nom, compte_id, module_formation_id) VALUES
      (${up.id}, "${up.nom}", ${up.compte_id}, ${up.module_formation_id});
    `);
    console.log(
      `\t-> Insertion: (${up.id}, "${up.nom}", ${up.compte_id}, ${up.module_formation_id})`
        .green.bold
    );
  }

  await query('set foreign_key_checks=1'); // Réactivation de la vérifcation des clès étrangère
};

main().then(() => process.exit(0));
