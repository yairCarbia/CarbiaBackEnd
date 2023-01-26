import knex from 'knex';
import { loggerError } from '../../config/log4.js';

const readAllElements = async (option, tableName) => {
  const db = knex(option);
  try {
    const records = await db.from(tableName).select('*');
    return records;
  } catch (error) {
    loggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default readAllElements;
