import { APP_PORT } from '../src/config/index.js';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const url = `http://localhost:${APP_PORT}`;
let id = null;
describe('POST products ', () => {
  const product = {
    title: 'Gorra rosa',
    price: 1000,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/summer-vol-1-6/512/summer_set-15-256.png',
  };
  it('Debería retornar status 200', (done) => {
    chai
      .request(url)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        id = res.body;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debería retornar el id del producto añadido como string', (done) => {
    chai
      .request(url)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        expect(res.body).to.be.a('string');
        done();
      });
  });
});

describe('GET products', () => {
  it('Debería retornar status 200', (done) => {
    chai
      .request(url)
      .get('/api/products')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceOf(Object);
        done();
      });
  });
  it('Debería retornar status 200', (done) => {
    chai
      .request(url)
      .get(`/api/products/${id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an.instanceOf(Object);
        done();
      });
  });
});

describe('PUT products', () => {
  it('Debería retornar status 200', (done) => {
    const product = {
      title: 'Chanclas',
      price: 100,
      thumbnail:
        'https://cdn0.iconfinder.com/data/icons/travel-filled-line-4/64/Travel-Filled-25-64.png',
    };
    chai
      .request(url)
      .put(`/api/products/${id}`)
      .send(product)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceOf(Object);
        done();
      });
  });
});

describe('DELETE product', () => {
  it('Debería retornar status 200', (done) => {
    chai
      .request(url)
      .delete(`/api/products/${id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});
