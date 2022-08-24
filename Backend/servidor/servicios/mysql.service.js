const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'prueba-pwc',
})

//Connection with mysql

connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  else{
    console.log('Connection established');
  }
  })

  module.exports = connection;