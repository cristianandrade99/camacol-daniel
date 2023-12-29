import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, useNavigate } from 'react-router-dom';
// import {  } from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import PlatformLayout from './pages/PlatformRoutes/PrivateRoutes';
import LandingLayout from './pages/PlatformRoutes/PublicRoutes';
import routes, { paths } from './routes';

config.autoAddCss = false;

function App() {
  // const navigate = useNavigate();
  const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    //console.log("Usuario autenticado:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className='App'>
        {isLoggedIn ? (
          <PlatformLayout routes={routes.private} redirect={paths.pollsterForm} />
        ) : (
          <LandingLayout routes={routes.public} redirect={paths.login} />
        )}
      </div>
    </Router>
  );
}

export default App;
