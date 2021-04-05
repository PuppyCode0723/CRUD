import axios from 'axios';
import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

/**
 * 
 * @param {name: string, setName:(name: string)=> void} props 
 * @returns 
 */
const Nav = (props) => {
    const history = useHistory();
    const logout = async () => {
        // await props.setName("");        
        props.name.current = "";
        localStorage.clear();
        history.push('/');
    }

    let menu;

    if (localStorage.getItem('user')) {
        props.name.current = localStorage.getItem('user');
    }

    if (props.name.current === '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" onClick={() => { logout() }}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    )
}

export default Nav;