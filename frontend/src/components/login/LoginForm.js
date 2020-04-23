import React, { Component } from "react";
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup'


class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('in submit!');
    }

    render (){
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h2>Login form:</h2>
                <InputFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                    type="text"
                />
                <InputFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Log in
                    </button>
                </div>
            </form>
        );
    }

}


export default LoginForm;