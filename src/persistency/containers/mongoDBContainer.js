import MongoDBConnection from '../../config/databases/connectionMongoDB.js';

class MongoDBContainer {
  constructor() {
    this.connectDB();
  }

  connectDB = async () => {
    try {
      const db = await MongoDBConnection.getMongoDBInstance();
      await db.connect();
    } catch (error) {
      throw error;
    }
  };
}

export default MongoDBContainer;