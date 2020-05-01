import React, { Component } from "react";
import LoginForm from './LoginForm';
import  userLoginRequest  from '../../actions/LoginAction';
import  getAccessTokenStatus  from '../../actions/verifyTokenAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


class LoginPage extends Component {
    render() {
        const { userLoginRequest } = this.props;
        // const { getAccessTokenStatus } = this.props;
        let d = getAccessTokenStatus();
        console.log(d);
        console.log('this.props LOGIN');
        console.log(this.props);
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

// LoginPage.propTypes = {
//     userLoginRequest: PropTypes.func.isRequired,
// };


function mapStateToProps(state) {
    const { authStatus } = state.authStatus;
    return {
        authStatus
    };
}


export default connect(mapStateToProps, { userLoginRequest})(LoginPage);