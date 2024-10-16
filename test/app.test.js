// Imports
import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js'; // Adjust the path to where your app is located

// Simple "Hello World" test
describe('GET /', () => {
  it('should return Hello World', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        // Check if the response contains "Hello World"
        expect(res.text).to.include('Este no es el UNAChat!');
        done();
      });
  });
});
