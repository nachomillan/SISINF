const express = require('express')
require('dotenv').config();
const { crearUsuario, validarUsuario } = require('./db/DAO/UsuarioDAO');
const UsuarioVO = require('./db/VO/UsuarioVO')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  try {
    const nuevoUsuario = new UsuarioVO();
    nuevoUsuario.setIdUser(1)
    nuevoUsuario.setNombreUsuario("hola");
    nuevoUsuario.setFoto("hola");
    nuevoUsuario.setCorreo("hola");
    nuevoUsuario.setContraseña("hola");

    const resultado = await validarUsuario(nuevoUsuario);
    if (resultado.rows[0].exists) {
        console.log('El usuario existe en la base de datos.');
      } else {
        console.log('El usuario no existe en la base de datos.');
      }
      res.send("usuario validado");
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error al crear usuario');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})