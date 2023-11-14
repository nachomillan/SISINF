import React from 'react';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';
import PaginaPrincipal from './components/Pages/PaginaPrincipal';
import SignUp from './components/Signup';
import Social from './components/Pages/Social'
import MisListas from './components/Pages/MisListas';
import MisListasDetail from './components/Pages/MisListasDetail';


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
              <Route path="/mis-listas" element={<MisListas/>} />
              <Route path="/mis-listas/:id" element={<MisListasDetail/>} />
            </Routes>
          {/* </div>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
