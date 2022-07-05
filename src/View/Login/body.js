import React from "react";
import Api from"../Api/axios"
import { ToastContainer , toast } from 'react-toastify';
import FromLogin from './Loaddata/FromLogin'




 class body extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            Email:"",
            PassWord:"",
            Status:0,
            Err:"",
        }
        this.handleChangePassWord=this.handleChangePassWord.bind(this)
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.ClickLogin=this.ClickLogin.bind(this)
    }
    async ClickLogin(event){
        event.preventDefault()        
        try {
            const response =await Api.post('login',{username:this.state.Email,password:this.state.PassWord},
            {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
            if(response.status===200)
            {
                sessionStorage.setItem("Token",response.data.ToKen);
                sessionStorage.setItem("Account",JSON.stringify(response.data.Account));
                sessionStorage.setItem("StatusLogin",1);
                await this.props.use("/")
                await this.props.renderweb1();
            }
            toast.error(response.data.message)
                   
          } 
          catch (error) {
              this.setState({
                Err:error.response.data.message
              })
              toast.error(error.response.data.message)
          }
    }
    handleChangeEmail(event){
        this.setState({
            Email:event.target.value
        })


    }
    handleChangePassWord(event){
        this.setState({
            PassWord:event.target.value
        })
    }
    
    render(){
        return(
          <>
          <div className="ah_content">
                <div id="top-banner-pc">
                </div>
                <div id="top-banner-mb">
                </div>
                <div className="login-page">
                    <div className="margin-10-0 bg-gray-2">
                        <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
                        Đăng nhập thành viên
                        </div>
                    </div>
                     <div className="ah-form flex flex-column flex-hozi-center ah-frame-bg">
                        <div>
                        <div id="my-signin2" className="g-signin2"></div>
                        </div>
                        <FromLogin ClickLogin={this.ClickLogin} Err={this.state.Err} handleChangePassWord={this.handleChangePassWord} handleChangeEmail={this.handleChangeEmail}/>
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