const express = require('express')
const app = express()
const port = 3000

const client = require('./db/DAO/ConnectionManager');

// Conectamos el cliente a la base de datos
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.get('/api', (req, res) => {
  // Ejecutar una consulta en la base de datos
  client.query('SELECT * FROM usuario')
    .then((response) => {
      console.log(response.rows);
    //   res.send('Hello World!');
      res.send(response.rows);
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})