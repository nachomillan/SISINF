const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function crearActor(actorVO) {
    const query = 'INSERT INTO actores (nombre, nacimiento, nacionalidad) VALUES ($1, $2, $3) RETURNING id_actor';
    const values = [
        actorVO.getNombre(),
        actorVO.getNacimiento(),
        actorVO.getNacionalidad()
    ];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el ID del nuevo actor creado
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function leerActorPorId(id_actor) {
    const query = 'SELECT * FROM actores WHERE id_actor = $1';
    const values = [id_actor];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el actor encontrado
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function actualizarActor(actorVO) {
    const query = 'UPDATE actores SET nombre = $1, nacimiento = $2, nacionalidad = $3 WHERE id_actor = $4';
    const values = [
        actorVO.getNombre(),
        actorVO.getNacimiento(),
        actorVO.getNacionalidad(),
        actorVO.getIdActor()
    ];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se actualizó algún registro
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

async function eliminarActor(id_actor) {
    const query = 'DELETE FROM actores WHERE id_actor = $1';
    const values = [id_actor];
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

module.exports = {
    crearActor,
    leerActorPorId,
    actualizarActor,
    eliminarActor
};

