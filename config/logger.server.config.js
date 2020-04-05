const { format, createLogger, transports } = require('winston');
var appRoot = require('app-root-path');

// define the custom formats for each transport (file, console)
const logFormat = format.combine(
    format.colorize({ all: true }),   // Colorizes { level, message } on the info
    format.timestamp(),               // Adds info.timestamp
    format.prettyPrint(),
    format.align(),                   // Prepends message with `\t`
    format.splat(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
)

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger =  createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
})

module.exports = logger;

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

