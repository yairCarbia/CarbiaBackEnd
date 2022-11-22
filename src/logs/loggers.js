const log4js = require("log4js");

log4js.configure({
    appenders: {
        terminal: { type: 'console' },
        warnFile: { type: 'file', filename: __dirname + '../../../log/warn.log' },
        errorFile: { type: 'file', filename: __dirname + '../../../log/error.log' },
        loggerInfo: { type: 'logLevelFilter', appender: 'terminal', level: 'info' },
        loggerWarn: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel: 'warn' },
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error' }
    },
    categories: {
        default: { appenders: ['terminal', 'loggerWarn', 'loggerError'], level: 'info' }
    }
})



const logAUtilizar = process.env.NODE_ENV === "PROD" ? "produccion" : "desarrollo";

const logger = log4js.getLogger(logAUtilizar);
module.exports = logger;