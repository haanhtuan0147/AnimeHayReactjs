import React from "react";
import Page from "./loaddata/thanhpage"
import DanhSach from "./loaddata/danhsach";
import Api from"../Api/axios"


export default class DanhSachAnime extends React.Component{
    constructor(props){
        super(props);
        this.state={
            limit:20,
            page:1,
            Anime:[],
            numberAnime:0,
            Load:0
        };
        this.changepage=this.changepage.bind(this);
        this.goPage=this.goPage.bind(this);
        this.toggleGoPage=this.toggleGoPage.bind(this);
    }
    async loadEmployeeData (number){
        try {
          const response =await Api.get('Anime/Page',{params:{
            sart:(number-1)*this.state.limit,
            end:this.state.limit
          },headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result;
            //console.log(response)
            //console.log("đã chạy")
             this.setState({ Anime:Anime ,Load:1 });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
      async countpage (){
        try {
            const response =await Api.get('Anime/Pagecount',{headers: {
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
        this.setState({
            page:number,
            Load:1
        })
        await this.loadEmployeeData(number);
    }
    async goPage(event){
        event.preventDefault()        
        var number=Number(document.getElementById("go_page").value)
        if(number<=0)
        alert("Mời Bạn Nhập Lại Số Lớn Hơn 0")
        else
        {
          this.setState({
            page:number,
            Load:1
        })
          await this.loadEmployeeData(number);
        }
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
    async componentDidMount() {
      await this.loadEmployeeData(this.state.page);
      await this.countpage();
    }

    render(){
        return(
            <>
            <DanhSach Anime={this.state.Anime}/>
            <Page goPage={this.goPage} toggleGoPage={this.toggleGoPage} changepage={this.changepage} countpage={this.state.numberAnime} page={this.state.page}/>
            </>
        );
    }
    
}