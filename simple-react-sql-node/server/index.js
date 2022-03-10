const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  password: process.env.SECRET_KEY,
  database: 'reactSqlDB',
});

//! Connect
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Database ----- OK');
  }

  console.log('MySQL Connected...');
});

//! Make the post of the user
app.get('/created', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  console.log('req.body', req.body);

  //   let user = { name, age, country, position, wage };
  let sql =
    'INSERT INTO employess (name, age, country, position, wage) VALUES (?,?,?,?,?)';
  let query = db.query(
    sql,
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('result', result);
        res.send('Posts 1 added....');
      }
    }
  );
});

app.listen('3001', () => {
  console.log('port started on port 3001');
});
