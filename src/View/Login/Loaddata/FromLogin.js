import React from "react"
import Loilogin from "./Loilogin";
import { Link } from "react-router-dom";

 class FromLogin extends React.Component{
render(){
    return(<>
            <form onSubmit={(event)=>this.props.ClickLogin(event)}>
                <div>
                <label>Email</label>
                <input type="email" placeholder="Nhập email của bạn" name="email" onChange={(event)=>this.props.handleChangeEmail(event)} />
                </div>
                <div>
                <label>Mật khẩu</label>
                <input type="password" placeholder="Nhập mật khẩu của bạn" name="password"onChange={(event)=>this.props.handleChangePassWord(event)}/>
                </div>
                <div id="message-line">
                    <Loilogin Loilogin={this.props.Err}/>
                </div> 
                <div className="flex flex-hozi-center flex-column">
                    <div className="flex flex-hozi-center">
                    <button type="submit" className="button-default color-white bg-red" name="action_login" >Đăng nhập</button>
                    </div>
                    <div>
                    <Link to="/Register" className="button-default bg-green margin-5-0 padding-10-20">Đăng ký</Link>
                    </div>
               </div>
        </form>
    </>)
}
 }
export default FromLogin;