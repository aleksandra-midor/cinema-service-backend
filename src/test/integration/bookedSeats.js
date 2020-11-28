/* eslint-disable no-undef */
const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');
const BookedSeat = require('../../models/bookedSeat');

describe('BookedSeat API test', () => {
  before(async () => {
    await connect();
    const expectedBooking = new BookedSeat({
      cinemaId: '5fbad7ea1b846a4c4c167ea5',
      movieId: '5fbad7ea1b846a4c4c167eac',
      date: '2020-12-04',
      hour: '9:30',
      // .replace('_', ':'),
    });
  });
  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/v1/bookedSeats/:cinema/:movie/:date/:hour', () => {
    it('should return booked seat', async () => {
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
