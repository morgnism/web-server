exports.GET_ME_BY_USER_ID = `SELECT user_id, username, email FROM users WHERE user_id = ?`; // don't return the password

exports.GET_ME_BY_USERNAME = `SELECT user_id, username, email FROM users WHERE username = ?`; // don't return the password

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * FROM users WHERE user_id = ?`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;
