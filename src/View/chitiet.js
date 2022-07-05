import React from "react";
import Chitiets from"./chitiet/body";

export default class Chitiet extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            IdAnime:""
                  }
        this.Loadding=this.Loadding.bind(this);
    }
    componentDidMount(){
        this.layidAnime()
    }
    layidAnime(){
        let id;
            const search = (window.location.href).split('/');
            const concatid=search[search.length-1].split('.');
            id=concatid[0]
        this.setState({
            IdAnime:id
        })
    }
    Loadding(){
        this.layidAnime()
    }
    async componentDidUpdate(){
        if(this.props.Load===1){
            this.layidAnime()
        }
    }
    render(){
            
        return(
            <>
            <Chitiets Loadding={this.Loadding} Load={this.props.Load} renderweb1={this.props.renderweb1} renderweb0={this.props.renderweb0} id={this.state.IdAnime} use={this.props.use}/>
            </>
        );
    }
}