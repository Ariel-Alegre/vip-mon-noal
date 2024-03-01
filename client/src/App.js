import React, { useState } from 'react';
import PostProducts from './components/PostProducts/PostProducts';
import Admin from './pages/Admin';
import Catalogo from './pages/Catalogo';
import Contact from './pages/Contact';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Success from './pages/Success';
import Test from './pages/test';
import DeletePostPage from './pages/DeletePostPage';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OneOrder from './pages/OneOrder';
import { useSelector, useDispatch } from 'react-redux';
import { dataPersonal } from './redux/action';
import NotFoundPage from './pages/NotFoundPage'; // Renombrado el componente Error a NotFoundPage

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const role = useSelector(state => state.role);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);


  return (
    <Router>
      <Routes>
        {role && role === 'admin' ? (
          <Route path='/admin' element={<Admin/>}>
            <Route index element={<PostProducts/>}/>
            <Route path='publicar' element={<PostProducts/>}/>
            <Route path='pedidos' element={<Order/>}/>
            <Route path='publicaciones' element={<DeletePostPage/>}/>
          </Route>
        ) : null}
        <Route path='orden/:orderId' element={<OneOrder/>}/>

        <Route path='/' element={<Home/>}/>
        <Route path='/catalogo' element={<Catalogo/>}/>
        <Route path='/detalles/:productId' element={<Details/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/contacto' element={<Contact/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/perfil' element={<Profile/>}/>
        <Route path='/pago/exitoso' element={<Success/>}/>


      </Routes>
    </Router>
  );
}

export default App;
