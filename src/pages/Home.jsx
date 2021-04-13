import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <nav>
    <ul>
      <li>
        <Link to="/discover">Discover</Link>
      </li>
      <li>
        <Link to="/planet">Planet</Link>
      </li>
    </ul>
  </nav>;
};

export { Home };
