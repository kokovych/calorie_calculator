import React, { Component } from "react";

class guestHomePage extends Component {
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
                    You are not authorized! Please, log in :)
                </p>
            </div>
        );
    }
}

export default guestHomePage;
