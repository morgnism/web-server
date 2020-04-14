const mysql = require('mysql');
const {
  CREATE_USERS_TABLE
} = require('./queries/user.queries');
const {
  CREATE_TASKS_TABLE
} = require('./queries/tasks.queries');
const query = require('./utils/query');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'frank';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'res0@L78';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'tododb';

// Create the connection with required details
module.exports = async () =>
  new Promise(async (resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    const userTableCreated = await query(con, CREATE_USERS_TABLE).catch(
      (err) => {
        reject(err);
      }
    );

    const tasksTableCreated = await query(con, CREATE_TASKS_TABLE).catch(
      (err) => {
        reject(err);
      }
    );

    if (!!userTableCreated && !!tasksTableCreated) {
      resolve(con);
    }
  });