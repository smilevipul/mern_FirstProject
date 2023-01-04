import React, { createContext,useReducer } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { Route,Routes } from 'react-router-dom';
import Logout from './components/Logout';

import {reducer , initialState } from './reducer/UseReduce';

// 1 context API
export const userContext = createContext();

const Routing =()=>{
  return (
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='*' element={<Error/>}/>
   </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState);
  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routing/>
    </userContext.Provider>
    
    
    </>
  );
}

export default App;
