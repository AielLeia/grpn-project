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
  it('GET /api-graph/module-formation', async () => {
    const res = await request(app).get(`${URL}/module-formation`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContainObject({
      identifiant_module_formation: 1,
      nom: 'Physique',
    });
    expect(res.body).toContainObject({
      identifiant_module_formation: 2,
      nom: 'Svt',
    });
    expect(res.body).toContainObject({
      identifiant_module_formation: 3,
      nom: 'Maths',
    });
  });

  it('GET /api-graph/module-formation/:id/par-enseignant', async () => {
    const res = await request(app).get(
      `${URL}/module-formation/1/par-enseignant`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContainObject({
      identifiant_module_formation: 1,
      nom: 'Physique',
    });
  });

  it('POST /api-graph/module-formation', async () => {
    const res = await request(app)
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
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      moduleFormation: {
        nom: 'Histoire-Géographie',
        identifiant_module_formation: 4,
      },
    });
    expect(res.body).toMatchObject({
      niveauFormation: { nom: 'Terminal' },
    });
    expect(res.body).toMatchObject({
      relation: {
        from: 'Terminal',
        to: 'Histoire-Géographie',
      },
    });
  });

  it('POST /api-graph/module-formation déclange une erreur niveau formation', async () => {
    const res = await request(app)
      .post(`${URL}/module-formation`)
      .send({
        moduleFormation: {
          nom: 'Histoire-Géographie',
          identifiant_module_formation: 4,
        },
        niveauFormation: {
          nom: 'fhdfhdth',
        },
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      message: 'Niveau de formation Inconnue',
    });
  });

  it('POST /api-graph/module-formation déclange une erreur de création module de formation', async () => {
    const res = await request(app)
      .post(`${URL}/module-formation`)
      .send({
        moduleFormation: {
          nom: 'Histoire-Géographie',
        },
        niveauFormation: {
          nom: 'Terminal',
        },
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      message: 'ERROR_VALIDATION',
    });
  });

  it('DELETE /api-graph/module-formation/4 suppression du module de formation', async () => {
    const res = await request(app).delete(`${URL}/module-formation/4`);
    expect(res.statusCode).toEqual(204);
  });

  it('DELETE /api-graph/module-formation/4 erreur module formation non existant', async () => {
    const res = await request(app).delete(`${URL}/module-formation/4`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      message: 'Module formation non reconnue',
    });
  });

  it("PUT /api-graph/module-formation/3 mise à jour d'un module de formation", async () => {
    const res = await request(app)
      .put(`${URL}/module-formation/3`)
      .send({ nom: 'Mathématique' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      nom: 'Mathématique',
      identifiant_module_formation: 3,
    });
  });

  it('PUT /api-graph/module-formation/3 erreur lors de la mise à jour du module de formation', async () => {
    const res = await request(app)
      .put(`${URL}/module-formation/5454`)
      .send({ nom: 'Mathématique' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      message: 'Module formation non reconnue',
    });
  });
});
