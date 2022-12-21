import ProductsMongoDbDao from '../pers/DAOs/ProductsMongoDbDao.js';
import DbClient from './dbClient.js';



let dao;
const PERSISTENCIA = process.env.PERSISTENCIA
switch (PERSISTENCIA) {
  case 'MONGO':
    const dbClient = new DbClient();
    await dbClient.connect();
    dao = new ProductsMongoDbDao();
    break;
    default:
      dao = new ProductsMongoDbDao();
}

export function getDao() {
  return dao;
}
