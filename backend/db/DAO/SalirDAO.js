const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function agregarActor(salirVO) {
    const query = 'INSERT INTO actores_salir_en_produccion (id_actor_salir, id_prod_salir) VALUES ($1, $2) RETURNING id_relacion';
    const values = [
        salirVO.getIdActorSalir(),
        salirVO.getIdProdSalir()
    ];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function eliminarActor(id_relacion) {
    const query = 'DELETE FROM actores_salir_en_produccion WHERE id_relacion = $1';
    const values = [id_relacion];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se eliminó algún registro
        if (result.rowCount > 0) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function obtenerProduccionesDeActor(id_actor_salir) {
    const query = 'SELECT * FROM actores_salir_en_produccion WHERE id_actor_salir = $1';
    const values = [id_actor_salir];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows; 
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    agregarActor,
    eliminarActor,
    obtenerProduccionesDeActor
};

