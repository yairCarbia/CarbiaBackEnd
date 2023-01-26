import knex from 'knex';
import { loggerError } from '../../config/log4.js';

const deletElementById = async (option, tableName, id) => {
  const db = knex(option);
  try {
    const element = await db.from(tableName).where({ id }).del();
    return element;
  } catch (error) {
    loggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default deletElementById;