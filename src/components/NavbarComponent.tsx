// import React from 'react';

import { Link } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <div id='navbar'>
            <ul>
                <li><Link to='/'> Home Page</Link></li>
                <li><Link to='/mangas'> Mangas Page</Link></li>
                <li><Link to='/login'> login page</Link></li>
                <li><Link to='/signin'> sign in page</Link></li>
            </ul>
        </div>
    );
};

export default NavbarComponent;