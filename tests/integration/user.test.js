import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index.js';

let jwtToken;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = async () => {
      for (const collection in mongoose.connection.collections) {
        await mongoose.connection.collections[collection].deleteMany({});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      await clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect().then(() => done());
    } else {
      clearCollections().then(() => done());
    }
  });

  describe('User Registration API', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        firstName: 'Pooja',
        lastName: 'NG',
        email: 'pooja@gmail.com',
        password: 'pooja1234'
      };

      request(app)
        .post('/api/v1/users')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('User login api', () => {
    it('given valid credentials should return status 200', (done) => {
      const userdetails = {
        email: 'pooja@gmail.com',
        password: 'pooja1234'
      };

      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          jwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
