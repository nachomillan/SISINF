const express = require("express");
const router = express.Router();
const FuncionesPublicar = require("../db/DAO/PublicarDAO");
const FuncionesUsuario = require("../db/DAO/UsuarioDAO");
// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const { iduserpublicar, idprodpublicar, valoracion, comentario, fecha} = req.body;
    const userId = await FuncionesUsuario.buscarIdUsuarioPorNombre(iduserpublicar);
    const newPublicacion = await FuncionesPublicar.crearPublicacion(userId.iduser, idprodpublicar, valoracion, comentario, fecha);
    if(newPublicacion){
        res.status(201).json(newPublicacion);
    }else{
        res.status(404).json("Error en algun campo")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear publicacion' });

  }
});

// Ruta para obtener un usuario por su ID
router.get('/:id', async (req,res) =>{
    try {
      const prodId = req.params.id
      const prod = await FuncionesProduccion.leerProduccionPorId(prodId);
       if (prod) {
      res.status(200).json(prod);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar un usuario' });
  }
});


// Ruta para obtener un usuario por su ID
router.get('/', async (req,res) =>{
    try {
      const user = await FuncionesProduccion.buscarUsuario(userId);
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