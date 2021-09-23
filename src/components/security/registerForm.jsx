import React from 'react';
import * as Joi from "joi-browser";
import Form from "../common/form";
import {register} from "../../services/userService";

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
            await register(this.state.data)

            localStorage.setItem('token',jwt)
            this.props.history.push("/")

        }catch (e) {
            if(this.isExpectedError(e)){
                const errors = {...this.state.errors};
                errors.username = e.response.data
                this.setState({errors})
            }
        }
    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col-8">&nbsp;</div>
                <div className="col-4">
                        <main className="form-signin">
                            <img className="mb-4"
                                 src="https://www.premise.com/wp-content/uploads/2021/09/premise_logo_coral.png"
                                 alt="" height="47"/>
                            <form onSubmit={this.handleSubmit} action="">
                                {this.renderInput("username","Username")}
                                {this.renderInput("password","Password","password")}
                                {this.renderInput("name","Name")}
                                {this.renderButton('Register')}
                            </form>
                        </main>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
