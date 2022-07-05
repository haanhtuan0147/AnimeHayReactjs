import React from "react";
import Buttonfolow from "./Loaddata/buttonfolow";
import ThongBao from "./Loaddata/ThongBao";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TheLoai from "./Loaddata/theloai";
import Api from"../Api/axios"
import { Link } from "react-router-dom";


export default class Tren extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            TrangThai:0,
            StatusButtonfolow:0,
            Follow:{},
            Star:0,
            Load:1,
            Anime:{}

        };
        this.XoaPhim=this.XoaPhim.bind(this);
        this.ThemPhim=this.ThemPhim.bind(this);
        this.ClickTrangThai=this.ClickTrangThai.bind(this);
        this.DanhGia=this.DanhGia.bind(this);
        this.ToMauStar=this.ToMauStar.bind(this);
        this.LoadFollow=this.LoadFollow.bind(this);
        this.LoadDanhGia=this.LoadDanhGia.bind(this);
    }
    async XoaPhim(){
        if(sessionStorage.getItem('Account'))
        {
            await this.LoadFollowXoa();
            /*toast.promise(
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    this.resolvePromise ? resolve(null) : reject(null);
                    this.resolvePromise = !this.resolvePromise;
                  }, 3000);
                }),
                {
                  pending: 'Promise is pending',
                  success: 'Promise resolved 👌',
                  error: 'Promise rejected 🤯'
                }
              );*/
        }
        else{
            this.props.use('/Login')
        }
        
    }
    async ThemPhim(){
        if(sessionStorage.getItem('Account'))
        {
           await this.LoadFollowThem()
        }
        else{
            this.props.use('/Login')
        }

    }
    DanhGia(){
        if(sessionStorage.getItem('Account'))
        this.ClickTrangThai(3)
        else{
            this.props.use('/Login')
        }
    }
    async LoadDanhGia(){
        try {
            const response =await Api.get('Evaluate/findevaluateAnimeAccount/'+this.props.Anime.Id,
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
                }
  
          })
            if(response.status===200)
            {
              const Star = response.data.result;
              this.setState({ Star:Star });
            }
            
          } catch (error) {
            console.log(error)
          }
    }
    ClickTrangThai(Number){
        this.setState({TrangThai:Number})
    }
    async LoadFollow(){
        try {
            const response =await Api.get('Follow/findUserOne',
            {
                params:{IdAnime:this.props.Anime.Id},
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
                }
  
          })
            if(response.status===200)
            {
              if(response.data.result.length!==0)
              {
                const Follow = response.data.result[0];
                this.setState({ Follow:Follow });
              }
            }
            
          } catch (error) {
            console.log(error)
          }
    }
    async ToMauStar(Number){
        try {
            const response =await Api.post('Evaluate/CreateAndUpDate',{IdAnime:this.props.Anime.Id,Scores:Number},
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
                }
  
          })
            if(response.status===200)
            {
              this.setState({ Star:Number,TrangThai:0});
              toast.success("Bạn Đã Đánh Giá Thành Công "+Number+" Điểm Cho Phim Xin Cám Ơn")
            }
            
          } catch (error) {
            toast.success("Bạn Đã Đánh Giá Không Thành Công "+Number+" Điểm Bạn Có Thể Thử Lại Không")
          }
    }
    async LoadFollowThem(){
        try {
            const response =await Api.post('Follow/create',{IdAnime:this.props.Anime.Id},
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
                }
  
          })
            if(response.status===200)
            {
              const Follow = response.data.Item;
              this.setState({ Follow:Follow });
              toast.success("Thêm theo dõi thành công 👌!")
            }
            
          } catch (error) {
            toast.error("Thêm theo dõi không thành công "+error)
          }
    }
    async LoadFollowXoa(){
        try {
            const response =await Api.delete('Follow/delete/'+this.state.Follow.Id,
            {
                headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
                }
  
          })
            if(response.status===200)
            {
              this.setState({ Follow:{} });
              toast.success("Xoá theo dõi thành công 👌!" )
            }
                       
          } catch (error) {
            toast.error("Xoá theo dõi không thành công !")
        }
    }
    async componentDidMount(){
      if(!sessionStorage.getItem("Account"))
      {

      }
      else{
        if(this.props.Anime.Id)
        {
          if(this.state.Load===1){
            if((this.props.Anime.Id!==this.state.Anime.Id)||!this.state.Anime.Id){
              await this.LoadFollow();
              await this.LoadDanhGia();
              this.setState({Load:0,Anime:this.props.Anime})
            }
          }
        }
      }
    }
    async componentDidUpdate(){
        if(!sessionStorage.getItem("Account"))
      {

      }
      else{
        if(this.props.Anime.Id)
        {
          if(this.state.Load===1){
            if((this.props.Anime.Id!==this.state.Anime.Id)||!this.state.Anime.Id){
              await this.LoadFollow();
              await this.LoadDanhGia();
              this.setState({Load:0,Anime:this.props.Anime})
            }
          }
        }
      }
    }
    render(){
      let xemphim
      if(this.props.Episode)
      xemphim=<Link to={`/phim/${this.props.Anime.Id}/${this.props.Episode.IdServer}/${this.props.Episode.EpisodeNumber}.html`} className="padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center bg-lochinvar" title="Xem Ngay"><span className="material-icons-round">play_circle_outline</span></Link>
      else
      xemphim=<a href="#root" className="padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center bg-lochinvar" title="Xem Ngay"><span className="material-icons-round">play_circle_outline</span></a>
        return(
            <>

    <div id="modal" className="modal" style={{display: "block", visibility: "hidden",top: "0px", transition: "top 0.3s ease 0s", left: "411px", width: "500px"}}>
    <div>
    <div>Đánh giá phim</div>
    <a href="##"><span className="material-icons-round margin-0-5">
    close
    </span></a>
    </div>
    <div>
    <div className="rated-star flex flex-hozi-center flex-ver-center">
    <span rate="1"><span className="material-icons-round">star</span></span><span rate="2"><span className="material-icons-round">star</span></span><span rate="3"><span className="material-icons-round">star</span></span><span rate="4"><span className="material-icons-round">star</span></span><span rate="5"><span className="material-icons-round">star</span></span><span rate="6"><span className="material-icons-round">star</span></span><span rate="7"><span className="material-icons-round">star</span></span><span rate="8"><span className="material-icons-round">star</span></span><span rate="9"><span className="material-icons-round">star</span></span><span rate="10"><span className="material-icons-round">star</span></span> </div>
    </div>
    </div>
    <h1 className="heading_movie">{this.props.Anime.NameAnime}</h1>
    <div className="head ah-frame-bg">
        <div className="first">
        <img src={this.props.Anime.Avatar} alt={this.props.Anime.NameAnime}/>
        </div>
        <div className="last">
            <div className="name_other">
                <div>Tên khác</div>
                <div>{this.props.Anime.NameAnime}</div>
            </div>
            <div className="list_cate">
                <div>Thể loại</div>
                <div>
                <TheLoai renderweb1={this.props.renderweb1} category={this.props.category}/>
                </div>
            </div>
            <div className="status">
                <div>Trạng thái</div>
                <div>{this.props.Anime.Status===""?"Chưa Update Trạng Thái":Number(this.props.Anime.Status)===1?"Đang tiến hành":"Hoàn thành"}</div>
            </div>
            <div className="score">
                <div>Điểm</div>
                <div>
                {Number(this.props.Anime.NumberEvaluate).toFixed(1)}||{this.props.Anime.CountNumberEvaluate} đánh giá </div>
                </div>
            <div className="update_time">
                <div>Phát hành</div>
                <div>
                {this.props.Anime.Year}</div>
            </div>
            <div className="duration">
                <div>Thời lượng</div>
                <div>
                {this.props.Anime.EpisodeNumbers} Tập </div>
            </div>
        </div>
    </div>
    <div className="flex ah-frame-bg flex-wrap">
    <div className="flex flex-wrap flex-1">
      {
        xemphim
      }
    <Buttonfolow Follow={this.state.Follow}  XoaPhim={this.XoaPhim} ThemPhim={this.ThemPhim}/>
    </div>
    <div className="last">
    <div id="rated" className="bg-orange padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center" onClick={this.DanhGia}><span className="material-icons-round">
    stars
    </span></div>
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
    <ThongBao Star={this.state.Star} TrangThai={this.state.TrangThai} ClickTrangThai={this.ClickTrangThai} ToMauStar={this.ToMauStar}/>
    </div>
    <div className="bind_movie ah-frame-bg">
        <div>
            <h2 className="heading">Phim liên kết</h2>
        </div>
        <div className="scroll-bar">
            {
                this.props.AnimePart.map((item,index)=>{
                    if(item.IdAnime===this.props.Anime.Id){
                        return(
                          <React.Fragment key={index}>
                            <a href="#root" className="active">{item.Describe}</a>
                            </React.Fragment>
                        );
                    }
                    else{
                        return(
                            <React.Fragment key={index}>
                            <Link  to={`/chitiet/${item.IdAnime}.html`} onClick={()=>this.props.Loadding(item.IdAnime)}>{item.Describe}</Link>
                            </React.Fragment>
                        );
                    }

                })
            }
        </div>
    </div>
    
    
            </>
        );
    }
    
}