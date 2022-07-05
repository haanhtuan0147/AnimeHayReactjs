import React from 'react';
import Dropdown from './Login/Loaddata/dropdown';
import ItemLogin from './Login/Loaddata/ItemLogin';
import Api from"./Api/axios"
import FindSearch from './FindSearch';
import { Link } from "react-router-dom";



export default class head extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            name:"",
            icon:"Null",
            ThongBao:[],
            NumberThongBao:0,
            SearchAnime:[],
            cateloge:[]
        }
        this.clickEventDropDown=this.clickEventDropDown.bind(this);
        this.hendlCloseSearch=this.hendlCloseSearch.bind(this);
    }

    Clicktheloai(id,bind){
        //alert(id,bind)
        if(id==="theloai02"){
            document.getElementById("theloai02").classList.add("active");
           document.getElementById("tab-cate").classList.add("display-block");
           document.getElementById("theloai01").classList.remove("active");
           document.getElementById("tab-years").classList.remove("display-block");
        }
        else{
            document.getElementById("theloai01").classList.add("active");
            document.getElementById("tab-years").classList.add("display-block");
           document.getElementById("theloai02").classList.remove("active");
           document.getElementById("tab-cate").classList.remove("display-block");
        }
        

    }
     async loadEmployeeNumbernotifications (){
        try {
          const response =await Api.get('MessegaAccount/findUserNumber',{headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }
        })
          if(response.status===200)
          {
            const NumberThongBao = response.data.result;
             this.setState({ NumberThongBao:Number(NumberThongBao) });
          }
          
        } catch (error) {
          console.log(error)
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
      async loadEmployeeSearchAnime (Name){
        try {
          const response =await Api.get('Anime/FindName',{
            params:{
              name:Name,
              sart:0,
              end:10,
            },
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }
        })
          if(response.status===200)
          {
            const SearchAnime = response.data.result;
             this.setState({ SearchAnime:SearchAnime,name:Name});
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async clickEventDropDown(this_dropdown1,icon_default1="Null") {
        //alert(this_dropdown1)
        //alert(this.state.name);
        var this_dropdown=document.getElementById(this_dropdown1);
        var icon_default=icon_default1;
        var _name = this_dropdown.getAttribute("bind");
        var _dropdown_menu = document.getElementById(_name);
        if (!_dropdown_menu.style.display || _dropdown_menu.style.display === "none") {
            this_dropdown.innerHTML = `<span class="material-icons-round">highlight_off</span>`;
            if (icon_default !== "expand_more") {
                this_dropdown.style.backgroundColor = "#ab3e3e";
            }
            _dropdown_menu.style.display = "flex";
            setTimeout(function() {
                _dropdown_menu.style.transform = "scale(1)";
            }, 50)
        } else {
            _dropdown_menu.style = null;
            this_dropdown.style = null;
            this_dropdown.innerHTML = `<span class="material-icons-round">${icon_default}</span>`;
        }
        if(icon_default1==="notifications"&&this.state.ThongBao.length===0){
            await this.loadEmployeenotifications()
        }
    }
    async loadEmployeeDataCategory (){
      try {
        const response =await Api.get('Category/findAll',{
          headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }

      })
        if(response.status===200)
        {
          const cateloge = response.data.result;
           this.setState({ cateloge:cateloge });
        }
        
      } catch (error) {
        console.log(error)
      }

    }
    async loadEmployeeTimeOnline (){
      try {
        const response =await Api.post('TimeOnline/TimeOnline',{Time:1},{headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization':'Bearer '+sessionStorage.getItem('Token')
        }
      })
        if(response.status===200)
        {
          const status = response.data.status;
          if(status===1){
            this.props.renderweb1()
          }
        }
        
      } catch (error) {
        console.log(error)
      }

    }
    async componentDidMount(){
      if(sessionStorage.getItem('Account')&&this.props.Load===1)
      {
        await this.loadEmployeeNumbernotifications();
        this.props.renderweb0()
      }
      if(sessionStorage.getItem('Account')){
        this.TimeOut=setInterval( async()=>{await this.loadEmployeeTimeOnline()},60000)
      }
      await this.loadEmployeeDataCategory();
    }
    async heandlsearch(event){
      event.preventDefault();
      let name=this.state.name;
      //window.location.assign(`/Boloc?name=${name}`);
      await this.props.use(`/Boloc?name=${name}`);
      await this.props.renderweb1();
      await this.hendlCloseSearch();
    }
    async heandlchangesearch(event){
      await this.loadEmployeeSearchAnime(event.target.value)
    }
    async hendlCloseSearch(){
      this.setState({
        SearchAnime:[],
        name:""
      });
    }
    async renderweb1(){
      await this.props.renderweb1();
    }
    async componentDidUpdate(){
      if(sessionStorage.getItem('Account')&&this.props.Load===1)
      {
        await this.loadEmployeeNumbernotifications();
        this.props.renderweb0()
      }
      if(sessionStorage.getItem('Account')){
        clearInterval(this.TimeOut)
        this.TimeOut=setInterval( async()=>{await this.loadEmployeeTimeOnline()},60000)
      }
      if(!sessionStorage.getItem('Account')&&this.props.Load===1){
        this.props.renderweb0()
      }
    }
     render(){
        return (
            <>
    <div id="navbar">
        <div className="flex flex-hozi-center padding-10">
            <div className="logo">
              <Link to="/"><img src="http://localhost:3000/imge/logo.png" alt="logo animehay"/></Link>
            </div>
            <div id="drop-down-4" className="search-bar flex flex-1 margin-0-10 flex-ver-center">
            <form onSubmit={(event)=>this.heandlsearch(event)} className="flex" id="form-search">
            <input type="text" placeholder="Nhập từ khoá..." className="padding-10 bg-black color-gray" name="keyword" onChange={(event)=>this.heandlchangesearch(event)}/>
            <button type="submit" className="flex flex-hozi-center bg-black color-gray"><span className="material-icons-round">
            search
            </span></button>
            </form>
            </div>
            <div className="nav-items flex-wrap flex">
                <a href="##" onClick={()=>{this.clickEventDropDown("124ooo" ,"search")}} id="124ooo" className="toggle-search toggle-dropdown" bind="drop-down-4">
                <span className="material-icons-round">
                search
                </span>
                </a>
                <a href="##" onClick={()=>{this.clickEventDropDown("123ooo","reorder")}} id="123ooo" className="toggle-dropdown" bind="drop-down-1">
                <span className="material-icons-round">
                reorder
                </span>
                </a>
                <Link to="/LichSu"><span className="material-icons-round">
                history
                </span></Link>
                <ItemLogin NumberThongBao={this.state.NumberThongBao} clickEventDropDown={this.clickEventDropDown}/>
            </div>
        </div>
        <div id="drop-down-1" className="dropdown-menu bg-black w-100-percent flex-column">
            <div className="tab-links flex-1">
            <a href="##" className="item-tab-link active" id="theloai02"onClick={()=>{this.Clicktheloai("theloai02","tab-cate")}} bind="tab-cate"><span className="material-icons-round margin-0-5">
            category
            </span>Thể loại</a>
            <a href="##" className="item-tab-link"id="theloai01" bind="tab-years" onClick={()=>{this.Clicktheloai("theloai01","tab-years")}}><span className="material-icons-round margin-0-5">
            auto_awesome
            </span>Năm</a>
            <Link onClick={()=>{this.clickEventDropDown("123ooo","reorder")}} to="/Boloc" className="item-tab-link"><span className="material-icons-round margin-0-5">
            filter_alt
            </span>Lọc phim</Link>
            </div>
            <div className="tab-content">
            <div id="tab-cate" className="item-tab-content display-block">
            <div className="flex flex-wrap">
              {
                 this.state.cateloge.map((item,index)=>{
                  return(
                    <React.Fragment key={index}>
                    <Link  to={`/Boloc?ListCategory=${item.Id}`} onClick={()=>{this.renderweb1();this.clickEventDropDown("123ooo","reorder")}} title={`Thể loại ${item.NameCategory}`}>{item.NameCategory}</Link>
                    </React.Fragment>
                  )
                 })
              }
            </div>
            </div>
            <div id="tab-years" className="item-tab-content">
            <div className="flex flex-wrap">
            <Link  onClick={()=>{this.renderweb1();this.clickEventDropDown("123ooo","reorder")}} to="/Boloc?Year=2020">2022</Link>
            <Link  onClick={()=>{this.renderweb1();this.clickEventDropDown("123ooo","reorder")}} to="/Boloc?Year=2021">2021</Link>
            <Link  onClick={()=>{this.renderweb1();this.clickEventDropDown("123ooo","reorder")}} to="/Boloc?Year=2020">2020</Link>
            </div>
            </div>
            </div>
        </div>
        <Dropdown renderweb1={this.props.renderweb1} use={this.props.use}  ThongBao={this.state.ThongBao}/>
        <FindSearch renderweb1={this.props.renderweb1} renderweb0={this.props.renderweb0} researchAnime={this.props.researchAnime} Search={this.state.SearchAnime} CloseSearch={this.hendlCloseSearch}/>             
    </div>
            </>
        );

    }
}