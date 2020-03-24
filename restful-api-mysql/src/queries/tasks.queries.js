/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name>, <data_type>, <options>)
 *
 * Create a table called `tasks` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - completed_date set to date and time completed
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,

  // defaults when nothing inserted
  completed_date DATETIME,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending'
)`;

// Get every task
exports.ALL_TASKS = `SELECT * FROM tasks`;

// Get a single task by id
exports.SINGLE_TASKS = `SELECT * FROM tasks WHERE id = ?`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new task in `tasks` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_TASK = `INSERT INTO TASKS(name, status, completed_date) VALUES(?, ?, CURRENT_TIMESTAMP())`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name1> = '<new_value1>', <colum_name2> = '<new_value2>', ...
 */
exports.UPDATE_TASK = `UPDATE TASKS SET ?`;

// Delete a task by id
exports.DELETE_TASK = `DELETE FROM tasks WHERE id = ?`;
