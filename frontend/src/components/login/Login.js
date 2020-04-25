import React, { Component } from "react";
import LoginForm from './LoginForm';
import  userLoginRequest  from '../../actions/LoginAction'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class LoginPage extends Component {
    render() {
        const { userLoginRequest } = this.props;
        console.log('userLoginRequest');
        console.log(userLoginRequest);
        return (
            <div className="row">
                <h1>This is login page</h1>
                <LoginForm userLoginRequest={userLoginRequest} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
};


export default connect(null, { userLoginRequest})(LoginPage);