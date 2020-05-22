import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import React from "react";
import Home from "./Home";
import Maps from "./Maps";
import More from "./More";
import Login from "./Login";
import AuthHelper from "./AuthHelper";
function RouteHelper(props) {
  return (
    <Router>
      <div className="App" />
      <Switch>
        <PrivateRoute exact path="/buslist" component={Home} />
        <PrivateRoute exact path="/maps" component={Maps} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/more" component={More} />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (AuthHelper.getAuth() === true) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }
    }}
  />
);

export default RouteHelper;
