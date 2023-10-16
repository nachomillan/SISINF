const client = require('./ConnectionManager');
const usuarioVO = require('../VO/UsuarioVO')
    async function crearUsuario(usuarioVO) {
        const query = 'INSERT INTO usuario (nombreUsuario, foto, correo, contraseña) VALUES ($1, $2, $3, $4)';
        const values = [usuarioVO.getNombreUsuario(), usuarioVO.getFoto(), usuarioVO.getCorreo(), usuarioVO.getContraseña()];
        try {
            client.connect()
            const result = await client.query(query, values);
            return result.rows[0]; // Devuelve el nuevo usuario creado
        } catch (error) {
            throw error;
        } finally{
            client.end()
        }
    }
    async function crearLista(listaVO) {
        const query = 'INSERT INTO listas_peliculas (nombre, usuario_id) VALUES ($1, $2) RETURNING id_lista';
        const values = [
            listaVO.getNombre(),
            listaVO.getUsuarioId()
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
    async function eliminarLista(id_lista) {
        const query = 'DELETE FROM listas_peliculas WHERE id_lista = $1';
        const values = [id_lista];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            // Verificar si se eliminó algún registro
            if (result.rowCount > 0) {
                return true; // Indica que la lista se eliminó con éxito
            } else {
                return false; // Indica que no se encontró la lista para eliminar
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    module.exports = {crearUsuario,
                     crearLista};
