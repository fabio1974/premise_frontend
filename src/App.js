import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Navbar from "./components/navbar";
import Movies from "./components/movie/movies";
import Home from "./components/home";
import LoginForm from "./components/security/loginForm";
import NotFound from "./components/notFound";
import MovieForm from "./components/movie/movieForm";
import RegisterForm from "./components/security/registerForm";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";


class App extends Component {

    state = {
    }

    componentDidMount() {
        const user = auth.getCurrenUser()
        this.setState({user})
    }

    render() {
        return (
            <React.Fragment>

                <Navbar user={this.state.user} />

                <main className="container">

                    <ToastContainer />

                    <Switch>
                        <Route path="/not-found" component={NotFound}/>
                        <ProtectedRoute path="/movies/:id" component={MovieForm}/>
                        {/*<ProtectedRoute path="/movies/new" component={MovieForm}/>*/}
                        <ProtectedRoute path="/movies" render={props => <Movies {...props} user={this.state.user} />}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" exact component={Home}/>
                        <Redirect to="not-found" />
                    </Switch>



                </main>
            </React.Fragment>
        );
    }
}


export default App;
