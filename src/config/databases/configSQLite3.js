import { loggerInfo } from '../log4.js';

let instanceMySQL = null;

class SQLite3Connection {
  #client
  #connection
  constructor() {
    this.#client  = 'sqlite3';
    this.#connection = { filename: './src/persistency/ecommerce.sqlite',};
    this.#nullAsDefault = true;
    this.#msgConnect();
  }
  
  configData = () => {
    return {
      client: this.#client,
      connection: this.#connection,
      useNullAsDefault: this.#nullAsDefault,
    };
  };

  #msgConnect = () => {
    loggerInfo.info(`[Knex(SQLite3)] - Conectado`);
    return false;
  };

  static getMySQLConnectionInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new SQLite3Connection();
    }
    return instanceMySQL;
  };
}

export default SQLite3Connection;