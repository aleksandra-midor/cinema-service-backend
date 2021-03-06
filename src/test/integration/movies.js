/* eslint-disable no-undef */
const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');

describe('Cinema API test', () => {
  before(async () => {
    await connect();
  });
  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/v1/cinemas', () => {
    it('should return all cinema', async () => {
      const response = await supertest(app)
        .get('/api/v1/cinemas')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const cinemas = response.body;
      expect(cinemas).to.have.lengthOf.above(0);
    });
  });
});
