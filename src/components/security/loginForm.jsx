import React from 'react';
import * as Joi from "joi-browser";
import Form from "../common/form";
import authService from "../../services/authService";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import initRocket from "./logRocket";
import {Card, CardContent} from "@material-ui/core";
import logo from './../../assets/moveltrack.png'

class LoginForm extends Form {

    state = {
        data: {username: '', password: ''},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    }

    doSubmit = async () => {
        try {
            await authService.login(this.state.data)
            initRocket()
            window.location = '/'
        } catch (e) {
            if (this.isClientError(e)) {
                toast.error(e.response.data)
            }
        }
    }

    render() {

        if (authService.getCurrenUser())
            return <Redirect to="/"/>

        return (

            <div className="row mt-5">
                <div className="col-6">&nbsp;</div>
                <div className="col-4">
                    <Card>
                        <CardContent>
                            <img className="mb-4"
                                 src={logo}
                                 alt="" height="57"/>
                            <form onSubmit={this.handleSubmit} action="">
                                {this.renderInput("username", "Username")}
                                {this.renderInput("password", "Password", "password")}
                                {this.renderButton('Login')}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default LoginForm;
