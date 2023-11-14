const express = require("express");
const router = express.Router();
const FuncionesListas = require("../db/DAO/ListaDAO");

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombreLista, idusuario} = req.body;
    console.log(req.body)
    const existeNombreLista = await FuncionesListas.existeLista(nombreLista, idusuario)
    console.log(existeNombreLista)
    if(existeNombreLista===false){
        const ListaId = await FuncionesListas.crearLista(nombreLista, idusuario)
        res.status(201).json(ListaId)
    }else{
        res.status(404).json("Ya existe una lista con este nombre")
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear lista' });

  }
});
// Ruta para obtener un usuario por su ID
router.get('/:id', async (req,res) =>{
    try {
      const userId = req.params.id
      const listas = await FuncionesListas.conseguirListas(userId);
      console.log(listas)
      if (listas) {
        res.status(200).json(listas);
      } else {
        res.status(404).json("No tiene listas");
      }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar listas' });
  }
});
router.get('/pelis/:id', async (req,res) =>{
    try {
      const userId = req.params.id
      const listas = await FuncionesListas.conseguirPelisdeListas(userId);
      console.log(listas)
      if (listas) {
        res.status(200).json(listas);
      } else {
        res.status(404).json("No tiene listas");
      }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar listas' });
  }
});

module.exports = router;