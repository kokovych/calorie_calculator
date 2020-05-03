import React, { Component } from "react";
import { connect } from 'react-redux';

import helloRequest from '../../actions/HelloAction';
import TodayCalories from './TodayCalories';


class UserHomePage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log('IN RENDER');
        console.log(this.props);
        return (
            <div>
                <h3>
                    This is Calorie calculator!
                </h3>
                <p>
                    You are authorized USER and you can use you cabinet!
                </p>
                <TodayCalories />
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     console.log("mapStateToProps");
//     console.log(state);
//     console.log(state.helloReducer);
//     const { authStatus } = state.authStatus;
//     const { helloReducer } = state.helloReducer;
//     return {
//         helloReducer
//     };
// }

// export default connect(null)(UserHomePage);
export default UserHomePage;

// todo
// action is not dispatched
// https://stackoverflow.com/questions/39735689/action-creator-is-called-but-action-is-not-dispatched