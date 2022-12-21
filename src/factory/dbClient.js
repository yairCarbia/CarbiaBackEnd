import { MongoClient } from 'mongodb';

export default class DbClient {
  constructor() {
    this.cliente = new MongoClient('mongodb+srv://root:oernYKmbkzPXw9zM@cluster0.jciyqmy.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  connect() {
    return this.cliente.connect();
  }

  disconnect() {
    return this.cliente.close();
  }

  getCollection(database, collection) {
    return this.cliente.db(database).collection(collection);
  }
}
