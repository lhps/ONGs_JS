const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback(); 
    await connection.migrate.latest(); 
  });

  afterAll( async () => {
    await connection.destroy();
  });

  //.set('authorization', 'id') -> para acrescentar header
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name : "AACD",
        email : "lucashpsfei@gmail.com",
        whatsapp : "11976473557",
        city : "São Bernardo do Campo",
        uf : "SP"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});