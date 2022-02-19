import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {setCurrentUser} from "../../actions/LoginActions"
import InputFieldGroup from '../common/InputFieldGroup'
import validateLoginForm from '../../validations/login'
import setAuthorizationToken from '../../utils/setAuthorizationToken'


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
        const { dispatch } = this.props;
        console.log('in submit!');
        console.log(this.props);
        console.log(dispatch);
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            let userData = this.state;
            this.props.userLoginRequest(userData).then(
                (data) => {
                    console.log("SUCCES");
                    let accessToken = data.data.access;
                    let refreshToken = data.data.refresh;
                    let tokens = {
                        "tokens":{
                            "accessToken": accessToken,
                            "refreshToken": refreshToken
                        }
                    };
                    localStorage.setItem('userAccessToken', accessToken);
                    localStorage.setItem('userRefreshToken', refreshToken);
                    dispatch(setCurrentUser(accessToken));
                    setAuthorizationToken(accessToken);
                    this.setState({errors: {}, isLoading: false});
                    this.props.history.push('/');
                    console.log('after push /');
                    // window.location.reload();

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
        console.log('in render loginForm');
        console.log(this.props);
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


function mapStateToProps(state) {
    const { authStatus } = state.authStatus;
    return {
        authStatus
    };
}

export default connect(mapStateToProps)(LoginForm);

