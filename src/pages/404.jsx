import React from "react";
import { Nav } from "../containers/AuthenticatedApp";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Link to="/discover" />
      Not Found
    </div>
  );
};

export default NotFound;
