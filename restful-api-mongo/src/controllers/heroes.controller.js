const Heroes = require('../models/heroes.model');

exports.getAllHeroes = (req, res) => {
  Heroes.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getHero = (req, res) => {
  Heroes.findById(req.params.heroId, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createHero = (req, res) => {
  const { name, specialty, ranking, rent, hired } = req.body;
  const newHero = new Heroes({
    name,
    specialty,
    ranking,
    rent,
    hired,
  });
  newHero.save((err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updateHero = (req, res) => {
  Heroes.findOneAndUpdate(
    { _id: req.params.heroId },
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deleteHero = (req, res) => {
  Heroes.deleteOne({ _id: req.params.heroId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};
