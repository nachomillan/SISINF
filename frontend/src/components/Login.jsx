import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilos/Login.css'
const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombreUsuario: '',
    password: '',
    message: '', // Para mostrar mensajes al usuario
  });
 const { nombreUsuario, password, message} = values;

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { nombreusuario: nombreUsuario, contrasena: password };
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      // console.log(response)
       const parseRes = await response.json();
      console.log(parseRes)
      if (parseRes === "Incorrecto") {
        setValues({ ...values, message: parseRes });
      } else {
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('username',body.nombreusuario)
        console.log(localStorage)
        // Si el inicio de sesión es exitoso, redirige al usuario a la ruta /
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h3 className="login-title">Log In</h3>
        <div className="form-group">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => onChange(e)}
            className="form-input"
            placeholder="Enter username"
            required
          />
        </div>
        {message && (
          <div className="alert" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            className="form-input"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

};

export default Login;
