# MySQL Database Schema

Tables for our database follow the example schemas below. Each table represents a dataset by which we can access via our API.

*Note: not every table we create for an API needs to be exposed.*

## Users Table Schema

Auth queries peform tasks against the `users` table.

The users table will be represented by the following Schema:

| Column    | Description                                        |
| --------- | -------------------------------------------------- |
| id        | Unique identifier for our user besides their name. |
| user_name | User's name                                        |
| password  | User's password (non-unique)                       |

Example:

```bash
+----+-----------+----------+
| id | user_name | password |
+----+-----------+----------+
|  1 | admin     | 123456   |
|  2 | mworrell  | derp     |
+----+-----------+----------+
```

## Tasks Table Schema

The tasks table will be represented by the following Schema:

| Column       | Description                               |
| ------------ | ----------------------------------------- |
| id           | Unique identifier for a user's task.      |
| name         | Task name (non-unique)                    |
| created_date | Task's created date (non-unique)          |
| status       | Task's status as `pending` or `completed` |

Example:

```bash
+----+--------------------------------+---------------------+-----------+
| id | name                           | created_date        | status    |
+----+--------------------------------+---------------------+-----------+
|  1 | I'm the first task!            | 2020-03-23 23:09:49 | completed |
|  3 | I'm replacing the second task! | 2020-03-23 23:15:45 | pending   |
|  4 | I'm the third task!            | 2020-03-23 23:20:04 | pending   |
|  6 | Make sure to post videos later | 2020-03-24 14:16:22 | pending   |
+----+--------------------------------+---------------------+-----------+
```

