import React, { Component } from "react";
import { connect } from 'react-redux';
import helloRequest from '../../actions/HelloAction'


class TodayCalories extends Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        console.log('componentDidMount in TodayCalories');
        this.props.dispatch(helloRequest());
    }

    render(){
        console.log('RENDER TodayCalories');
        console.log(this.props);
        const { hello } = this.props;
        console.log(hello);
        let msg = hello.data.message;
        console.log('msg');
        console.log(msg);
        return(
            <div className="">
                Today calories:
                {msg}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps TodayCalories");
    console.log(state);
    const { hello } = state;
    return {
        hello
    }
}


// function mapDispatchToProps (dispatch) {
//     return {
//         someData:  () => dispatch(helloRequest())
//     }
// }


export default connect(mapStateToProps)(TodayCalories);