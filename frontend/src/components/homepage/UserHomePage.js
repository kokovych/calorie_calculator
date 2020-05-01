import React, { Component } from "react";

class UserHomePage extends Component {
    constructor(props){
        super(props);
    }
    render(){

        return (
            <div>
                <h3>
                    This is Calorie calculator!
                </h3>
                <p>
                    You are authorized USER and you can use you cabinet!
                </p>
            </div>
        );
    }
}

export default UserHomePage;