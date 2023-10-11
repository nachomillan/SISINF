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
    module.exports = {crearUsuario}