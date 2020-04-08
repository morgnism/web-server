module.exports = async (con, query, params) =>
  new Promise((resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };
    con.query(query, params, handler);
  });
