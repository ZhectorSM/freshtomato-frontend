import React from "react";
import { Link } from "react-router-dom";

const Menu = props => {
  return (
    <>
      <ul className="menu-list">
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </>
  );
};

export default Menu;
