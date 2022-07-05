import React from "react";
import Api from"./Api/axios"
import TinhTimeCanhNhau from './Api/Time'


export default class TinNhanPhanThuong extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Content:{}
        }
    }
    async loadEmployeenotificationsUpdateActive(id){
      try {
        //console.log("token",sessionStorage.getItem('Token'))
          const response =await Api.put('MessegaAccount/updateActive/'+id,{},{headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }

        })
          if(response.status===200)
          {
            //console.log("Update Thành Công")
            await this.props.renderweb1()
          }
          
        } catch (error) {
          console.log(error)
        }

    }
    async loadEmployeenotifications (){
        try {
        const search = (window.location.href).split('/');
        const concatid=search[search.length-1].split('.')
        const id=concatid[0]
          const response =await Api.get('MessegaAccount/findOne/'+id,{headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }

        })
          if(response.status===200)
          {
            if(response.data.result[0]){
            const ThongBao = response.data.result[0];
            //console.log(ThongBao)
            if(ThongBao.Active===0){
              await this.loadEmployeenotificationsUpdateActive(id)
            }
             this.setState({ Content:ThongBao });
            }
            
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async componentDidMount(){
      if(sessionStorage.getItem('Account')===null){
        
          await this.props.use("/NotFund");
          //await this.props.renderweb1()
      }else{
        await this.loadEmployeenotifications()
      }
    }
    async componentDidUpdate(){
      if(this.props.Load===1){
        await this.props.renderweb0()
        await this.loadEmployeenotifications()
      }
    }
    render(){
        let datepresent=new Date().getTime()
        let Content=""
        if(Object.keys(this.state.Content).length!==0){
            let DateThongBao=(new Date(this.state.Content.UpDate).getTime())-(1000*60*60*7);
            let date=TinhTimeCanhNhau(datepresent,DateThongBao);
            Content=<div className="ah_content">
            <div id="top-banner-pc">
            </div>
            <div id="top-banner-mb">
            </div>
            <div id="message-page">
            <div className="ah-frame-bg">
            <div className="title border-style-1 color-red-2 fw-500 fs-21">
            Tin nhắn từ hệ thống
            </div>
            <div className="content border-style-1">
            {this.state.Content.Message} </div>
            <div className="time fs-12 flex flex-hozi-center">
            <span className="material-icons-round margin-0-5">
            schedule
            </span> {date} trước </div>
            </div>
            </div>
            <div id="ah_toast"></div>
        </div>
        }
        return(
            <>
            {
                Content
            }
            </>
        );
    }
}