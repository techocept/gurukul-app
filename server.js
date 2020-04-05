const express = require('express');
var morgan = require('morgan');
var winston = require('winston');
const app = express();
const logger = require('./config/logger.server.config');
const port = 8087;

app.use(morgan('combined', { stream: winston.stream.write }));

app.get('/', (req, res) => {
    res.send("Hello World!!");
})

app.listen(port);
logger.info('Application started on port ' + port);
