import React from "react";
import Api from"../Api/axios";
import LoiRegister from "../register/loaddata/LoiRegister";
import { ToastContainer , toast } from 'react-toastify';




export default class body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            PassWord:"",
            PassWords:"",
            Err:[]
        }
        this.handleChangePassWord=this.handleChangePassWord.bind(this);
        this.handleChangePassWords=this.handleChangePassWords.bind(this);
        this.ClickRegister=this.ClickRegister.bind(this);
    }
    handleChangePassWord(event){
        let password=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
        if(event.target.value.match(password)) 
        this.setState({
            PassWord:event.target.value,
            Err:[]
        })
        else
        this.setState({
            Err:["PassWord: Ít Nhất 8 Ký Tự Cần Có Chữ Số,Chữ Thường và Chữ Hoa "]
          })
    }
    handleChangePassWords(event){
            if(this.state.PassWord===event.target.value)
            this.setState({
                PassWords:event.target.value,
                Err:[]
            })
            else
            this.setState({
                Err:["PassWord Nhập Lại Không Đúng"]
              })
    }
    async ClickRegister(event){
        event.preventDefault()
        let loi=[]
        try {
            if(this.state.PassWord==="")
            loi.push("Chưa Nhập Password");
            if(this.state.PassWord!==this.state.PassWords)
            loi.push("Password Nhập Lại Chưa Đúng ");
            if(loi.length===0){
                //console.log("VÀo đây",loi.length)
                const response =await Api.put('Account/updateUser',{Password:this.state.PassWord},
                {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization':'Bearer '+sessionStorage.getItem('Token')

                }
                 })
                if(response.status===200)
                {
                    toast.success("Bạn Đã Đổi Mật Khẩu Thành Công, Nếu Bạn Đăng Nhập Lại Thì Xin Vui Lòng Dùng Mật Khẩu Mới");
                }
            }
            this.setState({
                Err:loi
              })
                   
          } 
          catch (error) {
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Lỗi Cú Pháp")
            }

          }
    }
    render(){
        return(
            <>
           <div className="ah_content">
<div id="top-banner-pc">
</div>
<div id="top-banner-mb">
</div>
<div className="ah-form flex flex-column flex-hozi-center ah-frame-bg">
<form onSubmit={(event)=>this.ClickRegister(event)}>
<div>
<label>Mật khẩu mới</label>
<input type="password" placeholder="Nhập mật khẩu mới" name="new_password" onChange={(event)=>this.handleChangePassWord(event)}/>
</div>
<div>
<label>Nhập lại mật khẩu mới</label>
<input type="password" placeholder="Nhập lại mật khẩu mới" name="re_new_password"  onChange={(event)=>this.handleChangePassWords(event)}/>
</div>
<div id="message-line">
    <LoiRegister LoiRegister={this.state.Err}/>
</div> 
 <div>
<button type="submit" name="action_send" className="button-default color-white bg-red" value="submit">Đổi mật khẩu</button>
</div>
</form>
</div>
<div id="ah_toast">
                <ToastContainer  position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'dark'}/>
                </div>
</div>
            </>
        );
    }
    
}