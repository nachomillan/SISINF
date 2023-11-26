import React, { useState, useEffect } from 'react';
import './Estilos/AjustesUsuario.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AjustesUsuario() {
  const [userData, setUserData] = useState({
    username: '',
    oldPassword: '',
    oldPasswordInput: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado
  const { id } = useParams();
  const navigate = useNavigate();
  const conseguirData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/datos/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setUserData({
        username: data.nombreusuario,
        oldPassword: data.contrasena,
        oldPasswordInput: '',
        newPassword: '',
        confirmPassword: '',
        email: data.correo,
      });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    conseguirData();
  }, []);

  const handleSaveClick = async () => {
    const { oldPassword, oldPasswordInput, newPassword, confirmPassword } = userData;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Expresión regular para validar contraseña

    if (newPassword.trim() === '') {
        setErrorMessage('La nueva contraseña no puede estar vacía');
        setSuccessMessage('');
    } else if (oldPassword !== oldPasswordInput) {
        setErrorMessage('La antigua contraseña no es correcta');
        setSuccessMessage('');
    } else if (newPassword !== confirmPassword) {
        setErrorMessage('Las contraseñas nuevas no coinciden');
        setSuccessMessage('');
    } else if (!passwordRegex.test(newPassword)) {
        setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres y contener letras y números');
        setSuccessMessage('');
    } else {
        try {
            const body = { idusuario: localStorage.getItem('idUser'), password: newPassword };
            const response = await fetch('http://localhost:3001/user/', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            setSuccessMessage('Contraseña cambiada con éxito');
            setErrorMessage('');
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setSuccessMessage('');
            setErrorMessage('Error al cambiar la contraseña');
        }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleLogout = () => {
    localStorage.clear(); // Limpia el almacenamiento local, por ejemplo
    navigate('/')
};
  return (
    <div className='divajustes'>
      <h2 className='h2ajustes'>Configuración de Usuario</h2>
      <form className='formajustes'>
        <label>
          Nombre de Usuario:
          <input type="text" value={userData.username} readOnly />
        </label>
        <label>
          Antigua Contraseña:
          <input type="password" name="oldPasswordInput" value={userData.oldPasswordInput} onChange={handleChange} />
        </label>
        <label>
          Nueva Contraseña:
          <input type="password" name="newPassword" value={userData.newPassword} onChange={handleChange} />
        </label>
        <label>
          Confirmar Nueva Contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" value={userData.email} readOnly />
        </label>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button className='buttonajustes' onClick={handleSaveClick}>Guardar Contraseña</button>

        {/* Botón para salir de sesión */}
      <button style={{backgroundColor:'red'}} className='logout-button' onClick={() => handleLogout()}>
        Salir de Sesión
      </button>
    </div>
  );
}

export default AjustesUsuario;
