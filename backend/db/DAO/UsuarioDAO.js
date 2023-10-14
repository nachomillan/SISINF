const pool = require('./ConnectionManager');
const usuarioVO = require('../VO/UsuarioVO')
    async function crearUsuario(usuarioVO) {
        const query = 'INSERT INTO usuario (nombreUsuario, foto, correo, contraseña) VALUES ($1, $2, $3, $4) RETURNING iduser';
        const values = [usuarioVO.getNombreUsuario(), usuarioVO.getFoto(), usuarioVO.getCorreo(), usuarioVO.getContraseña()];
        const client = await pool.connect()
        try {
            const result = await client.query(query, values);
            return result.rows[0]; // Devuelve el nuevo usuario creado
        } catch (error) {
            throw error;
        } finally{
            client.release()
        }
    }
    async function validarUsuario(usuarioVO) {
        const query = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE iduser = $1)';
        const values = [usuarioVO.getIdUser()];
        const client = await pool.connect()
        try {
            const result = await client.query(query, values);
            return result;
        } catch (error) {
            throw error;
        } finally{
            client.release()
        }
    }
    async function buscarUsuario(usuarioVO) {
        const query = 'SELECT * FROM usuario WHERE nombreUsuario = $1';
        const values = [usuarioVO.getNombreUsuario()];
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
    async function eliminarUsuario(usuarioVO) {
        const query = 'DELETE FROM usuario WHERE iduser = $1';
        const values = [usuarioVO.getIdUser()];
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            if (result.rowCount > 0) {
                return true; // Indica que se eliminó el usuario con éxito
            } else {
                return false; // Indica que no se encontró el usuario para eliminar
            }
            } catch (error) {
                throw error;
            } finally {
                client.release();
            }
    }

    module.exports = {crearUsuario, validarUsuario, buscarUsuario, eliminarUsuario}
