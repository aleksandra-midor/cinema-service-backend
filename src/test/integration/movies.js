/* eslint-disable no-undef */
const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');

describe('Movie API test', () => {
  before(async () => {
    await connect();
  });
  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/v1/movies', () => {
    it('should return all movies', async () => {
      const response = await supertest(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const movies = response.body;
      expect(movies).to.have.lengthOf.above(0);
    });
  });
});
