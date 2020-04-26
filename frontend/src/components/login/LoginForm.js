import React, { Component } from "react";
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup'
import validateLoginForm from '../../validations/login'


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

    isValid() {
        console.log(validateLoginForm(this.state));
        const { errors, isValid } = validateLoginForm(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('in submit!');
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            let userData = this.state;
            this.props.userLoginRequest(userData).then(
                (data) => {
                    console.log("SUCCES");
                    let accessToken = data.data.access;
                    let refreshToken = data.data.refresh;
                    localStorage.setItem('userAccessToken', accessToken);
                    localStorage.setItem('userRefreshToken', refreshToken);
                    this.setState({errors: {}, isLoading: false});
                    this.props.history.push('/');
                },
                (err) => {
                    console.log("error :) ");
                    let error_text = err.response.data.detail;
                    console.log(error_text);
                    this.setState({errors: {}, isLoading: false});
                }
            ).catch(
                (err) => {
                    console.log('err');
                    console.log(err);
                }
            );
        }
    }

    render (){
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h2>Login form again here:</h2>
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