import React from "react";
import Decu from "./decu";
import DanhSachAnime from "./danhsachanime";
import Api from"../Api/axios"
export default class body extends React.PureComponent{
    constructor(props){
        super(props);
        this.state= {
            Anime: [],
            end:17,
            With:0
          }
          this.loadEmployeeData=this.loadEmployeeData.bind(this)
        }
        async loadEmployeeData (){
          try {
            const response =await Api.get('Anime/Page',{params:{
              sart:0,
              end:this.state.end
            },headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }

          })
            if(response.status===200)
            {
              const Anime = response.data.result;
               this.setState({ Anime:Anime });
            }
            
          } catch (error) {
            console.log(error)
          }

        }
      async componentDidMount() {
        await this.loadEmployeeData()
      }
      componentDidUpdate(){
        let documentWidth = window.innerWidth;
        (documentWidth > 1000) ? this.setState({With:220}):this.setState({With:(220/1100)*documentWidth});
        
      }
    render(){
      //(documentWidth < 768) ? this.setState({With:200}):this.setState({With:(220/1100)*documentWidth});
        return(
            <>
           <div className="ah_content">
               <Decu Animes={this.state.Anime} end={this.state.end} width={this.state.With} />
               <DanhSachAnime/>
           </div>
            </>
        );
    }
    
}