const pool = require('./ConnectionManager');
    async function crearLista(nombreLista, idusuario) {
        const query = 'INSERT INTO lista (nombre, usuario_id) VALUES ($1, $2) RETURNING idlista';
        const values = [nombreLista, idusuario];
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
    async function existeLista(nombreLista, idusuario) {
        const query = 'SELECT * FROM Lista WHERE usuario_id = $2 AND nombre = $1';
        const values = [nombreLista, idusuario];
        const client = await pool.connect();

        try {
            const result = await client.query(query, values);
            // Devuelve true si hay al menos un resultado, lo que significa que la lista existe
            return result.rows.length > 0;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function existePeliEnLista(nombreLista, idProd) {
        const query = 'SELECT * FROM pertenecer WHERE idlistapertenecer = $1 AND idprodpertenecer = $2';
        const values = [nombreLista, idProd];
        const client = await pool.connect();

        try {
            const result = await client.query(query, values);
            // Devuelve true si hay al menos un resultado, lo que significa que la lista existe
            return result.rows.length > 0;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function conseguirListas(idusuario) {
        const query = 'SELECT * FROM Lista WHERE usuario_id = $1';
        const values = [idusuario];
        const client = await pool.connect();

        try {
            const result = await client.query(query, values);
            // Devuelve true si hay al menos un resultado, lo que significa que la lista existe
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function conseguirPelisdeListas(idLista) {
        const query = 'SELECT * FROM pertenecer WHERE idListaPertenecer = $1';
        const values = [idLista];
        const client = await pool.connect();

        try {
            const result = await client.query(query, values);
            // Devuelve true si hay al menos un resultado, lo que significa que la lista existe
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    async function eliminarLista(id_lista) {
        const query = 'DELETE FROM listas_peliculas WHERE id_lista = $1';
        const values = [id_lista];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            // Verificar si se eliminó algún registro
            // if (result.rowCount > 0) {
                return true; // Indica que la lista se eliminó con éxito
            // } else {
            //     return false; // Indica que no se encontró la lista para eliminar
            // }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function eliminarPeliDeLista(id_lista, idProd) {
        const query = 'DELETE FROM pertenecer WHERE idlistapertenecer = $1 and idprodpertenecer = $2 ';
        const values = [id_lista, idProd];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            console.log(result)
            return result.rows[0]
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function eliminarTodoDeUnaLista(id_lista) {
        const query = 'DELETE FROM pertenecer WHERE idlistapertenecer = $1';
        const values = [id_lista];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            console.log(result)
            // return result.rows[0]
            return true
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    async function eliminarLista(id_lista) {
        const query = 'DELETE FROM lista WHERE idlista = $1';
        const values = [id_lista];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            console.log(result)
            return result.rows[0]
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    module.exports = {crearLista,
                     existeLista,existePeliEnLista, conseguirListas, conseguirPelisdeListas, eliminarPeliDeLista, eliminarTodoDeUnaLista, eliminarLista};
