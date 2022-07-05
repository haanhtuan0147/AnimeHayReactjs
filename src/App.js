import React from 'react'
import {Routes, Route,useNavigate,useParams} from 'react-router-dom'
import Bolocs from './View/Boloc';
import Chitiet from './View/chitiet';
import Index from './View/index';
import FolowAnime from './View/Folow';
import Login from './View/Login';
import Phim from './View/Phim';
import QuanLytaikhoan from './View/Quanlytaikhoan';
import Thongbao from './View/thongbao';
import TinNhanPhanThuong from './View/TinNhanPhanThuong';
import LichSu from './View/Lichsu';
import NotFund from './View/NotFund';
import Head from './View/head';
import Food from './View/food';
import { ToastContainer , toast } from 'react-toastify';
import Register from './View/register';
import DoiMatKhau from './View/DoiMatKhau';







function App(){
    let use=useNavigate()
    let useParam=useParams()
    return(<>
    <App1 use={use} useParam={useParam}/>
    </>)
}
 class App1 extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            IdAnime:0,
            Load:1
        };
        this.researchAnime=this.researchAnime.bind(this);
        this.renderweb1=this.renderweb1.bind(this);
        this.renderweb0=this.renderweb0.bind(this);
    }
    onclickngaydem(){
        var a= document.querySelector("#demngay");
        a.classList.remove("light-off")
    }
    researchAnime(id){
        this.setState({
            IdAnime:id
        });
    }
    renderweb0(){
        this.setState({
            Load:0
        });
    }
    renderweb1(){
        this.setState({
            Load:1
        });
    }
    render(){
        if(Number(sessionStorage.getItem("StatusLogin"))===1){
            toast.success("Login Thành Công Mời Bạn Trải Nghiệm Xem Phim Anime Với Web Của Chúng Tôi 👌!" );
            sessionStorage.setItem("StatusLogin",0)
        }
        let quanLytaikhoan
        let thongbao
        let tinNhanPhanThuong
        let folowAnime
        let login
        let register
        let doimatkhau
        if(sessionStorage.getItem('Token'))
        {
            quanLytaikhoan=<Route path = "/QuanLytaikhoan" element = {<QuanLytaikhoan/>} />;
            thongbao=<Route path = "/Thongbao" element = {<Thongbao use={this.props.use}/>} />;
            tinNhanPhanThuong=<Route path = "/TinNhanPhanThuong/:id" element = {<TinNhanPhanThuong use={this.props.use} Load={this.state.Load} renderweb1={this.renderweb1} renderweb0={this.renderweb0}/>}  />;
            folowAnime=<Route path = "/FolowAnime" element = {<FolowAnime use={this.props.use}/>} />;
            doimatkhau=<Route path='/DoiMatKhau' element={<DoiMatKhau/>}/>
        }
        else{
            login=<Route path = "/Login" element = {<Login use={this.props.use} renderweb1={this.renderweb1} renderweb0={this.renderweb0}/>}  />;
            register=<Route path = "/Register" element = {<Register use={this.props.use} />}  />;
        }
        return (
            <>
            <div  onDoubleClick={()=>this.onclickngaydem()} >
            <div id="fb-root"></div>
            <div id="ah_wrapper">
            <Head Load={this.state.Load} researchAnime={this.researchAnime} use={this.props.use} renderweb1={this.renderweb1} renderweb0={this.renderweb0}/>
             <Routes>
             <Route exact  path = "/" element = {<Index/>} />
             <Route path = "/chitiet/:id" element = {<Chitiet Load={this.state.Load} renderweb1={this.renderweb1} renderweb0={this.renderweb0} id={this.state.IdAnime} use={this.props.use}/>} />
             <Route path = "/Phim/:idAnime/:IdServer/:EpisodeNumber" element = {<Phim/>} />
             <Route path = "/Boloc" element = {<Bolocs Load={this.state.Load} renderweb1={this.renderweb1} renderweb0={this.renderweb0}   useParam={this.props.useParam} use={this.props.use}/>} />
             <Route path = "/LichSu" element = {<LichSu/>}  />
             <Route path = "/NotFund" element = {<NotFund Load={this.state.Load}/>}  />
             {
                quanLytaikhoan
             }
             {
                thongbao
             }
             {
                tinNhanPhanThuong
             }
             {
                folowAnime
             }
             {
                login
             }
             {
                register
             }
             {
                doimatkhau
             }
             <Route path = "*" element = {<NotFund Load={this.state.Load}/>} />
             </Routes>
             <Food/>
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
            <div id="demngay"></div>
            </div>
            </>
        )
    }
    
}
export default App;