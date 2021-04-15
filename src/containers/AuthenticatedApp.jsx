import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { ListPlanets } from "src/components/listPlanets/ListPlanets";
import styled from "styled-components/macro";
import { Home } from "src/pages/Home";
import SearchComponent from "../components/search/SearchComponent";
import NotFound from "../pages/404";
import { Planet } from "../pages/Planet/Planet";
import * as colors from "../styles/colors";
import { ErrorBoundary } from "src/utils/lib";

const AuthenticatedApp = ({ user }) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Nav />
      <ErrorBoundary>
        <AppRoutes user={user} />
      </ErrorBoundary>
    </div>
  );
};

const NavLink = (props) => {
  const match = useRouteMatch(props.to);
  console.log("match", match);
  return (
    <Link
      {...props}
      match={match?.isExact}
      css={[
        {
          display: "block",
          padding: "8px 15px 8px 10px",
          margin: "5px 0",
          width: "100%",
          height: "100%",
          borderRadius: "2px",
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ":hover": {
                background: colors.gray10,
              },
            }
          : null,
      ]}
    />
  );
};

const StyledLink = styled(NavLink)`
  display: block;
  padding: 8px 15px 8px 10px;
  margin: 5px 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  /* border-left: 5px solid; */
  border-left: ${({ match }) => match && "red"};

  color: ${colors.text};
  /* background: ${colors.gray10};
  &:hover: {
    background: ${colors.gray10}; */
  &:hover {
    color: ${colors.indigo};
    text-decoration: none;
    background: ${colors.gray10};
  }
`;

const Nav = () => {
  return (
    <ul
      css={{
        listStyle: "none",
      }}
    >
      <li>
        <NavLink to="/discover">Discover</NavLink>
      </li>
      <li>
        <NavLink to="/favorites">Favorite List</NavLink>
      </li>
      <li>
        <NavLink to="/list">Best media</NavLink>
      </li>
    </ul>
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
      <Route path="/list">
        <ListPlanets user={user} />
      </Route>
      <Route path="/favorites">
        <ListPlanets />
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
