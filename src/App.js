
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Navbar from './pages/Home/Navbar'
import Home from './pages/Home/Homescreen';



function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}>
              
            <Route path='*'element={<div>404 Not Found</div>}></Route>  

            </Route>
          </Routes>
        </div>
      </Router>
     
    </div>
  );
}

export default App;
