const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function crearPublicacion(iduserpublicar, idprodpublicar, valoracion, comentario, fecha) {
    console.log(iduserpublicar, idprodpublicar, valoracion, comentario, fecha);
    const query = 'INSERT INTO publicar (iduserpublicar, idprodpublicar, valoracion, comentario, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING idpublicar';
    const values = [iduserpublicar, idprodpublicar, valoracion, comentario, fecha];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el ID de la nueva publicación creada
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function leerPublicacionPorId(id_publicacion) {
    const query = 'SELECT * FROM publicaciones WHERE id_publicacion = $1';
    const values = [id_publicacion];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve la publicación encontrada
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
async function obtenerPublicacionesPorId(iduser) {
    const query = 'SELECT * FROM publicar WHERE iduserpublicar = $1';
    const values = [iduser];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows; // Devuelve la publicación encontrada
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
async function existePub(userId, idprodpublicar) {
    const query = 'SELECT COUNT(*) FROM publicar WHERE iduserpublicar = $1 AND idprodpublicar = $2';
    const values = [userId, idprodpublicar];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        const rowCount = result.rows[0].count;
        return rowCount > 0;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}


async function eliminarPublicacion(id_publicacion) {
    const query = 'DELETE FROM publicaciones WHERE id_publicacion = $1';
    const values = [id_publicacion];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se eliminó algún registro
        if (result.rowCount > 0) {
            return true; // Indica que la publicación se eliminó con éxito
        } else {
            return false; // Indica que no se encontró la publicación para eliminar
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    crearPublicacion,
    leerPublicacionPorId,
    eliminarPublicacion,
    obtenerPublicacionesPorId,
    existePub
};
