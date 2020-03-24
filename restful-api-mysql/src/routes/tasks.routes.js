const controllers = require('../controllers/tasks.controller');
const express = require('express');

const tasksRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
tasksRoutes
  .get('/:taskId', controllers.getTask) // GET http://locahost:3000/tasks/1
  .put('/:taskId', controllers.updateTask)
  .delete('/:taskId', controllers.deleteTask);

module.exports = tasksRoutes;
