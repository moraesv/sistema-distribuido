const express = require('express');
const util = require('util');
const mysql = require('mysql');

const app = express();
const port = 3002;

app.get('/', async (req, res) => {
  console.log('Request received server 2');

  const connection = mysql.createConnection({
    host: process.env.DATABASE_URL,
    user: 'root',
    password: 'root',
    port: process.env.DATABASE_PORT,
  });

  const query = util.promisify(connection.query).bind(connection);

  const result = await query('SELECT "This is server 2" AS result');

  connection.end();

  res.send(result[0].result);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
