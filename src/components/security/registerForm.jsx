import React from 'react';
import * as Joi from "joi-browser";
import Form from "../common/form";
import {register} from "../../services/userService";
import auth from "../../services/authService";
import initRocket from "./logRocket";
import {Card, CardContent} from "@material-ui/core";
import logo from './../../assets/moveltrack.png'


class RegisterForm extends Form {

    state = {
        data: {username:'',password:'', name:''},
        errors:{}
    };

    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name"),
    }

    doSubmit = async () =>{
        try {
            const response = await register(this.state.data)
            auth.loginRegister(response.headers['x-auth-token'])
            initRocket()
            window.location = '/'
        }catch (e) {
            if(this.isClientError(e)){
                const errors = {...this.state.errors};
                errors.username = e.response.data
                this.setState({errors})
            }
        }
    }

    render() {
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
                                {this.renderInput("username","Username")}
                                {this.renderInput("password","Password","password")}
                                {this.renderInput("name","Name")}
                                {this.renderButton('Register')}
                            </form>
                                </CardContent>
                            </Card>

                </div>
            </div>
        );
    }
}

export default RegisterForm;
