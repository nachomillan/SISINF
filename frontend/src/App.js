import React from 'react';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';
import MovieSearch from './components/MovieSearch'; // Asegúrate de ajustar la importación según la ubicación de tu componente
<<<<<<< HEAD
import MovieDetail from './components/MovieDetail'; 
import Menu from './components/Menu'; // Asegúrate de ajustar la importación según la ubicación de tu componente
import PaginaPrincipal from './components/Pages/PaginaPrincipal';
import SignUp from './components/Signup';
import Social from './components/Pages/Social'
=======
import SignUp from './components/Signup';
import Social from './components/Pages/Social'
>>>>>>> 98a6d1c3ef516b7c4a5b2f9b734d6b6da01e5bb4

function App() {
  return (
       <Router>
      {/* <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner"> */}
            <Routes>
              <Route exact path="/" element={<PaginaPrincipal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/social" element={<Social/>} />
            </Routes>
          {/* </div>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
