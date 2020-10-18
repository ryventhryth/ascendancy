import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { RegisterPage } from "./pages/register";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Link to="/register">go to register page</Link>
        </Route>
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
};
