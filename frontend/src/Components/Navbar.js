import React from "react";
import "../Styles/nav.css";
import { Link, Redirect } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav>
        <label class="logo">Trainings at SACL</label>
        <ul>
          <li>
            <Link className="a" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="a" to="filter">
              Reports
            </Link>
          </li>
          <li>
            <Link className="a" to="data-entry">
              ADD DATA
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
