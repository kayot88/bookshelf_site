import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Home } from "src/pages/Home";
import SearchComponent from "../components/search/SearchComponent";
import NotFound from "../pages/404";
import { Planet } from "../pages/Planet";

const AuthenticatedApp = ({ user }) => {
  console.log("user from AuthenticatedApp", user);
  return (
    <div>
      <AppRoutes user={user} />
    </div>
  );
};


const AppRoutes = ({ user }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/discover">
        <SearchComponent user={user} />
      </Route>
      <Route path="/planet/:planetId">
        <Planet />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export { AuthenticatedApp };
