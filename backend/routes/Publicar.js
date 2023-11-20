const express = require("express");
const router = express.Router();
const FuncionesPublicar = require("../db/DAO/PublicarDAO");
const FuncionesUsuario = require("../db/DAO/UsuarioDAO");
const FuncionesSeguir = require("../db/DAO/SeguirDAO");
// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { iduserpublicar, idprodpublicar, valoracion, comentario, fecha} = req.body;
    const existePub = await FuncionesPublicar.existePub(iduserpublicar, idprodpublicar)
    if(!existePub){
      const newPublicacion = await FuncionesPublicar.crearPublicacion(iduserpublicar, idprodpublicar, valoracion, comentario, fecha);
      if(newPublicacion){
          res.status(201).json(newPublicacion);
      }else{
          res.status(404).json("Error en algun campo")
        }
    }else{
        res.status(404).json("Esta produccion ya ha sido calificada")
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
router.post('/conseguirPublicaciones', async (req, res)=>{
  try {
    const { idusuario } = req.body;
    const seguidores = await FuncionesSeguir.obtenerSeguidosPorNombre(idusuario);
     const resultados = [];

    for (const seguidor of seguidores) {
      console.log(seguidor.seguido_id)
      // Realizar la llamada específica para cada seguidor
      const publicaciones = await FuncionesPublicar.obtenerPublicacionesPorId(seguidor.seguido_id);
      console.log(publicaciones)
      resultados.push(...publicaciones);
    }
    resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    res.status(200).json(resultados);

  } catch (error) {
    
  }
})
router.get('/conseguirMisPublicaciones/:id', async (req, res)=>{
  try {
    console.log("hola")
    const  idUser = req.params.id;
    const publicaciones = await FuncionesPublicar.obtenerPublicacionesPorId(idUser);
    console.log(publicaciones)
    res.status(200).json(publicaciones);

  } catch (error) {
    
  }
})

module.exports = router;