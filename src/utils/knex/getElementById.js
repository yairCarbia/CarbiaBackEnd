import knex from 'knex';
import { loggerError } from '../../config/log4.js';

const getElementById = async (option, tableName, id) => {
  const db = knex(option);
  try {
    const element = await db.from(tableName).select('*').where({ id });
    return element[0];
  } catch (error) {
    loggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default getElementById;