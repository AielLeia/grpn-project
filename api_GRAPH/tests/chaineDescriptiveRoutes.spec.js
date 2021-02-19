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

describe("Point d'entrée des chaines descriptives", () => {
  beforeAll(() => {
    execSync('node seeder.js');
  });
  it('GET /api-graph/chaine-descriptive', async () => {
    const res = await request(app).get(`${URL}/chaine-descriptive`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['Maths', 'Physique', 'Svt']);
  });
});
