const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Make connection to the db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Successful!');
});

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Expose the Schema class to define our model
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const TasksSchema = new Schema({
  name: {
    type: String,
    required: 'A task name is required to create a new task'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }
    ],
    default: ['pending']
  }
});

// Expose the collection's functions for use in our controller
const Tasks = mongoose.model('Tasks', TasksSchema);

const getAllTasks = function(req, res) {
  Tasks.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getTask = function(req, res) {
  Tasks.findById(req.params.taskId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const createTask = function(req, res) {
  const newTask = new Tasks({
    name: req.body.name
  });
  newTask.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const updateTask = function(req, res) {
  Tasks.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

const deleteTask = function(req, res) {
  Tasks.deleteOne({ _id: req.params.taskId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Catch root incoming request
app.use('/', function(req, res) {
  res.status(200);
  res.send({ message: 'Hello World!' });
});

// Handle routes for tasks.
const tasksRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks.
 */
tasksRoutes.get('/tasks', getAllTasks).post('/tasks', createTask);

/**
 * Routes for a task by id.
 */
tasksRoutes
  .get('/tasks/:taskId', getTask)
  .post('/tasks/:taskId', updateTask)
  .delete('/tasks/:taskId', deleteTask);

// Handle 404 requests
app.use(function(req, res, next) {
  next({ message: 'Not Found', status: 404 });
});

// Handle 500 requests - applies mostly to live services
app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});
