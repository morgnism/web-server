const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Catch root incoming request
app.use('/', function(req, res) {
  res.status(200);
  res.send({ message: 'Hello World!' });
});

// Handle routes for tasks.
app.use('/tasks', tasksRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, () => {
  console.log(`Running on port: ${port}...`);
});
