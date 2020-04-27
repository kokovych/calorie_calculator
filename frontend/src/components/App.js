import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import GuestHomePage from '../components/homepage/GuestHomePage';
import LoginPage from '../components/login/Login';
import SignUp from '../components/registration/SignUp';

import Header from './Header'

class App extends Component {
    constructor(props){
        super(props);
        const { dispatch } = this.props;
    }
    render() {
        return (
            <div className="jumbotron">
                <BrowserRouter>
                    <h2>Welcome to my Personal Calorie Calculator App!</h2>
                    <Header/>
                    <Route exact path="/" component={GuestHomePage} />
                    <Route path="/login/" component={LoginPage} />
                    <Route path="/registration/" component={SignUp} />
                    <Route path="/logout/" component={GuestHomePage} />
                </BrowserRouter>
            </div>

    );
    }
}

export default App;