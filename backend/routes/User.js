const express = require("express");
const router = express.Router();
const FuncionesUsuario = require("../db/DAO/UsuarioDAO");
const FuncionesSeguir= require("../db/DAO/SeguirDAO");
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
// Ruta para buscar un nuevo usuario
router.post('/buscar', async (req, res) => {
  try {
    const { nombreusuario} = req.body;
    const validacionPorNombre = await FuncionesUsuario.validarUsuarioPorNombre(nombreusuario)

    if(validacionPorNombre == true){
        res.status(201).json("Existe");
    }else{
        res.status(404).json("No existe")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear un usuario' });

  }
});
router.post('/seguir', async (req, res) => {
  try {
    const { seguidor_id, seguido_id} = req.body;
    const seguidorid = await FuncionesUsuario.buscarIdUsuarioPorNombre(seguidor_id);
    const seguidoid = await FuncionesUsuario.buscarIdUsuarioPorNombre(seguido_id);

    const sesiguen = await FuncionesSeguir.seSiguen(seguidorid.iduser, seguidoid.iduser)
    console.log(false)
    if(sesiguen == false){
      const resC = await FuncionesSeguir.seguirUsuario(seguidorid.iduser, seguidoid.iduser)
      res.status(201).json("seguido")
    }else{
      res.status(201).json("ya se siguen") 
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear un usuario' });

  }
});
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { nombreusuario, contrasena } = req.body;
    const validacionPorNombreYPassword = await FuncionesUsuario.validarUsuarioPorNombreYPassword(nombreusuario, contrasena);
    console.log(nombreusuario, " ", contrasena);

    if (validacionPorNombreYPassword) {
      const result = await FuncionesUsuario.buscarIdUsuarioPorNombre(nombreusuario);
      console.log(result.iduser);
      res.status(201).json(result.iduser);
    } else {
      res.status(404).json("Incorrecto");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al logear un usuario' });
  }
});


router.post('/social', async (req, res) => {
  try {
    const { idusuario } = req.body;
    console.log(idusuario)
    const cantidadSeguidos = await FuncionesSeguir.obtenerSeguidos(idusuario);
    const cantidadSeguidores = await FuncionesSeguir.obtenerSeguidores(idusuario);
    const resultado = {
      seguidos: cantidadSeguidos,
      seguidores: cantidadSeguidores
    };
    res.status(201).json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener seguidos y seguidores' });
  }
});
router.get('/seguidos/:id', async (req, res) => {
  try {
    const idUser = req.params.id;
    const cantidadSeguidos = await FuncionesSeguir.obtenerSeguidosPorId(idUser);

    // Utiliza Promise.all para esperar que todas las promesas se completen
    const resultados = await Promise.all(cantidadSeguidos.map(async (seguido) => {
      const usuario = await FuncionesUsuario.buscarNombreUsuarioPorId(seguido.seguido_id);
      return {
        idusuario: seguido.seguido_id,
        nombreusuario: usuario.nombreusuario
      };
    }));

    console.log(resultados);
    
    // Envía la respuesta al cliente con los resultados
    res.status(201).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener seguidos y seguidores' });
  }
});
router.get('/seguidores/:id', async (req, res) => {
  try {
    const idUser = req.params.id;
    const cantidadSeguidos = await FuncionesSeguir.obtenerSeguidosPorId(idUser);

    // Utiliza Promise.all para esperar que todas las promesas se completen
    const resultados = await Promise.all(cantidadSeguidos.map(async (seguido) => {
      const usuario = await FuncionesUsuario.buscarNombreUsuarioPorId(seguido.seguido_id);
      return {
        idusuario: seguido.seguido_id,
        nombreusuario: usuario.nombreusuario
      };
    }));

    console.log(resultados);
    
    // Envía la respuesta al cliente con los resultados
    res.status(201).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener seguidos y seguidores' });
  }
});



// Ruta para obtener un usuario por su ID
router.get('/:id', async (req,res) =>{
    try {
      const userId = req.params.id

      const user = await FuncionesUsuario.buscarNombreUsuarioPorId(userId);
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
router.get('/datos/:id', async(req,res)=>{
  try {
    const  idUser = req.params.id
    
    const user = await FuncionesUsuario.datosUsuario(idUser);
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: 'Error al modificar un usuario' });
  }
});
// Ruta para actualizar un usuario por su ID
router.put('/', async(req,res)=>{
  console.log("Hola")
  try {
    console.log(req.body)
    const { idusuario, password } = req.body;
    console.log(idusuario, password )

    const user = await FuncionesUsuario.actualizarContrasena(idusuario, password);
       if (user) {
      res.status(200).json("Exito");
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.post('/dejar-de-seguir', async (req, res) => {
  try {
    const { idusuario, friend } = req.body;
    console.log(req.body)
    const cantidadSeguidos = await FuncionesSeguir.dejarDeSeguir(idusuario, friend);
    res.status(201).json("'dejado de seguir'");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener seguidos y seguidores' });
  }
});


module.exports = router;