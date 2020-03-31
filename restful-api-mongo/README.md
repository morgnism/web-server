# Example Mongo RESTful API

RESTful service power most any website today that receives and trasmits data via HTTP or HTTPS protocol. What you'll find below is what's used from express to run a simple set of Create, Read, Update, and Delete (CRUD) methods.

Only the bare essentials are used to create the API service, and only the feature used by express and mongoose (mongodb client) will be explained in this documentation guide.

_Caveats: Running this app assumes you have a working mongodb instance preinstalled on you machine_

## What you'll find

| Direcotry   | Description                                           |
| ----------- | ----------------------------------------------------- |
| models      | Representations of data to be used in mongodb.        |
| controllers | Functions to be bound and executed on routes.         |
| routes      | A series of routes for handling HTTP requests.        |
| middleware  | Other helful functions necessary for running the app. |



## MongoDB Setup and Installation

Follow the instructions below to get mongo installed.

For Windows users, follow the setup and install on the [MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

For Mac/Linux users:

```bash
# Install using brew
brew install mongodb

# Create the database directory
mkdir -p /data/db

# Give write ownership for the directory
# You will be prompted to enter your password
sudo chown -R `id -un` /data/db

# Run the service
mongod
```

In another terminal window, you can access the mongo shell with:

```bash
mongo
```

You'll know you sucessfuly ran the service and connected given the logs it presents you.

**NOTE: once configured, move onto the next steps.**

## Setup and Install

1. Install all packages:

```bash
npm install
```

2. Spin up the mongodb instance:

```bash
mongod
```

3. Run server instance (either one works):

```bash
npm start
```

## MongoDB Shell

Running the shell allows you to directly manage you databases and collections. *This is for advanced use and shouldn't be used without looking at the documentation or googling further instructions.*

In one terminal run:

```bash
mongod
# exit with CTRL + C
```

In another terminal window run:

```bash
mongo
# close the shell with
quit()
```



## Models and Schemas

In mongodb, Schemas represent how the data will be presented in the database. The export Schema is wrapped in constructor provided by mongoose called `model()`. This function exposes a number of functions that you can perform that match the Schema being used.

```javascript
// tasks.model.js
exports.Tasks = model('Tasks', TasksSchema);

// tasks.controller.js
Tasks.find(...);
Tasks.findById(...);
...
```

Functions exposed by `model()` and more are all in mongoose's [documentation](https://mongoosejs.com/).

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
exports.addTask = (req, res) => { ... }
// (req, res) <- function signature
```

### Middleware

Middleware is a kind of controller or function that controls the behaviour of a `request` or `response` within a server instance.

#### Error-handling Middlware Functions

We have the freedom to define what we want in our APIs, and error-handling is no exception. Error-handling controllers/functions follow a specific syntax that express recognizes:

```javascript
// notice the `err` parameter before `req` and `res`
exports.errorHandler = (err, req, res) => { ... }
```

## Troubleshooting Notes

If you don't have the database for running this project created already, mongodb is handy and creates it for you with the collection you're attempting to write to as the same name as the existing model.

For example:

```javascript
// index.js
const mongoose = require('mongoose');
...
// tododb becomes the creted database upon connection if one doesn't exist
mongoose.connect('mongodb://localhost/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// tasks.model.js
// `Tasks` will become the name of the collection in tododb if one doesn't exist
exports.Tasks = model('Tasks', TasksSchema);
```
