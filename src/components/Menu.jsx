import React from 'react';
import {Link} from "react-router-dom";

const Menu = (props) => {

    return (
        <>          
          <ul className="menu-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Menu 1</Link>
            </li>
            <li>
              <Link to="/">Menu 2</Link>
            </li>
          </ul>                      
        </>
    )
}

export default Menu;
