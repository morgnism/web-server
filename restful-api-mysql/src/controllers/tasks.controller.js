const escape = require('mysql').escape;
const connection = require('../db-config');
const {
  ALL_TASKS,
  SINGLE_TASK,
  INSERT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} = require('../queries/tasks.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/tasks
exports.getAllTasks = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all tasks
  const tasks = await query(con, ALL_TASKS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!tasks.length) {
    res.status(200).json({ msg: 'No tasks available for this user.' });
  }
  res.json(tasks);
};

// http://localhost:3000/tasks/1
exports.getTask = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all task
  const task = await query(
    con,
    SINGLE_TASK(req.user.id, req.params.taskId)
  ).catch(serverError(res));

  if (!task.length) {
    res.status(400).json({ msg: 'No tasks available for this user.' });
  }
  res.json(task);
};

// http://localhost:3000/tasks
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createTask = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add task
    const taskName = escape(req.body.task_name);
    const result = await query(con, INSERT_TASK(user.id, taskName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add task: ${req.body.task_name}` });
    }
    res.json({ msg: 'Added task successfully!' });
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "task_name = \'Task 1\', status = \'complete\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [task_name, status].map()
    (key) => `${key} = ${escape(body[key])}` // 'New 1 task name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateTask = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update task
  const result = await query(
    con,
    UPDATE_TASK(req.user.id, req.params.taskId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update task: '${req.body.task_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/tasks/1
exports.deleteTask = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete task
  const result = await query(
    con,
    DELETE_TASK(req.user.id, req.params.taskId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete task at: ${req.params.taskId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};
