// import React from 'react';

import { Link } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <div id='navbar'>
            <ul>
                <li><Link to='/'> Home Page</Link></li>
                <li><Link to='/mangas'> Mangas Page</Link></li>
            </ul>
        </div>
    );
};

export default NavbarComponent;