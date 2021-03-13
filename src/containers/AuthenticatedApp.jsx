import React from "react";
import SearchComponent from "../components/search/SearchComponent";

const AuthenticatedApp = ({ user }) => {
  return (
    <div>
      <SearchComponent user={user} />
    </div>
  );
};

export default AuthenticatedApp;
