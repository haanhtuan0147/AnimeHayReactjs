
import React from "react"
import Buttonguma from "./buttonguma";
import LoiRegister from "./LoiRegister";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";




 class FromRegister extends React.Component{
constructor(props){
    super(props);
    this.state={
        time:0
    }
    this.handleClickGuiMas=this.handleClickGuiMas.bind(this)
}
componentDidUpdate(){
    clearTimeout(this.time)
    if(this.state.time!==0)
    this.time=setTimeout(()=>(this.setState({time:this.state.time-1})),1000)
}
handleClickGuiMas(){
    let Email=/^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$/
    console.log("vào đây",this.props.Email)
    if(this.props.Email!==""&&(this.props.Email).match(Email))
    {
        this.setState({
            time:300
        })
        this.props.handleClickGuiMa()
    }
    else{
        toast.error("Bạn Chưa Nhập Email")
    }
}
render(){
    return(<>
                <form onSubmit={(event)=>this.props.ClickRegister(event)}>
                            <div>
                                <label>Biệt danh</label>
                                <input type="text" placeholder="Biệt danh bạn muốn đặt"  name="nickname" onChange={(event)=>this.props.handleChangeNickName(event)}/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" placeholder="Nhập email của bạn"  name="email" onChange={(event)=>this.props.handleChangeEmail(event)}/>
                            </div>
                            <div>
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu của bạn" name="password" onChange={(event)=>this.props.handleChangePassWord(event)}/>
                            </div>
                            <div>
                                <label>Nhập lại mật khẩu</label>
                                <input type="password" placeholder="Nhập lại mật khẩu của bạn" name="re_password" onChange={(event)=>this.props.handleChangePassWords(event)}/>
                            </div>
                            <div>
                                <label>Mã Email</label>
                                <div className="flex flex-row">
                                <input type="text" placeholder="Nhập số xác nhận của bạn" name="Ma_Email" onChange={(event)=>this.props.handleChangeMa(event)}/>
                                <Buttonguma time={this.state.time} handleClickGuiMas={this.handleClickGuiMas}/>
                                </div>
                            </div>
                            <div id="message-line">
                                <LoiRegister LoiRegister={this.props.LoiRegister}/>
                            </div> 
                            <div className="flex flex-hozi-center flex-column">
                                <button type="submit" name="action_register" value="submit" className="button-default bg-green margin-5-0 padding-10-20">Đăng ký</button>
                                <div className="margin-10-0">
                            Bạn đã có tài khoản ? <Link to="/Login">Đăng nhập</Link>
                            </div>
                            </div>
                    </form>
                    
    </>)
}
 }
export default FromRegister;