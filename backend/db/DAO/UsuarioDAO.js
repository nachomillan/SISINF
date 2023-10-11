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
    
    module.exports = {crearUsuario, validarUsuario}