import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css"; // stylesheet

// import Layout from "./Layout";
import RegisterPage from "./features/User/RegisterPage";
import LoginPage from "./features/User/LoginPage";
// import { PrivateRoute } from "./helpers/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup" exact component={RegisterPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          {/* <PrivateRoute path='/' exact component={Dashboard}></PrivateRoute> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
