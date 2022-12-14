import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New Patient</NavLink>
      </li>
      <li>
        <NavLink to="/">Sign Out</NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
