import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getCurrenUser} from "../services/authService";
import Hooks from "./movie/hooks";
import logo from './../assets/moveltrack.png'

class Home extends Component {
    render() {
        return (
            <div className="page-wrap d-flex flex-row align-items-center mt-lg-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">

                            <span className="display-1 d-block">
                                <img className="mb-4"
                                     src={logo}
                                     alt="" height="57"/>
                            </span>
                            <div className="mb-4 lead">This is a Demo Application </div>
                            {getCurrenUser() && <Link to="/movies">Go to Movies</Link>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
