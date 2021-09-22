import React, {Component} from 'react';
import Navbar from "./components/navbar";
import Movies from "./components/pages/movie/movies";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/security/loginForm";
import DashBoard from "./components/admin/dashBoard";
import NotFound from "./components/pages/notFound";
import MovieForm from "./components/pages/movie/movieForm";
import RegisterForm from "./components/security/registerForm";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';



class App extends Component {

    state = {
        posts:[]
    }

    componentDidMount() {



    }



    render() {
        return (
            <React.Fragment>

                <Navbar/>

                <main className="container">

                    <ToastContainer />

                    <Switch>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/movies/:id" component={MovieForm}/>
                        <Route path="/movies/new" component={MovieForm}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/admin" component={DashBoard}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/" exact component={Home}/>
                        <Redirect to="not-found" />
                    </Switch>



                </main>
            </React.Fragment>
        );
    }
}


export default App;
