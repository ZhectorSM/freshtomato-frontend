import React from 'react';
import Menu from './Menu';

const Header = (props) => {
    return (
        <header>
            <div className="header-left"> 
                <h1>Fresh Tomato</h1>
            </div>
            <div className="header-right"> 
                <Menu/>
            </div>
        </header>
    )
}

export default Header
