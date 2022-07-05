import React from "react";
import Duoi from "./duoi";
import Tren from "./tren";
import Giua from "./giua";
import Api from"../Api/axios"


export default class body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Anime:{},
            AnimePart:[],
            Episode:[],
            Load:0,
            IdAnime:""
                  }
        this.Loadding=this.Loadding.bind(this);
    }
    async loadEmployeeDataAnime (IdAnime){
        try {
          const response =await Api.get('Anime/findOne/'+IdAnime,
          {
              headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result[0];
            let category=(Anime.ListCategory).split(" ")
            Anime.ListCategory=category
            this.setState({ Anime:Anime,IdAnime:IdAnime});
          }
        } catch (error) {
            console.log(error)
        }

      }
    
    async loadEmployeeDataAnimePart (IdAnime){
        try {
          const response =await Api.get('AnimePart/FindFollowIdAnime/'+IdAnime,
          {
              headers: {
            'Content-Type': 'application/json;charset=utf-8'
              }

        })
          if(response.status===200)
          {
            const AnimePart = response.data.result;
            this.setState({ AnimePart:AnimePart });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async loadEmployeeDataAnimeEpisode (IdAnime){
        try {
          const response =await Api.get('Episode/findItemdis',
          {
              params:{IdAnime:IdAnime},
              headers: {
            'Content-Type': 'application/json;charset=utf-8'
              }

        })
          if(response.status===200)
          {
            const AnimeEpisode = response.data.result;
            this.setState({ Episode:AnimeEpisode });
          }
          
        } catch (error) {
          console.log(error)
        }

      }

      async componentDidMount() {
        await this.callback(async (res)=>{
        })
      ;
    }
    async callback(fu){
        let id;
        const search = (window.location.href).split('/');
        const concatid=search[search.length-1].split('.');
        id=concatid[0];
        //console.log(id)
        await this.loadEmployeeDataAnimePart(id);
        await this.loadEmployeeDataAnime(id);
        await this.loadEmployeeDataAnimeEpisode(id);
        //await this.props.renderweb0()
        fu();
    }
    async Loadding(Id){
      //await this.props.renderweb1();
      //await this.props.Loadding();
      await this.loadEmployeeDataAnimePart(Id);
      await this.loadEmployeeDataAnime(Id);
      await this.loadEmployeeDataAnimeEpisode(Id);
    }
    async componentDidUpdate(){
      if(this.props.Load===1){
        await this.callback(async (res)=>{
        });
        await this.props.renderweb0()
    }
      
    }
    /*async componentDidUpdate(){
      await this.callback(async (res)=>{
      })
    ;
    }
    async shouldComponentUpdate(){
      if(this.state.IdAnime===this.props.id&&this.props.Load===1)
      {
        await this.props.renderweb0()
        return false;
      }
      if(this.state.IdAnime!==this.props.id)
      {
        await this.props.renderweb1()
      }
      return true
    }*/
    render(){
        return(
            <>
           <div className="ah_content">
            <div id="top-banner-pc">
            </div>
            <div id="top-banner-mb">
            </div>
            <div className="info-movie">
               <Tren renderweb1={this.props.renderweb1} Loadding={this.Loadding} Episode={this.state.Episode[this.state.Episode.length-1]} Anime={this.state.Anime} category={this.state.Anime.ListCategory} AnimePart={this.state.AnimePart} use={this.props.use}/>
               <Giua Content={this.state.Anime.Content} Episode={this.state.Episode}/>
               <Duoi id={this.state.IdAnime}/>
           </div>
           </div>
            </>
        );
    }
    
}