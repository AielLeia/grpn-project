const request = require('supertest');
const app = require('../app');

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
});
