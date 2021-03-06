import React from "react";
import {Link, NavLink} from "react-router-dom";
import logo from './../assets/moveltrack.png'

const NavBar = ({user}) => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-0">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="mb-2" src={logo}
                         alt="Missing" height="20"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" aria-current="page" to="/">Home</Link>
                        {user && <Link className="nav-item nav-link" aria-current="page" to="/dashboard">Dashboard</Link>}
                        {user && <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>}
                        {!user && (<React.Fragment>
                            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                            <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                        </React.Fragment>)
                        }
                    </div>
                </div>
                {user && (<React.Fragment>
                    <div className="nav-item nav-link"><i className="fa fa-user mr-2"/>{user.name}</div>
                    <NavLink className="navbar-brand" to="/logout">Logout</NavLink>
                </React.Fragment>)}
            </div>
        </nav>


    );
};


export default NavBar;
