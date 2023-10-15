const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function crearPertenencia(PertenecerVO) {
    const query = 'INSERT INTO publicaciones (iduser_publicar, idprod_publicar) VALUES ($1, $2) RETURNING id_pertenencia';
    const values = [
        PertenecerVO.getIdUserPertenecer(),
        PertenecerVO.getIdProdPertenecer(),
    ];
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

async function leerPertenenciaPorId(id_pertenencia) {
    const query = 'SELECT * FROM pertenecer WHERE id_pertenencia = $1';
    const values = [id_pertenencia];
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


async function eliminarPertenencia(id_pertenencia) {
    const query = 'DELETE FROM pertenecer WHERE id_pertenencia = $1';
    const values = [id_pertenencia];
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
    crearPertenencia,
    leerPertenenciaPorId,
    eliminarPertenencia
};