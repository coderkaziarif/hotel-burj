import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter,

  Route,
  Routes,
 
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import ProtectRoute from './components/Login/ProtectRoute';
import Contact from './components/Contact/Contact';

export const userContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <>
    <userContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Header/>
               
        <Routes>       
              <Route path="home" element={<Home/>}/>        
              <Route path="login" element={ <Login />} />   
              {/* <Route path="book/:bedType" element ={
                <ProtectRoute>
                  <Book/>
                </ProtectRoute> }/>       */}
              <Route path="/" element={<Home/>} />
              <Route path="book/:bedType" element={  <Book />} />
              {/* <Route path='contact' element={<Contact/>}/> */}
              <Route path="contact" element ={
                <ProtectRoute>
                  <Contact/>
                </ProtectRoute> }/> 
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  </>
  );
}

export default App;
