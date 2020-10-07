import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import "./css/main.scss";
import Video from "./components/Video";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <div className="content-main-container">
            <Switch>
              <Route exact path="/" component={Video} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
