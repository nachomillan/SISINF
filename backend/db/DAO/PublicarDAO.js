const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function crearComentario(publicarVO) {
    const query = 'INSERT INTO comentarios (idusuario, texto, fecha) VALUES ($1, $2, $3) RETURNING idcomentario';
    const values = [comentarioVO.getIdUsuario(), comentarioVO.getTexto(), comentarioVO.getFecha()];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el nuevo comentario creado
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function leerComentarioPorId(idcomentario) {
    const query = 'SELECT * FROM comentarios WHERE idcomentario = $1';
    const values = [idcomentario];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el comentario encontrado
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function actualizarComentario(publicarVO) {
    const query = 'UPDATE comentarios SET texto = $1 WHERE idcomentario = $2';
    const values = [comentarioVO.getTexto(), comentarioVO.getIdComentario()];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se actualizó algún registro
        if (result.rowCount > 0) {
            return true; // Indica que el comentario se actualizó con éxito
        } else {
            return false; // Indica que no se encontró el comentario para actualizar
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function eliminarComentario(idcomentario) {
    const query = 'DELETE FROM comentarios WHERE idcomentario = $1';
    const values = [idcomentario];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se eliminó algún registro
        if (result.rowCount > 0) {
            return true; // Indica que el comentario se eliminó con éxito
        } else {
            return false; // Indica que no se encontró el comentario para eliminar
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    crearComentario,
    leerComentarioPorId,
    actualizarComentario,
    eliminarComentario
};
