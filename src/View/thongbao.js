import React from "react";
import Thongbaos from"./ThongBao/body"

export default class Thongbao extends React.Component{
    
    render(){
        return(
            <>
            <Thongbaos use={this.props.use}/>
            </>
        );
    }
}