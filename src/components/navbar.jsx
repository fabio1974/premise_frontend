import React from "react";
import {Link, NavLink} from "react-router-dom";


const NavBar = ({totalCounters}) => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="mb-2" src="https://www.premise.com/wp-content/uploads/2021/09/premise_logo_coral.png"
                         alt="" height="20"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" aria-current="page" to="/">Home</Link>
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </div>
                </div>
                <Link className="navbar-brand" to="/">Logout</Link>
            </div>
        </nav>


    );
};


export default NavBar;
