import React from "react";


const NavBar = ({totalCounters}) => {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="http://premise.com">Navbar Sério {totalCounters}</a>
            </div>

        </nav>
    );
};


export default NavBar;
