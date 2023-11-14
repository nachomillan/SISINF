const { Pool } = require('pg');
const pool = require('./ConnectionManager');

async function crearProduccion(idapi, titulo, genero, agno, duracion, tipo, ntemporadas, imagen) {
    const query = 'INSERT INTO produccion (idapi, titulo, genero, agno, duracion, tipo, ntemporadas, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idprod';
    const values = [idapi, titulo, genero, agno, duracion, tipo, ntemporadas, imagen];
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows[0]; // Devuelve el ID de la nueva producción creada
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function leerProduccionPorId(id_produccion) {
    const query = 'SELECT * FROM produccion WHERE idprod = $1';
    const values = [id_produccion];
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
async function buscarProduccionPorIdApi(idapi){
        const query = 'SELECT idprod FROM produccion WHERE idapi = $1';
        const values = [idapi];
         const client = await pool.connect()
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            throw error;
        } finally{
            client.release()
        }
    }
async function actualizarProduccion(produccionVO) {
    const query = 'UPDATE producciones SET titulo = $1, valoracion = $2, genero = $3, agno = $4, duracion = $5, tipo = $6, ntemporadas = $7 WHERE id_produccion = $8';
    const values = [
        produccionVO.getTitulo(),
        produccionVO.getValoracion(),
        produccionVO.getGenero(),
        produccionVO.getAgno(),
        produccionVO.getDuracion(),
        produccionVO.getTipo(),
        produccionVO.getNtemporadas(),
        produccionVO.getIdProd()
    ];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se actualizó algún registro
        if (result.rowCount > 0) {
            return true; // Indica que la producción se actualizó con éxito
        } else {
            return false; // Indica que no se encontró la producción para actualizar
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function eliminarProduccion(id_produccion) {
    const query = 'DELETE FROM producciones WHERE id_produccion = $1';
    const values = [id_produccion];
    const client = await pool.connect();

    try {
        const result = await client.query(query, values);
        // Verificar si se eliminó algún registro
        if (result.rowCount > 0) {
            return true; // Indica que la producción se eliminó con éxito
        } else {
            return false; // Indica que no se encontró la producción para eliminar
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}



module.exports = {
    crearProduccion,
    leerProduccionPorId,
    actualizarProduccion,
    eliminarProduccion,
    buscarProduccionPorIdApi
};
