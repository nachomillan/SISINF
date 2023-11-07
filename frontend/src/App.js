import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/Signup'
import MovieSearch from './components/MovieSearch'; // Asegúrate de ajustar la importación según la ubicación de tu componente
import MovieDetail from './components/MovieDetail'; 
import Menu from './components/Menu'; // Asegúrate de ajustar la importación según la ubicación de tu componente

function App() {
  return (
       <Router>
      {/* <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner"> */}
            <Routes>
              <Route exact path="/" element={<MovieSearch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
          {/* </div>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
