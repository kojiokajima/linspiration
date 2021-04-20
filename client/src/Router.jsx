import React from "react";
import { Switch, Route } from "react-router-dom";
import { SignUp, SignIn, Dashboard, Home } from "./components/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/dashboard/:id" component={Dashboard} />
    </Switch>
  );
};

export default Router;
