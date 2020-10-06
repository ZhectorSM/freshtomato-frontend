import React from 'react';
import {Route,BrowserRouter, Switch} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './css/main.scss';


function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <div className="content-main-container">          
        <Switch>                          
          <Route component={NotFound} />
        </Switch>                  
      </div>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
