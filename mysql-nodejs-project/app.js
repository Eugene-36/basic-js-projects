const mysql = require('mysql2');
require('dotenv').config();
//! Конфигурация пакетов
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  database: 'sql_course',
  password: process.env.PASSWORD_KEY,
});

connection.connect((err) => {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Database ----- OK');
  }
});
