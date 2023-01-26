import { MYSQL_CONNECTION } from "../index.js";
import { loggerInfo } from '../log4.js';

let instanceMySQL = null;

class MySQLConnection {
  #client
  #connection
  #pool
  constructor() {
    this.#client  = 'mysql';
    this.#connection = MYSQL_CONNECTION;
    this.#pool = { min: 0, max: 7 };
    this.#msgConnect();
  }
  
  configData = () => {
    return {
      client: this.#client,
      connection: this.#connection,
      pool: this.#pool,
    };
  };

  #msgConnect = () => {
    loggerInfo.info(`[Knex(MySQL)] - Conectado`);
    return false;
  };

  static getMySQLConnectionInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new MySQLConnection();
    }
    return instanceMySQL;
  };
}

export default MySQLConnection;
