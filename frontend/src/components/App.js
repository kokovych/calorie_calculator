import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import GuestHomePage from '../components/homepage/GuestHomePage';
import UserHomePage from '../components/homepage/UserHomePage';
import LoginPage from '../components/login/Login';
import SignUp from '../components/registration/SignUp';

import Header from './Header';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log('in APP');
        const { dispatch } = this.props;
        console.log(this.props);
        let userAccessToken = localStorage.getItem('userAccessToken');
        console.log(userAccessToken);
        let hasAccessToken = userAccessToken ? true: false;
        console.log(hasAccessToken);

        return (
            <div className="jumbotron">
                <BrowserRouter>
                    <h2>Welcome to my Personal Calorie Calculator App!</h2>
                    <Header hasAccesToken ={hasAccessToken}/>
                    <Route exact path="/" component={hasAccessToken? UserHomePage: GuestHomePage}/>
                    <Route path="/login/" component={LoginPage} hasAccessToken={hasAccessToken}/>
                    <Route path="/registration/" component={SignUp} />
                    <Route path="/logout/" component={GuestHomePage} />
                </BrowserRouter>
            </div>
    );
    }
}

function mapStateToProps(state) {
    const { authStatus } = state.authStatus;
    return {
        authStatus
    };
}

export default connect(mapStateToProps)(App);