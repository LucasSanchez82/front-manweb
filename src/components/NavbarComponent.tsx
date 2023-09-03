// import React from 'react';
import { Link, useNavigate } from "react-router-dom";



const NavbarComponent = () => {
    const navigate =useNavigate();
    const handleLogout = async () => {
        await fetch('http://localhost:3000/logout', {
            credentials: 'include',
            method: 'POST'
        })
        // window.location.reload()
        navigate('/login')
        
    }
    return (
        <>
        <h1>ManWeb !</h1>
            <div id='navbar'>
            <ul>
                <li><Link to='/'> Mangas Page</Link></li>
                <li><Link to='/login'> login page</Link></li>
                <li><Link to='/signin'> sign in page</Link></li>
                <li><button type="button" onClick={handleLogout}>logout</button> </li>
            </ul>
        </div>
        </>
    );
};

export default NavbarComponent;