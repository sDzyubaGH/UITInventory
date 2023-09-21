import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="home"> </Link>
      <Link to="archive"> </Link>
      <Link to="add"> </Link>
      <Link to="delete"> </Link>
    </nav>
  );
}

export default Navigation;
