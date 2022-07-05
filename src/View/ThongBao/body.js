import React from "react";
import Api from"../Api/axios";
import TinhTimeCanhNhau from "../Api/Time"


export default class Body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ThongBao:[]
        }
    }
    async loadEmployeenotifications (){
        try {
          const response =await Api.get('MessegaAccount/findItem',{headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }
        })
          if(response.status===200)
          {
            const ThongBao = response.data.result;
             this.setState({ ThongBao:ThongBao });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async componentDidMount(){
        if(sessionStorage.getItem('Account'))
      {
        await this.loadEmployeenotifications();
      }
      else{
       await this.props.use("/*")
      }
    }
    async clicktinnhan(id){
        await this.props.use(`/TinNhanPhanThuong/${id}`)
    }
    render(){
        let datepresent=new Date().getTime()
        return(
            <>
            <div className="ah_content">
           <div className="flex flex-ver-center">
<div className="history flex-column inline-flex flex-ver-center" style={{flex:"0.5"}}>
<div className="margin-10-0 bg-gray-2">
<div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
Thông báo
</div>
</div> 
<div id="list-item" className="ah-frame-bg bg-black">

    {
        this.state.ThongBao.map((item,index)=>{
            let DateThongBao=(new Date(item.UpDate).getTime())-(1000*60*60*7);
            let date=TinhTimeCanhNhau(datepresent,DateThongBao);
            let Active=""
            if(item.Active===1)
            Active="visited"
            if(index===0)
            return(<React.Fragment key={index}>
                <div className="padding-0-10 fw-500 fs-15">Mới</div>
                <div onClick={()=>this.clicktinnhan(item.Id)} noti-id={item.Id} className={`notification notification-comment flex flex-hozi-center ${Active}`}>
                <div className="avatar margin-r-5"><img src="../imge/JzGNfi6.png" alt=''/></div>
                <div className="flex flex-column flex-1">
                    <div className="text-shortcut fw-700"><span className="color-red-2">Tin nhắn từ hệ thống</span></div>
                    <div className="text-shortcut fs-12 fw-500 margin-5-0">{item.Message}</div>
                    <div className="fs-12 fw-500 color-blue text-shortcut">{date} trước</div>

                </div>
                </div>
                <div className="padding-0-10 fw-500 fs-15">Trước đó</div>
            </React.Fragment>)
            else
            return(
                <React.Fragment key={index}>                     
                <div onClick={()=>this.clicktinnhan(item.Id)} noti-id={item.Id} className={`notification notification-comment flex flex-hozi-center ${Active}`}>
                <div className="avatar margin-r-5"><img src="../imge/JzGNfi6.png" alt=''/></div>
                <div className="flex flex-column flex-1">
                    <div className="text-shortcut fw-700"><span className="color-red-2">Tin nhắn từ hệ thống</span></div>
                    <div className="text-shortcut fs-12 fw-500 margin-5-0">{item.Message}</div>
                    <div className="fs-12 fw-500 color-blue text-shortcut">{date} trước</div>
                </div>
                </div>
                </React.Fragment>
            )})
    }
                
<div className="padding-10">Không có thông báo nào</div></div>
<div id="active_show"></div>
</div>
</div>

           </div>
            </>
        );
    }
}