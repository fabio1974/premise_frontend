import React from 'react';
import * as Joi from "joi-browser";
import Form from "../common/form";

class LoginForm extends Form {

    state = {
        data: {username:'',password:''},
        errors:{}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    }

    doSubmit = () =>{
        console.log("Submited")
    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col-8">&nbsp;</div>
                <div className="col-4">
                        <main className="form-signin">
                            <img className="mb-4"
                                 src="https://www.premise.com/wp-content/uploads/2021/09/premise_logo_coral.png"
                                 alt="" height="57"/>
                            <form onSubmit={this.handleSubmit} action="">
                                {this.renderInput("username","Username")}
                                {this.renderInput("password","Password","password")}
                                {this.renderButton('Login')}
                            </form>
                        </main>
                </div>
            </div>
        );
    }
}

export default LoginForm;
