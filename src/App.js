import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import "./css/main.scss";
import AddMovie from "./components/addMovie";
import ListMovie from "./components/listMovie";
import EditMovie from "./components/editMovie";
import StarRating from "./components/rating/StarRating"


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/addMovie" component={AddMovie} />
              <Route exact path="/editMovie" component={EditMovie} />
              <Route exact path="/starRating" component={StarRating} />
              {/*<Route path="*" component={NotFound}/>*/}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ListMovie}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;