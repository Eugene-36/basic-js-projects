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
app.post('/created', (req, res) => {
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

//! Get the stored data

app.get('/getinfo', (req, res) => {
  let sql = 'SELECT * FROM employess';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log('result Get stored', results);
    // res.send('Users fetched');

    //console.log('response.data.meaning', response);
    res.json({ results });
  });
});

//! UPDATE DATA

app.put('/update', (req, res) => {
  const id = req.body.userId;
  const wage = req.body.newWage;
  console.log('id :', id);
  console.log('wage :', wage);

  db.query(
    'UPDATE employess SET wage = ? WHERE id = ?',
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('result from meth put update', result);
        res.send(result);
      }
    }
  );
});

//! Delete post
app.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM employess WHERE id = ${req.params.id}`;
  console.log('req.params.id:', typeof req.params.id);
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send(result);
  });
});

app.listen('3001', () => {
  console.log('port started on port 3001');
});
