const express = require('express');
var morgan = require('morgan');
var winston = require('winston');
const app = express();
const logger = require('./config/logger.server.config');
const bodyParser = require('body-parser');
const jwt = require('./app/helpers/jwt');
const port = 8087;


app.use(morgan('combined', { stream: winston.stream.write }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./app/routes/app.server.routes.js'));

app.listen(port);
logger.info(`Application started on port ${port}`);
