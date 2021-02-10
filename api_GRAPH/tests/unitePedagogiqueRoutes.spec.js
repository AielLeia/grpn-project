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
  });
});
