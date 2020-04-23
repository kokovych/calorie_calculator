import React, { Component } from "react";
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginPage extends Component {
    render() {
        return (
            <div className="row">
                <LoginForm />
            </div>
        );
    }
}



export default LoginPage;

