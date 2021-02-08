require('colors');
const neode = require('./config/db');
const {
  noeud: {
    ChaineDescriptive,
    Enseignant,
    ModuleFormation,
    NiveauFormation,
    UnitePedagogique,
  },
  relation,
  noeud,
} = require('./models');

/**
 * @type ModuleFormation[]
 */
const moduleFormations = [
  {
    identifiant_module_formation: 1,
    nom: 'Physique',
  },
  {
    identifiant_module_formation: 2,
    nom: 'Svt',
  },
  {
    identifiant_module_formation: 3,
    nom: 'Maths',
  },
];

/**
 * @type {NiveauFormation[]}
 */
const niveauFormations = [
  {
    identifiant_niveau_formation: 1,
    nom: 'Terminal',
  },
  {
    identifiant_niveau_formation: 2,
    nom: 'Première',
  },
  {
    identifiant_niveau_formation: 3,
    nom: 'Seconde',
  },
];

/**
 * @type {Enseignant[]}
 */
const enseigants = [
  {
    identifiant_enseignant: 1,
  },
  {
    identifiant_enseignant: 2,
  },
  {
    identifiant_enseignant: 3,
  },
];

/**
 * @type {ChaineDescriptive[]}
 */
const chaineDescriptives = [
  {
    nom: 'Maths',
  },
  {
    nom: 'Physique',
  },
  {
    nom: 'Svt',
  },
];

/**
 * @type {{physique: UnitePedagogique[], maths: UnitePedagogique[], svt: UnitePedagogique[]}}
 */
const unitePedagogiques = {
  physique: [
    {
      identifiant_unite_pedagogique: 1,
      nom: 'Chapitre 1 - Introduction',
      url_resource: 'http://site-partage.com/chapitre-1.pdf',
    },
    {
      identifiant_unite_pedagogique: 2,
      nom: 'Chapitre 2 - Ondes et matière',
      url_resource: 'http://site-partage.com/chapitre-2.pdf',
    },
    {
      identifiant_unite_pedagogique: 3,
      nom: 'Chapitre 3 - Lois et modèle',
      url_resource: 'http://site-partage.com/chapitre-3.pdf',
    },
    {
      identifiant_unite_pedagogique: 4,
      nom: 'Chapitre 4 - Défis du XX1e siècle',
      url_resource: 'http://site-partage.com/chapitre-4.pdf',
    },
    {
      identifiant_unite_pedagogique: 5,
      nom: 'Chapitre 5 - Physique quantite',
      url_resource: 'http://site-partage.com/chapitre-5.pdf',
    },
    {
      identifiant_unite_pedagogique: 6,
      nom: 'Chapitre 6 - Introduction à la chimie organique',
      url_resource: 'http://site-partage.com/chapitre-5.pdf',
    },
    {
      identifiant_unite_pedagogique: 7,
      nom: 'Chapitre 7 - Les transformations chimiques',
      url_resource: 'http://site-partage.com/chapitre-7.pdf',
    },
  ],
  maths: [
    {
      identifiant_unite_pedagogique: 8,
      nom: 'Chapitre 1 - Nombre et calculs',
      url_resource: 'http://site-partage.com/chapitre-1.pdf',
    },
    {
      identifiant_unite_pedagogique: 9,
      nom: 'Chapitre 2 - Géométrie',
      url_resource: 'http://site-partage.com/chapitre-2.pdf',
    },
    {
      identifiant_unite_pedagogique: 10,
      nom: 'Chapitre 3 - Fonctions',
      url_resource: 'http://site-partage.com/chapitre-3.pdf',
    },
    {
      identifiant_unite_pedagogique: 11,
      nom: 'Chapitre 4 - Statistiques et probabilités',
      url_resource: 'http://site-partage.com/chapitre-4.pdf',
    },
    {
      identifiant_unite_pedagogique: 12,
      nom: 'Chapitre 5 - Algorithmique et programmation',
      url_resource: 'http://site-partage.com/chapitre-5.pdf',
    },
  ],
  svt: [
    {
      identifiant_unite_pedagogique: 13,
      nom: 'Chapitre 1 - Le patrimoine génétique',
      url_resource: 'http://site-partage.com/chapitre-1.pdf',
    },
    {
      identifiant_unite_pedagogique: 14,
      nom: 'Chapitre 2 - La tectonique des plaques',
      url_resource: 'http://site-partage.com/chapitre-2.pdf',
    },
    {
      identifiant_unite_pedagogique: 15,
      nom: "Chapitre 3 - Nourrir l'humanité",
      url_resource: 'http://site-partage.com/chapitre-3.pdf',
    },
    {
      identifiant_unite_pedagogique: 16,
      nom: 'Chapitre 4 - Féminin et masculin',
      url_resource: 'http://site-partage.com/chapitre-4.pdf',
    },
    {
      identifiant_unite_pedagogique: 17,
      nom: 'Chapitre 5 - Les variations génétiques et la santé',
      url_resource: 'http://site-partage.com/chapitre-5.pdf',
    },
    {
      identifiant_unite_pedagogique: 18,
      nom: "Chapitre 6 - De l'œil au cerveau",
      url_resource: 'http://site-partage.com/chapitre-5.pdf',
    },
  ],
};

