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
});
