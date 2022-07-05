import React from "react";
import Duoi from "../chitiet/duoi";
import Tren from "./tren";
import Giua from "./giua";
import Api from"../Api/axios"

export default class body extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
         Anime:[],
         listServer:[],
         EpisodeNumber:{},
         listEpisodeNumber:[],
         IdServer:""
        }
        this.ClickTap=this.ClickTap.bind(this)
    }
    async loadEmployeeDataAnime (idAnime){
        try {
          const response =await Api.get('Anime/findOne/'+idAnime,
          {
              headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result[0];
            let history=JSON.parse(localStorage.getItem("watchhistory"))
            if(history!==null){
              history.forEach((element,index) => {
                if(element.IdAnime===Anime.Id)
                {
                  history.splice(index, 1)
                }
              });
              let historys={
                IdAnime:this.props.idAnime,
                EpisodeNumber:this.props.EpisodeNumber,
                Avatar:Anime.Avatar,
                IdServer:this.props.IdServer,
                NameAnime:Anime.NameAnime
              }
              history.unshift(historys)
              localStorage.setItem("watchhistory",JSON.stringify(history))

            }
            else{
              let historys=[{
                IdAnime:this.props.idAnime,
                EpisodeNumber:this.props.EpisodeNumber,
                Avatar:Anime.Avatar,
                IdServer:this.props.IdServer,
                NameAnime:Anime.NameAnime
              }]
              console.log(historys)
              localStorage.setItem("watchhistory",JSON.stringify(historys))
            }
            console.log(history)
            this.setState({ Anime:Anime });
          }
        } catch (error) {
            console.log(error)
        }

      }
    async loadEmployeeDataEpisodeNumber (IdAnime,EpisodeNumber,IdServer){
      try {
        const response =await Api.get('Episode/EpisodeSever',
        {
          params:{            
          IdAnime:IdAnime,
          EpisodeNumber:EpisodeNumber,
          IdServer:IdServer
          },
            headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }

      })
        if(response.status===200)
        {
          const EpisodeNumber = response.data.result[0];
          this.setState({ EpisodeNumber:EpisodeNumber,IdServer:IdServer });
        }
      } catch (error) {
          console.log(error)
      }

    }
    async loadEmployeeDataSever(IdAnime,EpisodeNumber){
      try {
        const response =await Api.get('Episode/ListSever',
        {
          params:{            
            IdAnime:IdAnime,
            EpisodeNumber:EpisodeNumber,
            },
            headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }

      })
        if(response.status===200)
        {
          const listServer = response.data.result;
          this.setState({ listServer:listServer });
        }
      } catch (error) {
          console.log(error)
      }

    }
    async loadEmployeeDataListEpisodeNumber(IdAnime,IdServer){
      try {
        const response =await Api.get('Episode/findItem',
        {
          params:{            
            IdAnime:IdAnime,
            IdServer:IdServer,
            },
            headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }

      })
        if(response.status===200)
        {
          const listEpisodeNumber = response.data.result;
          this.setState({ listEpisodeNumber:listEpisodeNumber,IdServer:IdServer});
        }
      } catch (error) {
          console.log(error)
      }

    }
    async componentDidMount(){
      await this.loadEmployeeDataAnime(this.props.idAnime);
      await this.loadEmployeeDataSever(this.props.idAnime,this.props.EpisodeNumber);
      await this.loadEmployeeDataEpisodeNumber(this.props.idAnime,this.props.EpisodeNumber,this.props.IdServer);
      await this.loadEmployeeDataListEpisodeNumber(this.props.idAnime,this.props.IdServer);
    }
    async ClickTap(idAnime,EpisodeNumber,IdServer){
      await this.loadEmployeeDataAnime(idAnime);
      await this.loadEmployeeDataSever(idAnime,EpisodeNumber);
      await this.loadEmployeeDataEpisodeNumber(idAnime,EpisodeNumber,IdServer);
      //await this.loadEmployeeDataListEpisodeNumber(idAnime,IdServer);
    }
    render(){
        return(
            <>
           <div className="ah_content">
    <div id="top-banner-pc">
    </div>
    <div id="top-banner-mb">
    </div>
    <div className="info-movie">
    <div className="watching-movie">
               <Tren ClickTap={this.ClickTap} Anime={this.state.Anime} listServer={this.state.listServer} IdServer={this.state.IdServer} />
               <Giua ClickTap={this.ClickTap} listEpisodeNumber={this.state.listEpisodeNumber} EpisodeNumber={this.state.EpisodeNumber}/>
            </div>
               <div id="adcontent"></div>
               <Duoi id={this.props.idAnime}/>
           </div>
           </div>
           
            </>
        );
    }
    
}