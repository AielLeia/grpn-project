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

  it('POST /api-graph/module-formation', async () => {
    const res = await request(app)
      .post(`${URL}/module-formation`)
      .send({
        moduleFormation: {
          nom: 'Histoire-Géographie',
          identifiant_module_formation: 4,
        },
        niveauFormation: {
          identifiant_niveau_formation: 4,
          nom: 'Terminal',
        },
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toContainObject({
      nom: 'Histoire-Géographie',
      identifiant_module_formation: 4,
    });
    expect(res.body).toContainObject({
      nom: 'Terminal',
    });
  });
});
