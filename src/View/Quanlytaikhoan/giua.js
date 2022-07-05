import React from "react";
import '../../css/croppie.css';
import FormData from"form-data";
import Api from"../Api/axios";
import { Link } from "react-router-dom";



export default class Giua extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }

    }
    clickUploadImge(){
        document.getElementById("modal").style.visibility="visible"
    }
    clickdisUploadImge(){
        document.getElementById("modal").style.visibility="hidden"
    }
    onFileChange(event){
        console.log(">>>>>>>>>>>file",event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] }); 
    }
    async onFileUpload(){
        
        //console.log(this.state.selectedFile);
        try {
            var cccc= new FormData();
            cccc.append("file",this.state.selectedFile);
            cccc.append("tuan","2342");
           
            const response = await Api.post("/uploadfile",cccc,{
                headers:  { 
                    "Content-Type": "application/json ;charset=UTF-8",
                    "content-Type": "text/plain"
                },
              })
            if(response.status===200)
            {
              await this.props.handleChangeAvatar(response.data.message)
            }
          } catch (error) {
              console.log(error)
          }
    }
    
    render(){
        return(
            <>
    <div className="flex">
    <div className="list-menu-account flex-column bg-black" style={{display: "inline-block"}}>
    <Link to="/QuanLytaikhoan" className="flex flex-hozi-center active"><span className="material-icons-round margin-0-5">
    account_box
    </span><div className="name-menu">Hồ sơ</div></Link>
    {
        /*
         <a href="https://animehay.club/tai-khoan/nap-xu" className="flex flex-hozi-center "><span className="material-icons-round margin-0-5">
        price_change
        </span><div className="name-menu">Nạp xu</div></a>
        <a href="https://animehay.club/tai-khoan/lich-su-giao-dich" className="flex flex-hozi-center "><span className="material-icons-round margin-0-5">
        receipt_long
        </span><div className="name-menu">Lịch sử giao dịch</div></a>
        <a href="https://animehay.club/tai-khoan/cua-hang" className="flex flex-hozi-center "><span className="material-icons-round margin-0-5">
        store
        </span><div className="name-menu">Cửa hàng</div></a> 
        */
    }
    </div>
    <div className="flex-1">
    <link href="./Trang quản lí tài khoản __ AnimeHay_files/croppie.css" rel="stylesheet"/>
    <div id="user-profile">
    <div id="modal" className="modal" style={{display: "block", visibility: "hidden", transition: "top 0.3s ease 0s",width:"500px",top:"25%",left:"35%"}}>
    <div>
    <div>Tải lên ảnh đại diện</div>
    <a href="##" onClick={()=>this.clickdisUploadImge()}><span className="material-icons-round margin-0-5">
    close
    </span></a>
    </div>
    <div className="upload-area">
    <div className="fallback">
    {/*<div id="show-image-upload" style={{display: "block"}} className="croppie-container">
        <div id="cr-boundary" aria-dropeffect="none" style={{width:"200px",height:"200px"}}>
            <img src="https://xuconcept.com/wp-content/uploads/2021/11/tai-hinh-nen-mien-phi.jpg" classNameName="cr-image cr-viewport cr-vp-square" style={{opacity: 1,width:"200px",height:"200px"}} aria-grabbed="false" alt="sda"/>
            <div className="cr-viewport cr-vp-square" tabindex="0" style={{width: "150px", height: "150px"}}></div>
            <div className="cr-overlay" style={{width: "260.452px", height: "273.44px", top: "7.7742px", left: "-23.2258px"}}></div>
        </div>
        <div className="cr-slider-wrap"><input className="cr-slider" type="range" step="0.0001" aria-label="zoom" min="0.2021" max="1.5000" aria-valuenow="0.3418"/></div>
    </div>*/}
    <input name="file" type="file" id="upload-avatar" onChange={(event)=>this.onFileChange(event)}/>
    <div className="option-avatar">
    </div>
    <div className="flex flex-ver-center" style={{display: "block"}}>
        <div className="button-default bg-red color-white">
            Đồng ý
            </div>
            <div className="button-default color-white">
                Huỷ
                </div>
                </div>
    <div className="button-default padding-10-20 bg-red color-white" id="select-avatar" onClick={()=>this.onFileUpload()}>
                    <span className="material-icons-round margin-0-5">
    cloud_upload
    </span> Tải ảnh lên</div>
    <div className="fw-500 margin-t-10">Upload ảnh 18+ sẽ bị khoá nick ngay lập tức</div>
    </div>
    </div>
    </div>
    {
        <form onSubmit={(event)=>this.props.handleSubmit(event)} id="form-user-profile" className="ah-frame-bg border-radius-0">
        <div className="flex flex-column">
        <div className="left flex flex-ver-center">
        <div className="avatar flex flex-column flex-hozi-center">
        <img src={this.props.TaiKhoan.Avatar} alt="âfs"/>
        <div className="level-user margin-t-5">
        <span>Lv.{this.props.TaiKhoan.Leve}</span>
        </div>
        <div className="button-default margin-t-10" onClick={()=>this.clickUploadImge()}>
        Thay Avatar
        </div>
        </div>
        </div>
        <div className="right margin-l-5 flex-1">
        <div className="input-zero"><div className="label">Biệt danh
        </div>
        <div>
            <input name="nickname" onChange={(event)=>this.props.handleChangeName(event)} value={this.props.TaiKhoan.NickName} type="text" placeholder="Nhập biệt danh của bạn"/>
            </div>
            </div> 
            <div className="input-zero">
                <div className="label">Châm ngôn
                </div>
                <div>
                    <input name="quote" onChange={(event)=>this.props.handleChangeMaxim(event)}  value={this.props.TaiKhoan.Maxim} type="text"/>
                        </div>
            </div> 
            <div className="input-zero">
                <div className="label">Email</div>
                <div>
                    <input name="email" value={this.props.TaiKhoan.Email} type="email" placeholder="Nhập email của bạn" disabled/>
                        </div>
                        </div> 
            <div className="input-zero">
            <div className="label">
                Ngày tham gia
                </div>
                <div>
                    <input name="joined_time" value={this.props.TaiKhoan.CreateDate} type="text" placeholder="Nhập biệt danh của bạn" disabled/>
                    </div>
                    </div>
        <div className="input-zero">
            <div className="label">Kinh nghiệm
            </div>
            <div>
                <input name="exp" value={this.props.TaiKhoan.Experience} type="text" disabled/>
                    </div>
                    </div> 
             </div>
        </div>
        <div className="flex flex-ver-center">
        <button type="submit" className="button-default bg-red color-white"><span className="material-icons-round margin-0-5">
        save
        </span>Lưu</button>
        </div>
        </form>
    }
    
    <div id="message-line"></div></div>
    </div>
    </div>
            </>
        );
    }
    
}