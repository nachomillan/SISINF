const pool = require('./ConnectionManager');
    async function crearUsuario(nombreusuario, foto, correo, contrasena) {
        const query = 'INSERT INTO usuario (nombreUsuario, foto, correo, contrasena) VALUES ($1, $2, $3, $4) RETURNING iduser';
        // const salt = await bcrypt.genSalt();
        // contrasena = await bcrypt.hash(contrasena, salt)
        const values = [nombreusuario, foto, correo, contrasena];
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
    async function validarUsuarioPorNombreYPassword(_nombreUsuario, _contrasena){
        const query = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE nombreUsuario = $1 and contrasena = $2)';
        const values = [_nombreUsuario, _contrasena];
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
    async function buscarIdUsuarioPorNombre(idUser) {
    console.log(idUser);
    const query = 'SELECT iduser FROM usuario WHERE nombreusuario = $1';
    const client = await pool.connect();
    const values = [idUser];
    try {
        const result = await client.query(query, values);
        console.log(result.rows[0])
        return result.rows[0];
    } catch (error) {
        console.log("error de la conexion  ")
        throw error;
    } finally {
        client.release();
    }
    }
    async function datosUsuario(idUser) {
    const query = 'SELECT * FROM usuario WHERE idUser = $1';
    const client = await pool.connect();
    const values = [idUser];
    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log("error de la conexion  ")
        throw error;
    } finally {
        client.release();
    }
    }
    async function buscarNombreUsuarioPorId(idUser) {
    const query = 'SELECT nombreusuario FROM usuario WHERE iduser = $1';
    const client = await pool.connect();
    const values = [idUser];
    try {
        const result = await client.query(query, values);
        return result.rows[0];
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
            console.log(result.rows[0])
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
    async function actualizarContrasena(idUser, nuevaContraseña) {
        const query = 'UPDATE usuario SET contrasena = $1 WHERE iduser = $2';
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


    module.exports = {crearUsuario, validarUsuarioPorNombre,validarUsuarioPorCorreo, buscarUsuario, eliminarUsuario, actualizarContrasena, validarUsuarioPorNombreYPassword,
    buscarIdUsuarioPorNombre,datosUsuario,
buscarNombreUsuarioPorId}
