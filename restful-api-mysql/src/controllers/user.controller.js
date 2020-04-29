const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_USER,
} = require('../queries/user.queries');
const escape = require('../utils/escape');

exports.getMe = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const existingUser = await query(con, GET_ME_BY_USER_ID(user.id)).catch(
      (err) => {
        res.status(500).json({ msg: 'Could not find the user.' });
      }
    );

    if (existingUser.length) {
      res.status(200).send(existingUser);
    }
    res.status(400).json({ msg: 'No user found.' });
  }
};

exports.updateMe = async function (req, res) {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const existingUser = await query(
    con,
    GET_ME_BY_USER_ID_WITH_PASSWORD(req.user.id)
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'Could not retrieve user.' });
  });

  // checked for password changed
  // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
  const passwordUnchanged = await bcrypt
    .compare(req.body.password, existingUser[0].password)
    .then(async (changed) => {})
    .catch((err) => {
      res.json(500).json({ msg: 'Invalid password!' });
    });

  if (!passwordUnchanged) {
    const hash = bcrypt.hashSync(req.body.password);
    const { username, email, password } = escape({
      ...req.body,
      password: hash,
    });

    console.log(username, email, password);

    // perform update
    const result = await query(
      con,
      UPDATE_USER(username, email, password, existingUser[0].user_id)
    ).catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'Could not update user settings.' });
    });

    if (result.affectedRows === 1) {
      res.json({ msg: 'Updated succesfully!' });
    }
    res.json({ msg: 'Nothing to update...' });
  }
};
