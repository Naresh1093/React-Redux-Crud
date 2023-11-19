import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Menu from './components/Menu';
import Create from './components/Create';
import Home from './components/Home';
import Update from './components/Update';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Pnf from './components/Pnf';
import ProtectedRoute from './AuthGuard/ProtectedRoute';

function App(props) {
  return (
    <Router>
      <Menu />
      <ToastContainer autoClose={4000} position={'top-right'} />
      <Routes>
        <Route element={ <ProtectedRoute /> }>
          <Route path={'/'} element={ <Home/> } />
          <Route path={'/create'} element={ <Create/> } />
          <Route path={'/update/:id'} element={ <Update/> } />
        </Route>

        <Route path={'/register'} element={ <Register/> } />
        <Route path={'/login'} element={ <Login/> } />
        <Route path={'/*'} element={ <Pnf/> } />
      </Routes>
    </Router>
  )
}

export default App;