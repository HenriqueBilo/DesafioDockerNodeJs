const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'dbdesafio'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sqlDelete = 'DELETE FROM people';
connection.query(sqlDelete, (error, results) => {
      if (error) {
        console.error('Erro ao deletar registros na tabela `people`:', error);
      }
    });

var nomeCount = 0;

app.get('/', (req, res) => {
    const sql = `INSERT INTO people(nome) values ('Nome${nomeCount++}')`;
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Erro ao inserir registro na tabela `people`:', error);
      } else {
        console.log('Registro inserido com sucesso na tabela `people`');
      }
    });

    connection.query('SELECT * FROM people', (error, results) => {
        if (error) throw error;
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${results.map(result => `<li>${result.nome}</li>`).join('')}</ul>`);
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.on('error', (err) => {
  console.error('Erro no servidor:', err);
});