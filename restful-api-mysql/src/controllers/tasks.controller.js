const con = require('./db-config');
const queries = require('../queries/tasks.queries');

exports.getAllTasks = function(req, res) {
  con.query(queries.ALL_TASKS, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.getTask = function(req, res) {
  con.query(
    queries.SINGLE_TASKS,
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    },
    req.params.taskId
  );
};

exports.createTask = function(req, res) {
  con.query(queries.INSERT_TASK, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updateTask = function(req, res) {
  const formValues = req.body;
  const values = Object.keys(formValues).map(function(k) {
    return `${k}=${formValues[k]}`;
  });

  con.query(
    queries.UPDATE_TASK,
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    },
    [values]
  );
};

exports.deleteTask = function(req, res) {
  con.query(
    queries.DELTE_TASK,
    function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ msg: 'Deleted successfully.' });
    },
    [id]
  );
};
