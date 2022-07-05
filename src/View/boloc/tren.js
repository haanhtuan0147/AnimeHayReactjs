import React from "react";
import Api from"../Api/axios"
export default class Tren extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cateloge:[],
            Year:[2022,2021,2020],
            NumberTap:[300,200,100,50,20,10],
            Status:["Hoàn thành","Đang tiến hành"],
            TheLoai:[],
            Nam:0,
            SoTap:0,
            TrangThai:""
        }
    }
    async loadEmployeeData (){
        try {
          const response =await Api.get('Category/findAll',{
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const cateloge = response.data.result;
            let query=this.props.query
             this.setState({ cateloge:cateloge,TheLoai:query.ListCategory,
                Nam:query.Year,
                SoTap:query.EpisodeNumber,
                TrangThai:query.Status});
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async componentDidMount(){
        await this.loadEmployeeData();
    }
    onclickbocloctheloai(number){
        var khachquy=document.querySelectorAll(".condition-filter > div")[number];
        var khachquy1=document.querySelectorAll(".trigger-buttons > div")[number]
        var khachquy2=document.querySelectorAll(".trigger-buttons > div > span")[number]
        if(khachquy.style.display==="block"){
            khachquy.style.display="none";
            khachquy1.classList.remove("bg-blue");
            khachquy2.innerHTML="expand_more";
        }
        else if(khachquy.style.display==="none"||!khachquy.style.display)
        {
            khachquy.style.display="block";
            khachquy1.classList.add("bg-blue");
            khachquy2.innerHTML="expand_less";

        }
        const nodeList=document.querySelectorAll(".condition-filter > div");
        var c=0;
        for (let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].style.display==="block")
            {
                c=c+1;
            }
          }
          if(c>0)
          return document.querySelector("#filter-submit").style.display="flex";
          else
          return document.querySelector("#filter-submit").style.display="none";


    }
    async onClickXoaBoLoc(Ten,Item){
        let query={
            TheLoai:this.state.TheLoai,
            Nam:this.state.Nam,
            SoTap:this.state.SoTap,
            TrangThai:this.state.TrangThai
        }
        let theloai=query.TheLoai;
        let theloai1=[];
        if(Ten==="Nam")
        query.Nam=0
        if(Ten==="SoTap")
        query.SoTap=0
        if(Ten==="TrangThai")
        query.TrangThai=""
        if(Ten==="TheLoai")
        {
            for(let i=0;i<theloai.length;i++)
            {
                if(Item!==theloai[i])
                theloai1.push(theloai[i])
            }
        }
        await this.props.use(`/Boloc?ListCategory=${theloai1.join()}&Year=${query.Nam}&EpisodeNumber=${query.SoTap}&Status=${query.TrangThai}`)
        this.setState({
            TheLoai:theloai1,
            Nam:query.Nam,
            SoTap:query.SoTap,
            TrangThai:query.TrangThai
        })
        await this.props.onclickrender()
        //window.location.assign(`/Boloc?ListCategory=${theloai1.join()}&Year=${query.Nam}&EpisodeNumber=${query.SoTap}&Status=${query.TrangThai}`);
    }
   async onClickThemBoLocTheLoai(Ten,Item){
        let query={
            TheLoai:this.state.TheLoai,
            Nam:this.state.Nam,
            SoTap:this.state.SoTap,
            TrangThai:this.state.TrangThai
        }
        let theloai=query.TheLoai;
        if(Ten==="Nam")
        query.Nam=Item
        if(Ten==="SoTap")
        query.SoTap=Item
        if(Ten==="TrangThai")
        query.TrangThai=Item
        if(Ten==="TheLoai")
        {
            theloai.push(Item)
        }
       await this.props.use(`/Boloc?ListCategory=${this.state.TheLoai.join()}&Year=${this.state.Nam}&EpisodeNumber=${this.state.SoTap}&Status=${this.state.TrangThai}`)
        this.setState({
            TheLoai:theloai,
            Nam:query.Nam,
            SoTap:query.SoTap,
            TrangThai:query.TrangThai
        })

    }
     async clickloc(){
        await this.props.onclickrender()
        //window.location.assign(`/Boloc?ListCategory=${this.state.TheLoai.join()}&Year=${this.state.Nam}&EpisodeNumber=${this.state.SoTap}&Status=${this.state.TrangThai}`);
    }
    async componentDidUpdate(){
        if(this.props.query&&this.props.Load===1)
        {
            await this.loadEmployeeData(); 
        } 
    }
    render(){
        let trangthais
        if(this.state.TrangThai!=="")
        trangthais=<div filter-value={this.state.Status[Number(this.state.TrangThai)]} style={{backgroundColor: "rgb(58, 121, 175)"}} className="flex flex-hozi-center">{this.state.Status[Number(this.state.TrangThai)]}<span className="material-icons-round" onClick={()=>this.onClickXoaBoLoc("TrangThai",0)}>close</span></div>
        let nams
        if(this.state.Nam!==0)
        nams=<div filter-value={this.state.Nam} style={{backgroundColor: "rgb(58, 121, 175)"}} className="flex flex-hozi-center">{this.state.Nam}<span className="material-icons-round" onClick={()=>this.onClickXoaBoLoc("Nam",0)}>close</span></div>
        let SoTaps
        if(this.state.SoTap!==0)
        SoTaps=<div filter-value={this.state.SoTap} style={{backgroundColor: "rgb(58, 121, 175)"}} className="flex flex-hozi-center">{this.state.SoTap}<span className="material-icons-round" onClick={()=>this.onClickXoaBoLoc("SoTap",0)}>close</span></div>
        let TheLoais=[]
        return(
            <>
    <div className="margin-10-0 bg-gray-2">
    <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
    Trang lọc phim
    </div>
    </div> 
    <div id="filter-movie">
    <div className="trigger-buttons flex">
    <div>Thể loại<span className="material-icons-round fs-21" onClick={()=>this.onclickbocloctheloai(0)}>expand_more</span></div>
    <div>Năm<span className="material-icons-round fs-21"onClick={()=>this.onclickbocloctheloai(1)}>expand_more</span></div>
    <div>Số tập<span className="material-icons-round fs-21"onClick={()=>this.onclickbocloctheloai(2)}>expand_more</span></div>
    <div>Trạng thái<span className="material-icons-round fs-21"onClick={()=>this.onclickbocloctheloai(3)}>expand_more</span></div>
    </div>
    <div className="condition-filter">
    <div>
    <div className=" fw-500 margin-5-0">Thể loại</div>
    <div className="flex flex-wrap">
        {
            this.state.cateloge.map((item,index)=>{
                let checktheloai=this.state.TheLoai
                //console.log(">>>>>>>",this.state.TheLoai)
                for(let i=0;i<checktheloai.length;i++)
                {
                    if(checktheloai[i]===item.Id){
                        TheLoais.push({Id:item.Id,Ten:item.NameCategory})
                        return(
                            <React.Fragment key={index}>
                                    <div filter-value={item.Id} title={item.Describe} style={{backgroundColor:"rgb(58, 121, 175)"}}>{item.NameCategory}</div>
                            </React.Fragment>
                        )
                    }
                }
                return(
                    <React.Fragment key={index}>
                            <div filter-value={item.Id} title={item.Describe} onClick={()=>this.onClickThemBoLocTheLoai("TheLoai",item.Id)}>{item.NameCategory}</div>
                    </React.Fragment>
                )
                
            })
        }
    
    </div>
    </div>  
    <div>
    <div className="fw-500 margin-5-0">Năm phát hành</div>
    <div className="flex flex-wrap">
        {
            
            this.state.Year.map((item,index)=>{
                let Year=this.state.Nam
                    if(Year===item){
                        return(
                            <React.Fragment key={index}>
                                    <div filter-value={item} style={{backgroundColor:"rgb(58, 121, 175)"}}>{item}</div>
                            </React.Fragment>
                        )
                    }
                return(
                    <React.Fragment key={index}>
                                    <div filter-value={item} onClick={()=>this.onClickThemBoLocTheLoai("Nam",item)}>{item}</div>
                    </React.Fragment>
                )
                
            })
        }
    </div>
    </div>
    <div>
    <div className="fw-500 margin-5-0">Số tập ít nhất</div>
    <div className="flex flex-wrap">
        {
            
            this.state.NumberTap.map((item,index)=>{
                let NumberTap=this.state.SoTap
                    if(NumberTap===item){
                        return(
                            <React.Fragment key={index}>
                                    <div filter-value={item} style={{backgroundColor:"rgb(58, 121, 175)"}}>{item}</div>
                            </React.Fragment>
                        )
                    }
                return(
                    <React.Fragment key={index}>
                                    <div filter-value={item} onClick={()=>this.onClickThemBoLocTheLoai("SoTap",item)}>{item}</div>
                    </React.Fragment>
                )
                
            })
        }
    </div>
    </div>
    <div>
    <div className="fw-500 margin-5-0">Trạng thái</div>
    <div className="flex flex-wrap">
        {
            
            this.state.Status.map((item,index)=>{
                let Status=this.state.TrangThai
                    if(Number(Status)===index&&Status!==""){
                        return(
                            <React.Fragment key={index}>
                                    <div filter-value={item} style={{backgroundColor:"rgb(58, 121, 175)"}}>{item}</div>
                            </React.Fragment>
                        )
                    }
                return(
                    <React.Fragment key={index}>
                                    <div filter-value={item} onClick={()=>this.onClickThemBoLocTheLoai("TrangThai",index)}>{item}</div>
                    </React.Fragment>
                )
                
            })
        }
    </div>
    </div>
    </div>
    <div id="filter-submit" className="display-none flex-ver-center" >
    <div className="button-default padding-10-20 bg-red margin-10-0 flex fw-500 flex-hozi-center" onClick={()=>this.clickloc()}>
    <span className="material-icons-round margin-r-5">filter_alt</span>
    <span>Lọc</span>
    </div>
    </div>    
    </div>
    <div id="filtering" className="flex">
    {
       trangthais
    }
    {
        nams
    }
    {
        SoTaps
    }
    {
        TheLoais.map((item,index)=>{
            return(
                <React.Fragment key={index}>
                 <div filter-value={item.Id} style={{backgroundColor: "rgb(58, 121, 175)"}} className="flex flex-hozi-center">{item.Ten}<span className="material-icons-round" onClick={()=>this.onClickXoaBoLoc("TheLoai",item.Id)}>close</span></div>
                </React.Fragment>
            )
        })
    }
    </div>
            </>
        );
    }
    
}