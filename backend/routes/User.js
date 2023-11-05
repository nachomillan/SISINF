const express = require("express");
const router = express.Router();
const FuncionesUsuario = require("../db/DAO/UsuarioDAO");
const user = require("../db/VO/UsuarioVO");
// Ruta para crear un nuevo usuario
router.post('/signup', async (req, res) => {
  try {
    const { nombreusuario, foto, correo, contrasena} = req.body;
    // const nuevo = new user.UsuarioVO(nombreusuario, foto, correo)
    const validacionPorNombre = await FuncionesUsuario.validarUsuarioPorNombre(nombreusuario)
    const validacionPorCorreo = await FuncionesUsuario.validarUsuarioPorCorreo(correo)

    console.log(validacionPorCorreo, " ", validacionPorNombre)
    if(validacionPorCorreo == false && validacionPorNombre== false){
        const newUser = await FuncionesUsuario.crearUsuario(nombreusuario, foto, correo, contrasena);
        res.status(201).json(newUser);
    }else{
        res.status(404).json("Error en algun campo")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear un usuario' });

  }
});
router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const { nombreusuario, contrasena} = req.body;
    const validacionPorNombreYPassword = await FuncionesUsuario.validarUsuarioPorNombreYPassword(nombreusuario, contrasena)
    console.log(nombreusuario, " ", contrasena)

    if(validacionPorNombreYPassword){
        console.log("logeado")
        res.status(201).json("Logeado");
    }else{
        res.status(404).json("Incorrecto")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al logear un usuario' });
  }
});

// Ruta para obtener un usuario por su ID
router.get('/:id', async (req,res) =>{
    try {
      const userId = req.params.id
      const user = await FuncionesUsuario.buscarUsuario(userId);
       if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar un usuario' });
  }
});

// Ruta para actualizar un usuario por su ID
router.put('/:id', async(req,res)=>{
  try {
    const  idUser = req.params.id
    console.log(idUser)
    console.log("hola")
    const user = await FuncionesUsuario.buscarUsuario(idUser);
       if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
    nuevo = new UsuarioVO(_idUser, _nombreUsuario, _foto, _correo, _contraseña)

  } catch (error) {
    res.status(500).json({ error: 'Error al modificar un usuario' });
  }
});

module.exports = router;