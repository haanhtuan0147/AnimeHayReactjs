import React from "react";
import Giua from "./giua";
import Tren from "./tren";
import Api from"../Api/axios"

export default class body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            TaiKhoan:{}
                  }
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeMaxim=this.handleChangeMaxim.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChangeAvatar=this.handleChangeAvatar.bind(this);
    }
    async LoadData(){
        try {
            const response =await Api.get('Account/findUser',
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
            }
  
          })
            if(response.status===200)
            {
              const Account = response.data.result[0];
              //console.log(Account)
              this.setState({ TaiKhoan:Account});
            }
          } catch (error) {
              console.log(error)
          }
    }
    async componentDidMount(){
        if(sessionStorage.getItem("Account"))
      {
        await this.LoadData()
      }
    }
    async UpLoadLoadData(item){
        try {
            console.log("Tuấn",item)
            const response =await Api.put('Account/updateUser',item,
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
            }
  
          })
            if(response.status===200)
            {
                this.setState({TaiKhoan:item});
            }
          } catch (error) {
              console.log(error)
          }
    }
    async handleSubmit(event) {
        event.preventDefault();
        await this.UpLoadLoadData({NickName:this.state.TaiKhoan.NickName,Maxim:this.state.TaiKhoan.Maxim})
      }
    async handleChangeAvatar(Avatar) {
        await this.UpLoadLoadData({Avatar:Avatar})
      } 
    handleChangeName(event) {
        this.setState({TaiKhoan:{NickName: event.target.value}});
      }
    handleChangeMaxim(event) {
        this.setState({TaiKhoan:{Maxim: event.target.value}});
      }       
    render(){
        return(
            <>
            <Tren TaiKhoan={this.state.TaiKhoan}/>
            <Giua handleChangeAvatar={this.handleChangeAvatar} handleSubmit={this.handleSubmit} handleChangeName={this.handleChangeName} handleChangeMaxim={this.handleChangeMaxim} TaiKhoan={this.state.TaiKhoan}/>
            </>
        );
    }
    
}