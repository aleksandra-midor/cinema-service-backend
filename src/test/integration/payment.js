/* eslint-disable no-undef */
const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');

describe('Payment API test', () => {
  before(async () => {
    await connect();
  });
  after(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/v1/payment/intent', () => {
    const testData = {
      receiptEmail: 'ola_midor@outlook.com',
      ticket: {
        seats: [0, 12],
        movieId: '5f9ec9f5b0286024eceb5cd8',
        movieTitle: 'Pulp Fiction',
        date: '2020-11-16',
        hour: '16:30',
        cinemaId: '5fa2c884539a6449d84da4e1',
        cinemaName: 'Stockholm Paradiso',
        totalPrice: 400,
        language: 'pl',
      },
    };
    it('should post intended payment to stripe and response with client_secret', async () => {
      const response = await supertest(app)
        .post('/api/v1/payment/intent')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const intentResponse = response.text;
      // fs.writeFileSync('response.json', JSON.stringify(response, null, 2));
      expect(intentResponse).to.include('pi_');
    });
  });

  describe('POST /api/v1/payment/confirm', () => {
    const testData = {
      ticket: {
        movieId: '5f9ec9f5b0286024eceb5cd8',
        movieTitle: 'Pulp Fiction',
        date: '2020-11-16',
        hour: '16:30',
        cinemaId: '5fa2c884539a6449d84da4e1',
        cinemaName: 'Stockholm Paradiso',
        seats: [0, 12],
        language: 'pl',
        totalPrice: 400,
        customerEmail: 'ola_midor@outlook.com',
        paymentId: 'pi_1HnmjkEiHRoAiJESSZj5Vzhj',
        paymentStatus: 'confirmed',
      },
    };

    it('should response with ticket paymentStatus', async () => {
      const response = await supertest(app)
        .post('/api/v1/payment/confirm')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const confirmedResponse = response.text;
      expect(JSON.parse(confirmedResponse)).to.equal(
        testData.ticket.paymentStatus
      );
    });
  });
});
