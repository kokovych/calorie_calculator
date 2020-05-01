import React, { Component } from "react";
import LoginForm from './LoginForm';
import  userLoginRequest  from '../../actions/LoginActions';
import  getAccessTokenStatus  from '../../actions/verifyTokenAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


class LoginPage extends Component {
    render() {
        const { userLoginRequest } = this.props;
        let {hasAccessToken} = getAccessTokenStatus();
        console.log('this.props LOGIN');
        console.log(hasAccessToken);
        if(hasAccessToken){
            return(
                <div>
                    <h3>You are already logged in!</h3>
                </div>
            )
        }
        return (
            <div className="row">
                <h1>This is login page</h1>
                <LoginForm userLoginRequest={userLoginRequest} history={this.props.history} />
                <p>Sign up here:</p>
                <Link to="/registration/">Registration</Link>
            </div>
        );
    }
}

LoginPage.propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    const { authStatus } = state.authStatus;
    return {
        authStatus
    };
}


export default connect(mapStateToProps, { userLoginRequest})(LoginPage);