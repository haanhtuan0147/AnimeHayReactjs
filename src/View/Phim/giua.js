import React from "react";
import Numbernexts from "./Loaddata/numbernext";
import { Link } from "react-router-dom";
/*import ReactJWPlayer from 'react-jw-player';
import{ useSelector,useDispatch}from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import addtimeskip from "../../action/onpausetime";*/
export default class body extends React.PureComponent{
    onclicknigth(){
      var a= document.querySelector("#demngay");
      a.classList.add("light-off")
    }
    onClicksettime(){
      alert("bắt đầu")
    }
    render(){
      let Numbernext=0;
      this.props.listEpisodeNumber.forEach((item)=>{
        if(Number(item.EpisodeNumber)>Number(this.props.EpisodeNumber.EpisodeNumber))
        Numbernext=1;
      })
        return(
            <>  
                <div id="video-player" className="jwplayer jw-reset jw-state-paused jw-stretch-uniform jw-flag-aspect-mode jw-breakpoint-6 jw-floating-dismissible jw-flag-user-inactive" tabIndex="0" aria-label="Trình phát video" role="application" style={{width: "100%"}} aria-describedby="jw-shortcuts-tooltip-explanation">
                        <div style={{position: "relative",paddingBottom: "64.25%"}}>
                        <iframe style={{position:"absolute",top: "0",left: "0",width: "100%",height:"100%",overflow:"hidden"}} src={this.props.EpisodeNumber.Link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" scrolling="0" allowFullScreen="">
                        </iframe>
                        </div>
                </div>
                <div className="flex flex-ver-center margin-10">
                <div className="button-default flex flex-hozi-center fw-700 bg-blue" id="toggle-light" onClick={()=>this.onclicknigth()}>
                <span className="material-icons-round ">
                nightlight
                </span>Night</div>
                  <Numbernexts ClickTap={this.props.ClickTap} Numbernext={Numbernext} IdServer={this.props.EpisodeNumber.IdServer} IdAnime={this.props.EpisodeNumber.IdAnime} EpisodeNumber={this.props.EpisodeNumber.EpisodeNumber}/>
                </div>
                <div className="list_episode ah-frame-bg" id="list-episode">
                <div className="heading flex flex-space-auto fw-700">
                <span>Danh sách tập</span>
                <span id="newest-ep-is-readed" className="fs-13">Lần trước xem <a href="https://animehay.club/xem-phim/one-piece-dao-hai-tac-tap-1-30777.html" className="color-yellow fw-500">tập 1</a></span>
                </div>
                <div className="list-item-episode scroll-bar">
                  {
                    this.props.listEpisodeNumber.map((item,index)=>{
                      if(Number(item.EpisodeNumber)===Number(this.props.EpisodeNumber.EpisodeNumber))
                      return(
                        <React.Fragment key={index}>
                        <Link to={`/phim/${item.IdAnime}/${item.IdServer}/${item.EpisodeNumber}.html#root`} title={`Tập ${item.EpisodeNumber}`} className="active">
                        <span>{item.EpisodeNumber}</span>
                        </Link>
                        </React.Fragment>
                      );
                      else{
                        return(
                          <React.Fragment key={index}>
                          <Link onClick={()=>this.props.ClickTap(item.IdAnime,item.EpisodeNumber,item.IdServer)} to={`/phim/${item.IdAnime}/${item.IdServer}/${item.EpisodeNumber}.html#root`} title={`Tập ${item.EpisodeNumber}`}>
                          <span>{item.EpisodeNumber}</span>
                          </Link>
                          </React.Fragment>
                          );
                      }
                    })
                  }
                  
                
                
                </div>
                </div>
                <div id="bot-banner-pc"></div>
                <div id="bot-banner-mb"></div>

            </>
        );
    }
    
}