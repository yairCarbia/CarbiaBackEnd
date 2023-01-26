import parseArgs from 'minimist';
import dotenv from 'dotenv';
dotenv.config();

/* ----------------------------- params settings ---------------------------- */
const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);
const CLUSTER_MODE = process.argv[4] === 'CLUSTER';

/* ---------------------- environment variables import ---------------------- */
const APP_PORT = process.env.APP_PORT || args.port;

const COOKIES_SECRET = process.env.COOKIES_SECRET;

const SESSION_SECRET = process.env.SESSION_SECRET;

const MONGO_URL = process.env.MONGO_URL;

const MYSQL_CONNECTION = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const PERSISTENCY = process.env.PERSISTENCY || 'mySQL';

export {
  APP_PORT,
  CLUSTER_MODE,
  COOKIES_SECRET,
  SESSION_SECRET,
  MONGO_URL,
  MYSQL_CONNECTION,
  PERSISTENCY,
};
