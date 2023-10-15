const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function seguir(seguirVO) {
    const query = 'INSERT INTO seguir (seguidor_id, seguido_id) VALUES ($1, $2) RETURNING id_seguimiento';
    const values = [
        seguirVO.getSeguidorId(),
        seguirVO.getSeguidoId()
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

async function dejarDeSeguir(id_seguimiento) {
    const query = 'DELETE FROM seguir WHERE id_seguimiento = $1';
    const values = [id_seguimiento];
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

async function seguidores(id_usuario) {
    const query = 'SELECT * FROM seguir WHERE seguido_id = $1';
    const values = [id_usuario];
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
    seguirUsuario,
    dejarDeSeguirUsuario,
    obtenerSeguidores
};
