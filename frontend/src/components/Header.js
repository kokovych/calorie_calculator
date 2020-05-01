import React, {Component} from "react";
import { Link } from "react-router-dom";


class Header extends (Component) {
    constructor(props){
        super(props);
    }
    render(){
        console.log('in HEader');
        console.log(this.props);
        const {hasAccesToken} = this.props;
        console.log(hasAccesToken);
        const userLinks = (
            <div>
                <li>
                    <a href="/admin/"  target="_blank">ADMIN PAGE</a>
                </li>
                <li>
                    <Link to="/logout/">Logout</Link>
                </li>
            </div>
        );
        const questLinks = (
            <div>
                <li>
                    <Link to="/login/">Login</Link>
                </li>
                <li>
                    <Link to="/registration/">Sign up</Link>
                </li>
            </div>
        );

        return (
            <div>
                <nav className="navbar navbar-default">

                    <div><Link to="/">Home</Link></div>
                    { hasAccesToken? userLinks : questLinks}
                </nav>
            </div>
    );
    }

}

export default Header;
