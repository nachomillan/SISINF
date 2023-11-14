const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function seguirUsuario(seguidor_id, seguido_id) {
    const query = 'INSERT INTO seguir (seguidor_id, seguido_id) VALUES ($1, $2)';
    const values = [seguidor_id, seguido_id];
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
async function seSiguen(seguidor_id, seguido_id) {
    const query = 'SELECT EXISTS (SELECT 1 FROM seguir WHERE seguidor_id = $1 and seguido_id=$2)';
    const values = [seguidor_id, seguido_id];
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows[0].exists;
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
async function obtenerSeguidos(iduser) {
 const query = 'SELECT seguidor_id, COUNT(seguidor_id) AS cantidad FROM seguir WHERE seguidor_id = $1 GROUP BY seguidor_id';
    const values = [iduser];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            return result.rows[0].cantidad;
        } else {
            return 0;
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
async function obtenerSeguidores(iduser) {
 const query = 'SELECT seguido_id, COUNT(seguido_id) AS cantidad FROM seguir WHERE seguido_id = $1 GROUP BY seguido_id';
    const values = [iduser];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            return result.rows[0].cantidad;
        } else {
            return 0;
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
async function obtenerSeguidosPorNombre(iduser) {
    const query = 'SELECT DISTINCT seguido_id FROM Seguir WHERE seguidor_id = $1';
    const values = [iduser];
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
    seSiguen,
    obtenerSeguidores,
    obtenerSeguidos,
    obtenerSeguidosPorNombre
};
