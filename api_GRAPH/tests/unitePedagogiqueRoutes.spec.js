const request = require('supertest');
const app = require('../app');
const { execSync } = require('child_process');

const URL = '/api-graph';

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

describe("Point d'entrée des modules de fomation", () => {
  beforeAll(() => {
    execSync('node seeder.js');
  });
  it('GET /api-graph/unite-pedagogique/:id/par-module-formation', async () => {
    const res = await request(app).get(
      `${URL}/unite-pedagogique/1/par-module-formation`
    );
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toBeDefined();
    for (
      let i = 0;
      body[i].identifiant_unite_pedagogique_suivant != null;
      i++
    ) {
      expect(body[i].identifiant_unite_pedagogique_suivant).toEqual(
        body[i + 1].id
      );
    }
  });

  it('GET /api-graph/unite-pedagogique', async () => {
    const res = await request(app).get(`${URL}/unite-pedagogique`);
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toBeDefined();
  });

  it("GET /api-graph/unite-pedagogique/:id/par-module-formation n'existe pas", async () => {
    const res = await request(app).get(
      `${URL}/unite-pedagogique/546546/par-module-formation`
    );
    expect(res.statusCode).toEqual(404);
    const { body } = res;
    expect(body).toMatchObject({
      message: 'Aucunes unités pédagogiques encore disponible',
    });
  });

  it('GET /api-graph/unite-pedagogique/:id', async () => {
    const res = await request(app).get(`${URL}/unite-pedagogique/1`);
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toMatchObject({
      identifiant_unite_pedagogique: 1,
      nom: 'Chapitre 1 - Introduction',
      url_resource: 'http://site-partage.com/chapitre-1.pdf',
    });
  });

  it('GET /api-graph/unite-pedagogique/:id avec un identifiant non présent dans la base de donnée', async () => {
    const res = await request(app).get(`${URL}/unite-pedagogique/4654654`);
    expect(res.statusCode).toEqual(404);
    const { body } = res;
    expect(body).toMatchObject({
      message: 'Unité pédagogique non reconnue',
    });
  });

  it('PUT /api-graph/unite-pedagogique/:id', async () => {
    const res = await request(app)
      .put(`${URL}/unite-pedagogique/1`)
      .send({
        unitePedagogique: {
          nom: 'Chapitre 1 - Introduction à la physique',
          url: 'http://site-partage-autre.com/chapitre-1.pdf',
        },
        chainesDescriptive: ['Physique', 'Introduction'],
      });
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toMatchObject({
      nom: 'Chapitre 1 - Introduction à la physique',
      url_resource: 'http://site-partage-autre.com/chapitre-1.pdf',
      to: 'Chapitre 1 - Introduction à la physique',
      from: 'Introduction',
    });
  });

  it('PUT /api-graph/unite-pedagogique/:id sur le même objet', async () => {
    const res = await request(app)
      .put(`${URL}/unite-pedagogique/1`)
      .send({
        unitePedagogique: {
          nom: 'Chapitre 1 - Introduction à la physique',
          url: 'http://site-partage-autre.com/chapitre-1.pdf',
        },
        chainesDescriptive: ['Physique', 'Introduction'],
      });
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toMatchObject({
      nom: 'Chapitre 1 - Introduction à la physique',
      url_resource: 'http://site-partage-autre.com/chapitre-1.pdf',
    });
  });

  it('PUT /api-graph/unite-pedagogique/:id sur une unité pédagogique inesistant', async () => {
    const res = await request(app)
      .put(`${URL}/unite-pedagogique/54654654654`)
      .send({
        unitePedagogique: {
          nom: 'Chapitre 1 - Introduction à la physique',
          url: 'http://site-partage-autre.com/chapitre-1.pdf',
        },
        chainesDescriptive: ['Physique', 'Introduction'],
      });
    expect(res.statusCode).toEqual(404);
    const { body } = res;
    expect(body).toMatchObject({
      message: 'Unité pédagogique non reconnue',
    });
  });

  it("POST /api-graph/unite-pedagogique/ Création d'une unité pédagogique et l'ajouter dans une liste", async () => {
    const res = await request(app)
      .post(`${URL}/unite-pedagogique`)
      .send({
        unitePedagogique: {
          identifiant_unite_pedagogique: 19,
          nom: 'Chapitre 8 - Etat chimique',
          url: 'http://site-partage.com/chapitre-8.pdf',
        },
        identifiant_unite_pedagogique_precedent: 7,
        isFirst: false,
        identifiant_module_formation: 1,
      });
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toMatchObject({
      noeud: {
        identifiant_unite_pedagogique: 19,
        nom: 'Chapitre 8 - Etat chimique',
        url_resource: 'http://site-partage.com/chapitre-8.pdf',
      },
      relation: {
        type: 'SUIS',
        to: {
          identifiant_unite_pedagogique: 19,
          nom: 'Chapitre 8 - Etat chimique',
          url_resource: 'http://site-partage.com/chapitre-8.pdf',
        },
        from: {
          identifiant_unite_pedagogique: 7,
          nom: 'Chapitre 7 - Les transformations chimiques',
          url_resource: 'http://site-partage.com/chapitre-7.pdf',
        },
      },
    });
  });

  it("POST /api-graph/unite-pedagogique/ Création d'une prémière unité pédagogique", async () => {
    await request(app)
      .post(`${URL}/module-formation`)
      .send({
        moduleFormation: {
          nom: 'Histoire-Géographie',
          identifiant_module_formation: 4,
        },
        niveauFormation: {
          nom: 'Terminal',
        },
      });
    const res = await request(app)
      .post(`${URL}/unite-pedagogique`)
      .send({
        unitePedagogique: {
          identifiant_unite_pedagogique: 19,
          nom: 'Chapitre 1 - Première Guerre Mondial',
          url: 'http://site-partage.com/chapitre-1.pdf',
        },
        isFirst: true,
        identifiant_module_formation: 4,
      });
    expect(res.statusCode).toEqual(200);
    const { body } = res;
    expect(body).toMatchObject({
      noeud: {
        identifiant_unite_pedagogique: 19,
        nom: 'Chapitre 1 - Première Guerre Mondial',
        url_resource: 'http://site-partage.com/chapitre-1.pdf',
      },
      relation: {
        type: 'COMMENCE_PAR',
        to: {
          identifiant_unite_pedagogique: 19,
          nom: 'Chapitre 1 - Première Guerre Mondial',
          url_resource: 'http://site-partage.com/chapitre-1.pdf',
        },
        from: {
          nom: 'Histoire-Géographie',
        },
      },
    });
    await request(app).delete(`${URL}/module-formation/4`);
  });
});
