import React from "react";
import Logins from"./Login/body"
export default class Login extends React.Component{
    render(){
        return(
            <>
            <Logins use={this.props.use} renderweb1={this.props.renderweb1} renderweb0={this.props.renderweb0}/>
            </>
        );
    }
}