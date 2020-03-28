import React, { Component } from "react";

import AppRouter from './Header'

class App extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h2>Welcome to my Personal Calorie Calculator App!</h2>
                <AppRouter/>
            </div>

    );
    }
}

export default App;