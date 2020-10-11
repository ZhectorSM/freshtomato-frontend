import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import "./css/main.scss";
import MovieList from "./components/movieList";
import AddMovie from "./components/addMovie";
import ListMovie from "./components/listMovie";


import axios from "axios";


class App extends Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <div className="content-main-container">
            <Switch>
              <Route exact path="/" component={ListMovie} />
              <Route exact path="/addMovie" component={AddMovie} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;