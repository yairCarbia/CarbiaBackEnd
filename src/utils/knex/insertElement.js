import knex from 'knex';
import { loggerError } from '../../config/log4.js';

const insertNewElement = async (option, tableName, data) => {
  const db = knex(option);
  try {
    return await db(tableName).insert(data);
  } catch (error) {
    loggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default insertNewElement;
