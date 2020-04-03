import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// import LoginPage from "./Login"
// import RegisterPage from "./registration/Register"

function HomePage() {
    return (
        <div>
            <h2>Home</h2>
            <div>
                this is home page content!!! :)
            </div>
        </div>
    )
}


function AppRouter() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-default">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a href="/admin/"  target="_blank">ADMIN PAGE</a>
                        </li>
                        <li>
                            <Link to="/login/">Login</Link>
                        </li>
                        <li>
                            <Link to="/registration/">Registration</Link>
                        </li>
                        <li>
                            <Link to="/logout/">Logout</Link>
                        </li>
                    </ul>
                </nav>

                <Route exact path="/" component={HomePage} />
                <Route path="/login/" component={HomePage} />
                <Route path="/registration/" component={HomePage} />
                <Route path="/logout/" component={HomePage} />
            </div>

        </Router>
    );
}

export default AppRouter;
