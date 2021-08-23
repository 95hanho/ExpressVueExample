var mysql = require("mysql");

const connection = mysql.createConnection({
  //host: '172.19.96.1',
  host: "127.0.0.1",
  port: 3306,
  user: "hoseong",
  password: "1q2w3e4r!!",
  database: "sejongsql",
});

const setProperties = () => {
  return {
    connection: connection,
  };
};

// Connect
connection.connect(function (err) {
  if (err) {
    console.error("mysql connection error");
    console.error(err);
    throw err;
  }
});

module.exports = setProperties();
