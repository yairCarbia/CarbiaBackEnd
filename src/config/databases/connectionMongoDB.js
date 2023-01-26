import mongoose from 'mongoose';
import { MONGO_URL } from '../index.js';
import { loggerInfo, loggerError } from '../log4.js';

let instanceMongoDB = null;

class MongoDBConnection {
  constructor() {
    this.msgConnect();
    this.msjError();
  }

  connect = async () => {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection;
  };

  msgConnect = () => {
    mongoose.connection.on('connected', () => {
      loggerInfo.info(`[Mongoose(MongoBD)] - Conectada`);
    });
    return false;
  };

  msjError = () => {
    mongoose.connection.on('error', (err) => {
      loggerError.error('[Mongoose(MongoBD)] - Error:', err.message);
    });
    return false;
  };

  static getMongoDBInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new MongoDBConnection();
    }
    return instanceMongoDB;
  };
}

export default MongoDBConnection;
