import React from "react";
import Registers from"./register/body"
export default class Register extends React.Component{
    render(){
        return(
            <>
            <Registers use={this.props.use} />
            </>
        );
    }
}