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
  it('doit retourner la liste des module de formation', async () => {
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
});
