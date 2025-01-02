import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Nav from './components/Nav';
import Recipe from './components/Recipe';
import './App.css';

const App = () => {
  const location = useLocation();

  const noNavRoutes = ['/', '/sign-in', '/sign-up'];

  return (
    <div className='container'>
      {!noNavRoutes.includes(location.pathname) && <Nav />}

      <main>
        <Routes>
        
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

      
          <Route path="/home" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
