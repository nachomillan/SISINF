const express = require("express");
const router = express.Router();
const FuncionesProduccion = require("../db/DAO/ProduccionDAO");
// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { idapi, titulo, genero, agno, duracion, tipo, ntemporadas, imagen } = req.body;
    const validarProd = await FuncionesProduccion.buscarProduccionPorIdApi(idapi)
    if(validarProd == null){
        const nuevaProd = await FuncionesProduccion.crearProduccion(idapi, titulo, genero, agno, duracion, tipo, ntemporadas, imagen);
        res.status(201).json(nuevaProd);
      }else{
        res.status(201).json(validarProd);
        console.log("vale ya existe")
      }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear un usuario' });
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
    res.status(500).json({ error: error });
  }
});


module.exports = router;