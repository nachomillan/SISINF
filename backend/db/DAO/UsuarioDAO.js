const pool = require('./ConnectionManager');
const usuarioVO = require('../VO/UsuarioVO')
    async function crearUsuario(nombreusuario, foto, correo, contraseña) {
        const query = 'INSERT INTO usuario (nombreUsuario, foto, correo, contraseña) VALUES ($1, $2, $3, $4) RETURNING iduser';
        const values = [nombreusuario, foto, correo, contraseña];
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
    async function validarUsuarioPorNombre(_nombreUsuario) {
        const query = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE nombreUsuario = $1)';
        const values = [_nombreUsuario];
        const client = await pool.connect()
        try {
            const result = await client.query(query, values);
            return result.rows[0].exists;
        } catch (error) {
            console.log(error)
            throw error;
        } finally{
            client.release()
        }
    }
    async function validarUsuarioPorCorreo(_correo) {
        const query = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE correo = $1)';
        const values = [_correo];
        const client = await pool.connect()
        try {
            const result = await client.query(query, values);
            return result.rows[0].exists;
        } catch (error) {
            throw error;
        } finally{
            client.release()
        }
    }
    async function buscarNombreUsuario(idUser) {
    const query = 'SELECT nombreUsuario FROM usuario WHERE idUser = $1';
    const client = await pool.connect();
    const values = [idUser];
    try {
        const result = await client.query(query, values);
        return result[0];
    } catch (error) {
        console.log("error de la conexion  ")
        throw error;
    } finally {
        client.release();
    }
    }
    async function buscarUsuario(idUser) {
        const query = 'SELECT * FROM usuario WHERE iduser = $1';
        const client = await pool.connect();
        const values = [idUser];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.log(error);

            throw error;
        } finally {
            client.release();
        }
    }
    async function eliminarUsuario(idUser) {
        const query = 'DELETE FROM usuario WHERE iduser = $1';
        const values = [idUser];
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
    async function actualizarContraseña(idUser, nuevaContraseña) {
        const query = 'UPDATE usuario SET contraseña = $1 WHERE iduser = $2';
        const values = [nuevaContraseña, idUser];
    
        const client = await pool.connect();
    
        try {
            const result = await client.query(query, values);
            // Verificar si se actualizó algún registro
            if (result.rowCount > 0) {
                return true; // Indica que la contraseña se actualizó con éxito
            } else {
                return false; // Indica que no se encontró el usuario para actualizar
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }


    module.exports = {crearUsuario, validarUsuarioPorNombre,validarUsuarioPorCorreo, buscarUsuario, eliminarUsuario, actualizarContraseña}
