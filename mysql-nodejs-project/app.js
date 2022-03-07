const mysql = require('mysql2');

//! Конфигурация пакетов
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  database: 'sql_course',
  password: 'Livenskiy3658',
});

connection.connect((err) => {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Database ----- OK');
  }
});
