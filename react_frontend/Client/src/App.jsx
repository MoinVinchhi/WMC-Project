import React,{useState} from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './creatContext';
import { ThemeProvider } from './usetheamContext';
import  './index.css'
import { Outlet } from 'react-router-dom'
import ReactGA from 'react-ga4';

ReactGA.initialize('G-Q7JP63N97Z');

const App = () => {

  

  return (
    <AuthProvider>
      
      <div className="page-background">
      <ThemeProvider>
            <Navbar/>
            <Outlet />
            <Footer/>
      </ThemeProvider>
      </div>
    </AuthProvider>
  )
}

export default App