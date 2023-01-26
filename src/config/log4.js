import log4js from 'log4js';

log4js.configure({
  appenders: {
    loggerConsole: { type: 'console' },
    loggerWarnFile: {
      type: 'file',
      filename: process.cwd() + '/src/logs/warn.log',
    },
    loggerErrorFile: {
      type: 'file',
      filename: process.cwd() + '/src/logs/error.log',
    },
  },
  categories: {
    default: { appenders: ['loggerConsole'], level: 'trace' },
    Info: { appenders: ['loggerConsole'], level: 'info' },
    Warn: { appenders: ['loggerConsole', 'loggerWarnFile'], level: 'warn' },
    Error: { appenders: ['loggerConsole', 'loggerErrorFile'], level: 'error' },
  },
});

const logger = log4js.getLogger(),
  loggerInfo = log4js.getLogger('Info'),
  loggerWarn = log4js.getLogger('Warn'),
  loggerError = log4js.getLogger('Error');

export { logger, loggerInfo, loggerWarn, loggerError };
