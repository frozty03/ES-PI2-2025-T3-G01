import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456qwerty",
  database: "PI2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
