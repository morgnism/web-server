const tasksModel = require('../models/to-do-list.model');
const Tasks = tasksModel.Tasks;

exports.getAllTasks = function(req, res) {
  Tasks.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getTask = function(req, res) {
  Tasks.findById(req.params.taskId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createTask = function(req, res) {
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

exports.updateTask = function(req, res) {
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

exports.deleteTask = function(req, res) {
  Tasks.deleteOne({ _id: req.params.taskId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};
