import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Si el inicio de sesión es exitoso, redirige al usuario a la ruta /
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
  <div>
    <form onSubmit={handleFormSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>NombreUsuario</label>
        <input
          type="text"
          name="nombreUsuario"
          value={nombreUsuario}
          onChange={(e) => onChange(e)}
          className="form-control"
          placeholder="Enter username"
          required
        />
      </div>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {/* <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p> */}
    </form>
  </div>
);

};

export default Login;
