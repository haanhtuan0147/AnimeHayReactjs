import React from "react";
import TinhTimeCanhNhau from "../../Api/Time"
import { Link } from "react-router-dom";

 class Dropdown extends React.Component{
    async heandlTinNhanPhanThuong(id){
       await this.props.use(`/TinNhanPhanThuong/${id}.html`);
       await this.props.renderweb1()
        //return window.location.assign(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/TinNhanPhanThuong/'+id+".html")
    }
    async logout(){
        sessionStorage.removeItem("Token")
        sessionStorage.removeItem("Account")
        sessionStorage.removeItem("StatusLogin")
        await this.props.renderweb1()
        }
render(){
    let datepresent=new Date().getTime()
    if(sessionStorage.getItem('Account')!==null)
    {
        //console.log(">>>>>>",this.props.ThongBao)
        const Account=JSON.parse(sessionStorage.getItem('Account'))
        return(<>
        <div id="drop-down-2" className="dropdown-menu bg-black flex-column">
            <div className="row-1 flex flex-column flex-hozi-center">
            <div className="avatar">
            <img src={Account.Avatar} alt={Account.NickName}/>
            </div>
            <div className="nickname fs-17 fw-700 margin-t-10 color-yellow">
            {Account.NickName} </div>
            </div>
            <Link to="/Quanlytaikhoan" className="flex flex-hozi-center"><span className="material-icons-round margin-0-5">
            account_box
            </span> Thông tin</Link>
            <Link to="/DoiMatKhau" className="flex flex-hozi-center"><span className="material-icons-round margin-0-5">
            password
            </span>Thay đổi mật khẩu</Link>
            <Link to="/" onClick={()=>this.logout()} className="flex flex-hozi-center"><span className="material-icons-round margin-0-5">
            logout
            </span>Đăng xuất</Link>
        </div>  
        <div id="drop-down-3" className="dropdown-menu bg-black flex-column" >
                                <div className="fw-500 margin-10 flex flex-hozi-center">
                                    <div className="flex-1 fs-19">Thông Báo</div>
                                    <div>
                                    <Link to="/Thongbao">Xem tất cả</Link>
                                    </div>
                                    </div>
            <div id="list-item-notification" className="scroll-bar">
            {
                this.props.ThongBao.map((item,index)=>{
                    let DateThongBao=(new Date(item.UpDate).getTime())-(1000*60*60*7);
                    let date=TinhTimeCanhNhau(datepresent,DateThongBao);
                    let Active=""
                    if(item.Active===1)
                    Active="visited"
                    if(index===0)
                    return(<React.Fragment key={index}>
                        <div className="padding-0-10 fw-500 fs-15">Mới</div>
                        <div onClick={()=>this.heandlTinNhanPhanThuong(item.Id)} noti-id={item.Id} className={`notification notification-comment flex flex-hozi-center ${Active}`}>
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
                        <div onClick={()=>this.heandlTinNhanPhanThuong(item.Id)} noti-id={item.Id} className={`notification notification-comment flex flex-hozi-center ${Active}`}>
                        <div className="avatar margin-r-5"><img src="../imge/JzGNfi6.png" alt=''/></div>
                        <div className="flex flex-column flex-1">
                            <div className="text-shortcut fw-700"><span className="color-red-2">Tin nhắn từ hệ thống</span></div>
                            <div className="text-shortcut fs-12 fw-500 margin-5-0">{item.Message}</div>
                            <div className="fs-12 fw-500 color-blue text-shortcut">{date} trước</div>
                        </div>
                        </div>
                        </React.Fragment>
                    )
                })
            }



        </div>
        </div>
        </>)
    }
    else
    return(<></>);
}
 }
export default Dropdown;