const main = async () => {
  /** Suppression des données dans la base de donnée */
  await neode.model('ModuleFormation').deleteAll();
  await neode.model('NiveauFormation').deleteAll();
  await neode.model('Enseignant').deleteAll();
  await neode.model('ChaineDescriptive').deleteAll();
  await neode.model('UnitePedagogique').deleteAll();

  /** Insertion de donnée de test dans la base de donnée */
  await processInsertion();

  /** Mise en place des rélation */
  await processRelation();
};

main().then(() => {
  console.log('Mise à jour de base fini'.bgGreen.white);
  process.exit(0);
});

async function processRelation() {
  async function associationBetweenModuleFormationAndNiveauFormation() {
    for (const mf of moduleFormations) {
      const neo4jMf = await neode
        .model('ModuleFormation')
        .first('identifiant_module_formation', mf.identifiant_module_formation);
      const neo4jNf = await neode.model('NiveauFormation').all();
      for (const neo4jnf of neo4jNf) {
        const result = await neo4jMf.relateTo(neo4jnf, 'associe');
        console.log(
          `\t${result.startNode().get('nom')} -> ${result.endNode().get('nom')}`
            .bold.green
        );
      }
    }
  }

  async function associationBetweenModuleFormationAndFristUnitePedagogique() {
    for (const mf of moduleFormations) {
      const neo4jMf = await neode
        .model('ModuleFormation')
        .first('identifiant_module_formation', mf.identifiant_module_formation);
      let neo4jUp;
      switch (mf.nom) {
        case 'Physique':
          neo4jUp = await neode
            .model('UnitePedagogique')
            .first(
              'identifiant_unite_pedagogique',
              unitePedagogiques.physique[0].identifiant_unite_pedagogique
            );
          break;
        case 'Svt':
          neo4jUp = await neode
            .model('UnitePedagogique')
            .first(
              'identifiant_unite_pedagogique',
              unitePedagogiques.svt[0].identifiant_unite_pedagogique
            );
          break;
        case 'Maths':
          neo4jUp = await neode
            .model('UnitePedagogique')
            .first(
              'identifiant_unite_pedagogique',
              unitePedagogiques.maths[0].identifiant_unite_pedagogique
            );
          break;
      }
      const result = await neo4jMf.relateTo(neo4jUp, 'commence_par');
      console.log(
        `\t${result.startNode().get('nom')} -> ${result
          .endNode()
          .get('nom')}: ${result
          .endNode()
          .get('identifiant_unite_pedagogique')}`.bold.green
      );
    }
  }

  async function associationBetweenUnitePedagogiqueAndUnitePedagogique() {
    const physiqueNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        unitePedagogiques.physique[0].identifiant_unite_pedagogique
      );
    const svtNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        unitePedagogiques.svt[0].identifiant_unite_pedagogique
      );
    const mathsNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        unitePedagogiques.maths[0].identifiant_unite_pedagogique
      );

    async function relationRecursive(type, begin, next, idx) {
      if (idx > unitePedagogiques[type].length - 1) return;
      const nextNeo4j = await neode
        .model('UnitePedagogique')
        .first('identifiant_unite_pedagogique', next);
      const result = await begin.relateTo(nextNeo4j, 'suis');
      console.log(
        `\t\t${result.startNode().get('nom')} -> ${result.endNode().get('nom')}`
          .bold.green
      );
      await relationRecursive(type, nextNeo4j, next + 1, idx + 1);
    }
    console.log(`\tSvt: `.bold.cyan);
    await relationRecursive('svt', svtNeo4j, 14, 1);

    console.log(`\tMaths: `.bold.cyan);
    await relationRecursive('maths', mathsNeo4j, 9, 1);

    console.log(`\tPhysique: `.bold.cyan);
    await relationRecursive('physique', physiqueNeo4j, 2, 1);
  }

  async function associationBetweenEnseigantAndUnitePedagogique() {
    const enseigantPhysique = await neode
      .model('Enseignant')
      .first('identifiant_enseignant', enseigants[0].identifiant_enseignant);
    const enseigantSvt = await neode
      .model('Enseignant')
      .first('identifiant_enseignant', enseigants[1].identifiant_enseignant);
    const enseigantMaths = await neode
      .model('Enseignant')
      .first('identifiant_enseignant', enseigants[2].identifiant_enseignant);

    const { records: physique } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Physique" RETURN nn,n',
      {}
    );
    const { records: maths } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Maths" RETURN nn,n',
      {}
    );
    const { records: svt } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Svt" RETURN nn,n',
      {}
    );

    console.log('\tPhysique: '.bold.cyan);
    let unitePedagogiqueNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        physique[0].get('nn').properties.identifiant_unite_pedagogique
      );
    await enseigantPhysique.relateTo(unitePedagogiqueNeo4j, 'a_creer');
    console.log(
      `\t\tEnseignant: ${enseigantPhysique.get(
        'identifiant_enseignant'
      )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
    );
    for (const e of physique) {
      unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await enseigantPhysique.relateTo(unitePedagogiqueNeo4j, 'a_creer');
      console.log(
        `\t\tEnseignant: ${enseigantPhysique.get(
          'identifiant_enseignant'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }

    console.log('\tMath: '.bold.cyan);

    unitePedagogiqueNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        maths[0].get('nn').properties.identifiant_unite_pedagogique
      );
    await enseigantMaths.relateTo(unitePedagogiqueNeo4j, 'a_creer');
    console.log(
      `\t\tEnseignant: ${enseigantMaths.get(
        'identifiant_enseignant'
      )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
    );
    for (const e of maths) {
      unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await enseigantMaths.relateTo(unitePedagogiqueNeo4j, 'a_creer');
      console.log(
        `\t\tEnseignant: ${enseigantMaths.get(
          'identifiant_enseignant'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }

    console.log('\tSvt: '.bold.cyan);

    unitePedagogiqueNeo4j = await neode
      .model('UnitePedagogique')
      .first(
        'identifiant_unite_pedagogique',
        svt[0].get('nn').properties.identifiant_unite_pedagogique
      );
    await enseigantSvt.relateTo(unitePedagogiqueNeo4j, 'a_creer');
    console.log(
      `\t\tEnseignant: ${enseigantSvt.get(
        'identifiant_enseignant'
      )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
    );
    for (const e of svt) {
      unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await enseigantSvt.relateTo(unitePedagogiqueNeo4j, 'a_creer');
      console.log(
        `\t\tEnseignant: ${enseigantSvt.get(
          'identifiant_enseignant'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }
  }

  async function associationBetweenChaineDescriptivetAndUnitePedagogique() {
    const neo4jMathsChaineDescription = await neode
      .model('ChaineDescriptive')
      .first({ nom: 'Maths' });
    const neo4jSvtChaineDescription = await neode
      .model('ChaineDescriptive')
      .first({ nom: 'Svt' });
    const neo4jPhyqiueChaineDescription = await neode
      .model('ChaineDescriptive')
      .first({ nom: 'Physique' });

    const { records: physique } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Physique" RETURN nn,n',
      {}
    );
    const { records: maths } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Maths" RETURN nn,n',
      {}
    );
    const { records: svt } = await neode.cypher(
      'MATCH (mf:ModuleFormation) - [:COMMENCE_PAR] -> (nn:UnitePedagogique) - [:SUIS*] -> (n:UnitePedagogique) WHERE mf.nom = "Svt" RETURN nn,n',
      {}
    );

    console.log('\tPhysique: '.bold.cyan);
    for (const e of physique) {
      let unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await neo4jPhyqiueChaineDescription.relateTo(
        unitePedagogiqueNeo4j,
        'decrit'
      );
      console.log(
        `\t\tChaine Descriptive: ${neo4jPhyqiueChaineDescription.get(
          'nom'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }

    console.log('\tSvt: '.bold.cyan);
    for (const e of svt) {
      let unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await neo4jSvtChaineDescription.relateTo(unitePedagogiqueNeo4j, 'decrit');
      console.log(
        `\t\tChaine Descriptive: ${neo4jSvtChaineDescription.get(
          'nom'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }

    console.log('\tMaths: '.bold.cyan);
    for (const e of maths) {
      let unitePedagogiqueNeo4j = await neode
        .model('UnitePedagogique')
        .first(
          'identifiant_unite_pedagogique',
          e.get('n').properties.identifiant_unite_pedagogique
        );
      await neo4jMathsChaineDescription.relateTo(
        unitePedagogiqueNeo4j,
        'decrit'
      );
      console.log(
        `\t\tChaine Descriptive: ${neo4jMathsChaineDescription.get(
          'nom'
        )} -> Unité pédagogique: ${unitePedagogiqueNeo4j.get('nom')}`.bold.green
      );
    }
  }

  console.log(
    'Création des rélation entre les modules de formation et les niveaux de formation: '
      .underline.bold.cyan
  );
  await associationBetweenModuleFormationAndNiveauFormation();

  console.log(
    'Création des rélation entres les modules de formation et le prémier de chaque unité pédagogique: '
      .underline.bold.cyan
  );
  await associationBetweenModuleFormationAndFristUnitePedagogique();

  console.log(
    'Création des rélation entres les unités pédagogique et le suivant: '
      .underline.bold.cyan
  );
  await associationBetweenUnitePedagogiqueAndUnitePedagogique();

  console.log(
    'Création des rélation entres les enseigants et leur unité pédagogique: '
      .underline.bold.cyan
  );
  await associationBetweenEnseigantAndUnitePedagogique();

  console.log(
    'Création des rélation entres les chaines descriptive et les unités pédagogiques: '
      .underline.bold.cyan
  );
  await associationBetweenChaineDescriptivetAndUnitePedagogique();
}

async function processInsertion() {
  async function insertionUnitePedagogiqueSvt() {
    for (const up of unitePedagogiques.svt) {
      try {
        await neode.model('UnitePedagogique').create(up);
        console.log(`\tInsertion de ${up.nom} (Svt)`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${up.nom}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionUnitePedagogiqueMaths() {
    for (const up of unitePedagogiques.maths) {
      try {
        await neode.model('UnitePedagogique').create(up);
        console.log(`\tInsertion de ${up.nom} (Maths)`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${up.nom}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionUnitePedagogiquePhysique() {
    for (const up of unitePedagogiques.physique) {
      try {
        await neode.model('UnitePedagogique').create(up);
        console.log(`\tInsertion de ${up.nom} (Physique)`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${up.nom}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionChaineDescriptive() {
    for (const cd of chaineDescriptives) {
      try {
        await neode.model('ChaineDescriptive').create(cd);
        console.log(`\tInsertion de ${cd.nom}`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${cd.nom}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionEnseigant() {
    for (const e of enseigants) {
      try {
        await neode.model('Enseignant').create(e);
        console.log(`\tInsertion de ${e.identifiant_enseignant}`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${e.identifiant_enseignant}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionNiveauFormation() {
    for (const nf of niveauFormations) {
      try {
        await neode.model('NiveauFormation').create(nf);
        console.log(`\tInsertion de ${nf.nom}`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${nf.nom}`.red);
        process.exit(1);
      }
    }
  }

  async function insertionModuleFormation() {
    for (const mf of moduleFormations) {
      try {
        await neode.model('ModuleFormation').create(mf);
        console.log(`\tInsertion de ${mf.nom} reussie`.bold.green);
      } catch (e) {
        console.log(`\Impossible d'inserser ${mf.nom}`.red);
        process.exit(1);
      }
    }
  }

  console.log('Création des modules de formation: '.underline.bold.cyan);
  await insertionModuleFormation(); // ModuleFormation

  console.log('Création des niveaux de formations: '.underline.bold.cyan);
  await insertionNiveauFormation(); // Niveau Formation

  console.log('Création des enseignants: '.underline.bold.cyan);
  await insertionEnseigant(); // Enseignant

  console.log('Création des chaines descriptives: '.underline.bold.cyan);
  await insertionChaineDescriptive(); // ChaineDescriptive

  console.log(
    'Création des unités pédagogiques (physique): '.underline.bold.cyan
  );
  await insertionUnitePedagogiquePhysique(); // UnitePedagogique (Physique)

  console.log('Création des unités pédagogiques (maths): '.underline.bold.cyan);
  await insertionUnitePedagogiqueMaths(); // UnitePedagogique (Maths)

  console.log('Création des unités pédagogiques (svt): '.underline.bold.cyan);
  await insertionUnitePedagogiqueSvt(); // UnitePedagogique (Svt)
}
