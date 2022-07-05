import React from "react";
import Duoi from "./duoi";
import Tren from "./tren";
import Page from '../index/loaddata/thanhpage'
import Api from"../Api/axios"
export default class body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            limit:20,
            page:1,
            Anime:[],
            numberAnime:1,
            Load:0,
            query:{
              ListCategory:[],
               Year:0,
               EpisodeNumber:0,
               Status:""
            },
            querynguyenthuy:{}
        }
        this.changepage=this.changepage.bind(this);
        this.goPage=this.goPage.bind(this);
        this.toggleGoPage=this.toggleGoPage.bind(this);
        this.onclickrender=this.onclickrender.bind(this)
    }
    async componentDidMount(){
        if(this.props.query.name)
        {
            await this.loadEmployeeDataName(this.props.query.name);
            await this.countpageName(this.props.query.name);
        }
        else{
          await this.loadEmployeeDataFindNLSY(!this.props.query.ListCategory?"":this.props.query.ListCategory,!this.props.query.Year?0:this.props.query.Year,!this.props.query.EpisodeNumber?0:this.props.query.EpisodeNumber,!this.props.query.Status?"":this.props.query.Status);
          await this.countpageFindNLSY(!this.props.query.ListCategory?"":this.props.query.ListCategory,!this.props.query.Year?0:this.props.query.Year,!this.props.query.EpisodeNumber?0:this.props.query.EpisodeNumber,!this.props.query.Status?"":this.props.query.Status);
        }
    }
    async loadEmployeeDataFindNLSY (ListCategory="",Year=0,EpisodeNumber=0,Status=""){
        try {
          let page=0
          let sosanh=this.shallowEqual(this.props.query,this.state.querynguyenthuy)
          if(sosanh){
            page=this.state.page-1
          }
          const response =await Api.get('Anime/FindNLSY',
          {
            params:{
            ListCategory:ListCategory,
            Year:Year,
            EpisodeNumber:EpisodeNumber,
            Status:Status,
            sart:page*this.state.limit,
            end:this.state.limit
          },headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result;
            let ListCategorys;
            if(ListCategory==="")
            ListCategorys=[];
            else
            ListCategorys=ListCategory.split(",");
            if(!sosanh){
              this.setState({ Anime:Anime,Load:1,
                query:{
                 ListCategory:ListCategorys,
                 Year:Number(Year),
                 EpisodeNumber:Number(EpisodeNumber),
                 Status:Status
                },querynguyenthuy:this.props.query,page:1});
            }
            else{
              this.setState({ Anime:Anime,Load:1,
                query:{
                 ListCategory:ListCategorys,
                 Year:Number(Year),
                 EpisodeNumber:Number(EpisodeNumber),
                 Status:Status
                },querynguyenthuy:this.props.query});
            }
             
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async countpageFindNLSY (ListCategory="",Year=0,EpisodeNumber=0,Status=""){
        try {
            const response =await Api.get('Anime/FindNLSYcount',{
                params:{
                    ListCategory:ListCategory,
                    Year:Year,
                    EpisodeNumber:EpisodeNumber,
                    Status:Status
                  },
                headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
          if(response.status===200)
          {
            const number = await response.data.result.number;
             this.setState({ numberAnime:Math.ceil(number/this.state.limit),Load:1
            });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async loadEmployeeDataName (name){
        try {
          let page=0
          let sosanh=await this.shallowEqual(this.props.query,this.state.querynguyenthuy)
          if(sosanh){
            page=this.state.page-1
          }
          const response =await Api.get('Anime/FindName',
          {
            params:{
            name:name,
            sart:page*this.state.limit,
            end:this.state.limit
          },headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result;
            if(!sosanh){
              this.setState({ Anime:Anime,Load:1,querynguyenthuy:this.props.query,page:1});
            }
            else{
              this.setState({ Anime:Anime,Load:1,querynguyenthuy:this.props.query});
            }
             
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async countpageName (name){
        try {
            const response =await Api.get('Anime/FindNameCount/'+name,{
                headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
          if(response.status===200)
          {
            const number = await response.data.result[0].number;
             this.setState({ numberAnime:Math.ceil(number/this.state.limit),Load:1
            });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
      async changepage(number){
      await this.props.onclickrender()
        this.setState({
            page:number,
            Load:1
        })
    }
    async onclickrender(){
      this.setState({
        page:1,
        Load:1
    });
    await this.props.onclickrender()
    }
    async goPage(event){
        var number=Number(document.getElementById("go_page").value)
        if(number<=0)
        alert("Mời Bạn Nhập Lại Số Lớn Hơn 0")
        else
        {
          await this.props.onclickrender()
          this.setState({
              page:number,
              Load:1
          })
        }
        event.preventDefault()        
    }
    toggleGoPage(e){
        var gopage=document.querySelector(".go_page");
        if(gopage.style.display==="none")
        {
          gopage.style.display="flex";
          e.target.style="background-color: #4caf50"
        }
        else
        {
          gopage.style.display="none";
          e.target.style="background-color: #a54f4f"
        }
    }
    /*shouldComponentUpdate(){
        if(this.props.Load===0)
        {
          return false;
        }
        else
        {
          return true
        }
      }*/
    async componentDidUpdate(){
      if(this.props.query&&this.props.Load===1)
      {
        if(this.props.query.name)
        {
            await this.loadEmployeeDataName(this.props.query.name);
            await this.countpageName(this.props.query.name);
        }
        else{
          await this.loadEmployeeDataFindNLSY(!this.props.query.ListCategory?"":this.props.query.ListCategory,!this.props.query.Year?0:this.props.query.Year,!this.props.query.EpisodeNumber?0:this.props.query.EpisodeNumber,!this.props.query.Status?"":this.props.query.Status);
          await this.countpageFindNLSY(!this.props.query.ListCategory?"":this.props.query.ListCategory,!this.props.query.Year?0:this.props.query.Year,!this.props.query.EpisodeNumber?0:this.props.query.EpisodeNumber,!this.props.query.Status?"":this.props.query.Status);
        }
        //this.setState({Load:0})
        await this.props.onclickrender1()
      }

    }
    shallowEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }
      return true;
    }
    
    render(){
        return(
            <>
           <div className="ah_content">
           <div id="filter-page">
               <Tren Load={this.props.Load} query={this.state.query} use={this.props.use} onclickrender={this.onclickrender} />
               <Duoi Animes={this.state.Anime}/>
           </div>
           <Page goPage={this.goPage} toggleGoPage={this.toggleGoPage} changepage={this.changepage} countpage={this.state.numberAnime} page={this.state.page}/>
           </div>
            </>
        );
    }
    
}