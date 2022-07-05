import React from "react";
import Boloc from"./boloc/body";
//import utf8 from"utf8"
export default class Bolocs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Load:1,
            query:{},
            page:1
        }
        this.onclickrender=this.onclickrender.bind(this)
        this.onclickrender1=this.onclickrender1.bind(this)
    }
    async onclickrender(){
       await this.props.renderweb1()
    }
    async onclickrender1(){
        await this.props.renderweb0()
    }
    async componentDidMount(){
      await  this.loaditem()
    }
    async loaditem(){
        const search = (window.location.href).split('?');
        const item=search[search.length-1].split('#');
        const item2=item[0].split('&');
        let item1={}
        item2.forEach((value)=>{
            let is=value.split("=");
            console.log(decodeURI(is[1]));
            item1[is[0]]=decodeURI(is[1]);
        })     
        this.setState({
            query:item1
        })
        await this.props.renderweb1();
    }
    async componentDidUpdate(){
        const search = (window.location.href).split('?');
        const item=search[search.length-1].split('#');
        const item2=item[0].split('&');
        let item1={}
        item2.forEach((value)=>{
            let is=value.split("=");
            console.log(decodeURI(is[1]))
            item1[is[0]]=decodeURI(is[1]);
        })
        let sosanh=this.shallowEqual(item1,this.state.query)
        if(!sosanh&&this.props.Load===1){
           await this.loaditem()
        }
    }
     shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
        return true;
      }
    render(){  
        return(
            <>
            <Boloc page={this.state.page} Load={this.props.Load} onclickrender1={this.onclickrender1} onclickrender={this.onclickrender} query={this.state.query} use={this.props.use}/>
            </>
        );
    }
}