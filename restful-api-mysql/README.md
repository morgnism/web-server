# Example MySQL RESTful API

RESTful service power most any website today that receives and trasmits data via HTTP or HTTPS protocol. What you'll find below is what's used from express to run a simple set of Create, Read, Update, and Delete (CRUD) methods.

Only the bare essentials are used to create the API service, and only the feature used by express and mongoose (mysql client) will be explained in this documentation guide.

_Caveats: Running this app assumes you have a working mysql instance preinstalled on you machine_

## What you'll find

| Direcotry   | Description                                           |
| ----------- | ----------------------------------------------------- |
| queries     | Queries for data to be used in mysql.                 |
| controllers | Functions to be bound and executed on routes.         |
| routes      | A series of routes for handling HTTP requests.        |
| middleware  | Other helful functions necessary for running the app. |

### First Time Running

After you've cloned the project, you'll need to have a database created in mysql called tododb.

## MySQL Setup and Installation

In order to run the the mysql server, you need an installation of mysql with root access.

1. First install [Homebrew](https://brew.sh/).

2. Then...

```bash
brew install mysql
```

3. Give access right to `root@localhost`.

```bash
mysql -u root -e "ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'password'; FLUSH PRIVILEGES;"
```

**NOTE: once configured, move onto the next steps.**

## Setup and Install

1. Install all packages:

```bash
npm install
```

2. Spin up the mysql instance:

```bash
mysqld
```

3. Run server instance:

```bash
npm start
```

## MySQL Shell

Running the shell allows you to directly manage you databases and collections. _This is for advanced use and shouldn't be used without looking at the documentation or googling further instructions._

In one terminal:

```bash
mysqld

# to stop the service
lsof -i:3306

# this will show all running processes
# copy the process id
kill -9 <paste_process_id_here>
```

In another terminal window/tab:

```bash
mysql
# clost the shell with
quit # or exit
```

## Schemas

In mysql, Schemas represent how the data will be presented in the database. The Schema is normally defined when creating the database for the first time. In this server's case:

```sql
CREATE TABLE IF NOT EXISTS tasks(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending',
  PRIMARY KEY (id)
);
```

The above example is known as SQL as can be exported in javascript and imported wherever we need it.

```javascript
// tasks.queries.js
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(...)`;

// tasks.controller.js
const queries = require('path/to/queries');
con.query(queries.CREATE_TASKS_TABLE, params, callback);
```

## Routes

Routes help direct what an `endpoint` should do. In RESful services, `endpoints` are the full url of a given API at a specific address in that API. For example: `http://localhost:3000/api/tasks` is a RESTful `endpoint`. Pointing my browser at this address (assuming the server is live) will give me results if a route exists and has a [controller method](#controllers) attached.

Express routes are defined by either one of these:

```javascript
const app = express();
app.use('routePath').get((req, res) => { ... });

// or

const router = express.Router();
router.get('routePath', (req, res) => { ... });
```

## Controllers

Controller help build up routes by providing some level of functionality to a specified route. It's also key to note that there are different kinds of controllers. Like in MVC patterns, controllers effect how data is displayed or what happens on click events. When defining APIs, controllers can have nested functionality, control/manipulate data flow to the next controller, or access a database, in our case, and more.

Since these are really just functions, we don't need anything special from express to implement them. We just need to make sure that our function signature matches correctly to where we intend to use it:

```javascript
exports.addTask = (req, res) => { ... } // function signature: (req, res) => {}
```

### Middleware

Middleware is a kind of controller or function that controls the behaviour of a `request` or `response` within a server instance. These can be chained and used to modify anything about a request or response before.

#### Error-handling Middlware Functions

We have the freedom to define what we want in our APIs, and error-handling is no exception. Error-handling controllers/functions follow a specific syntax that express recognizes:

```javascript
// notice the `err` parameter before `req` and `res`
exports.errorHandler = (err, req, res) => { ... }
```

## Troubleshooting Notes

If you don't have the database for running this project created already, mysql WIL NOT create this for you unless you configure it to.

For example:

```javascript
// index.js
const mysql = require('mysql');
...

const con = mysql.createConnection({
  host,
  user,
  password
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');

  // tododb becomes the creted database upon connection if one doesn't exist
  con.query(`CREATE DATABASE tasks`, function(err, result) {
    if (err) throw err;
    console.log('Database created or exists already!');
  });

  // this is also true for tables
  con.query(queries.CREATE_TASKS_TABLE, function(err, result) {
    if (err) throw err;
    console.log('Table created or exists already!');
  });
});
```
