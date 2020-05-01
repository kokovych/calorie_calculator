import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import {logout} from '../actions/LoginActions';


class Header extends (Component) {
    constructor(props){
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e){
        e.preventDefault();
        console.log('processing...');
        console.log(this.props);
        this.props.logout();
        window.location.reload();

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
                    <a href="#" onClick={this.logoutUser}>Logout</a>
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

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(null, { logout })(Header);
