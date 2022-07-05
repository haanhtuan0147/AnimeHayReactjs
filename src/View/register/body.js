import React from "react";
import Api from"../Api/axios"
import { ToastContainer , toast } from 'react-toastify';
import Register from './loaddata/Register'




 class body extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            Email:"",
            PassWord:"",
            PassWords:"",
            Status:0,
            Err:[],
            NickName:"",
            Ma:0,
        }
        this.handleChangePassWord=this.handleChangePassWord.bind(this)
        this.handleChangePassWords=this.handleChangePassWords.bind(this)
        this.handleChangeNickName=this.handleChangeNickName.bind(this)
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.ClickRegister=this.ClickRegister.bind(this)
        this.handleClickGuiMa=this.handleClickGuiMa.bind(this)
        this.handleChangeMa=this.handleChangeMa.bind(this)

    }
    async ClickRegister(event){
        event.preventDefault()
        let loi=[]
        try {
            if(this.state.Email==="")
            loi.push("Chưa Nhập Email");
            if(this.state.PassWord==="")
            loi.push("Chưa Nhập Password");
            if(this.state.PassWord!==this.state.PassWords)
            loi.push("Password Nhập Lại Chưa Đúng ");
            if(loi.length===0){
                //console.log("VÀo đây",loi.length)
                const response =await Api.post('Account/Register',{NumberAcces:this.state.Ma,NickName:this.state.NickName,Email:this.state.Email,Password:this.state.PassWord},
                {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
                 })
                if(response.status===200)
                {
                    toast.success("Bạn Đã Đăng Ký Thành Công Mời Bạn Qua Trang Đăng Nhập");
                    await this.props.use("/Login");
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
    handleChangeEmail(event){
        let Email=/^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$/
        if(event.target.value.match(Email)){
            this.setState({
                Email:event.target.value,
                Err:[]
            })
        }
        else
        this.setState({
            Err:["Lỗi Email"]
          })
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
    handleChangeNickName(event){
        this.setState({
            NickName:event.target.value
        })
    }
    handleChangeMa(event){
        this.setState({
            Ma:Number(event.target.value)
        })
    }
    async handleClickGuiMa(){
        try {

            const response =await Api.post('Gmail/Gmail',{
                Email:this.state.Email                
            },
            {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
             })
            if(response.status===200)
            {
                toast.success("Bạn Đã gửi Mã Thành Công")
            }
        } catch (error) {
            
            toast.error("Gửi Mã Thất Bại "+error.response.data.message)
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
                <div className="register-page">
                    <div className="margin-10-0 bg-gray-2">
                    <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
                    Đăng ký
                    </div>
                    </div> 
                    <div className="ah-form flex flex-column flex-hozi-center ah-frame-bg">
                    <Register Email={this.state.Email} handleChangeMa={this.handleChangeMa} handleChangeEmail={this.handleChangeEmail} handleChangePassWord={this.handleChangePassWord} handleChangePassWords={this.handleChangePassWords} handleChangeNickName={this.handleChangeNickName} handleClickGuiMa={this.handleClickGuiMa} LoiRegister={this.state.Err} ClickRegister={this.ClickRegister}/>
                    </div>
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
export default body