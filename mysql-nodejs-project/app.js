const mysql = require('mysql2');
require('dotenv').config();
//! Конфигурация пакетов
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  database: 'user',
  password: process.env.PASSWORD_KEY,
});

//! Подключение к базе. Открытие соединения.
connection.connect((err) => {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Database ----- OK');
  }
});

let query = 'SELECT * FROM userInfo';

connection.query(query, (err, result, field) => {
  console.log('err', err);
  console.log('result', result);
  // console.log('field', field);
});

//! Закрытие соединенияю

connection.end((err) => {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Database ----- close');
  }
});
