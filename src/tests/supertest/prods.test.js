import app from '../../index.js';
import request from 'supertest';
import { server } from '../../app.js';

describe('GET PRODUCTS', () => {
  it('should respond with 200 statusCode', async () => {
    const resp = await request(app).get('/prods').send();
    expect(resp.statusCode).toBe(200);
  });
  it('should return an Array', async () => {
    const response = await request(app).get('/prods').send();
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });
});

describe('POST products', () => {
  const prod = {
    title: 'asjdasda',
    price: 88,
    description: ' asjdnaskdbhasbdjasbda',
    stock: 99,
  };
  it('should return statusCode 200', async () => {
    const response = await request(app).post('/prods').send(prod);
    expect(response.statusCode).toBe(200);
  });
  it('shoul return an object', async () => {
    const response = await request(app).post('/prods').send(prod);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('PUT prod', () => {
  it('should return 200 statusCode', async () => {
    let id = 'a7sda7id'
    let data = {
      title: 'nuevo titulo'
    }
    const response = await request(app).put(`/prods/${id}`).send(data)
    await expect(response.statusCode).toBe(200)
  } )

  it('should return an object', async () => {
    let id = '8asdhida8'
    let data = {
      title: 'nuevo titulo'
    }
    const response = await request(app).put(`/prods/${id}`).send(data)
    await expect(response.body).toBeInstanceOf(Object)
  })
})

describe('delete prod/s', () => {
  it('should return status 200 deleteAll', async () => {
    const response = await request(app).delete('/prods')
    await expect(response.statusCode).toBe(200)
  })
  it('should return status 200 deleteONE', async () => {
    let id = 'jk8usd9'
    const response = await request(app).delete(`/prods/${id}`)
    await expect(response.statusCode).toBe(200)
  })
})

afterAll(() => {
  server.close();
});
