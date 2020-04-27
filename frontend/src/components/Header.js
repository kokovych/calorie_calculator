import React from "react";
import { Link } from "react-router-dom";


function Header() {
    return (
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
            </div>
    );
}

export default Header;
