const express = require('express');

const mysql = require('mysql2');
require('dotenv').config();
const app = express();

//! Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  password: process.env.SECRET_KEY,
  database: 'mysqlnodeproject',
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

app.listen('3000', () => {
  console.log('port started on port 3000');
});

//! Сreate table
app.get('/createpoststable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Posts table created....');
  });
});

//! Insert post 1
app.get('/addpost1', (req, res) => {
  let post = { title: 'Post One', body: 'This is post number one' };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Posts 1 added....');
  });
});

//! Insert post 2
app.get('/addpost2', (req, res) => {
  let post = { title: 'Post two', body: 'This is post number two' };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Posts 2 added....');
  });
});

//! Get posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log('result', results);
    res.send('Posts fetched');
  });
});

//! Get single post
app.get('/getposts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Post fetched');
  });
});

//! update
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Post updated');
  });
});

//! Delete post

app.get('/delete/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('result', result);
    res.send('Post deleted');
  });
});
