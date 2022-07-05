import React from "react";
import { Link } from "react-router-dom";


export default class Tren extends React.PureComponent{
    async ClickTap(Id,EpisodeNumber,IdServer){
       await this.props.ClickTap(Id,EpisodeNumber,IdServer)
    }
        render(){
        //console.log(this.props.listServer)
        let datepresent=new Date().getTime()
        let date="";
        this.props.listServer.forEach((item)=>{
            if(item.IdServer===this.props.IdServer){
                let dateAnime=(new Date(this.props.listServer[0].CreateDate).getTime())-(1000*60*60*7);
                if(datepresent-dateAnime>2678400000)
                return date=(Math.ceil((datepresent-dateAnime)/(1000*60*60*24*30)))+" Tháng";
                if((datepresent-dateAnime<=2678400000)&&(datepresent-dateAnime>=86400000))
                return date=(Math.ceil((datepresent-dateAnime)/(1000*60*60*24)))+" Ngày";
                if((datepresent-dateAnime<86400000)&&(datepresent-dateAnime>=3600000))
                return date=(Math.ceil((datepresent-dateAnime)/(1000*60*60)))+" Giờ";
                if(datepresent-dateAnime<3600000)
                return date=(Math.ceil((datepresent-dateAnime)/(1000*60)))+" Phút";
            }
        })
        let tap=0;
        if(this.props.listServer[0])
        tap=this.props.listServer[0].EpisodeNumber


        return(
            <>
    <div className="ah-frame-bg fw-700 margin-10-0 bg-black">
    <Link to={`/chitiet/${this.props.Anime.Id}.html`} className="fs-16 flex flex-hozi-center color-yellow border-style-1"><span className="material-icons-round margin-0-5">
    movie
    </span>{this.props.Anime.NameAnime}</Link>
    <div className="flex flex-space-auto">
    <span>Tập {tap}</span>
    <span>Đăng {date} trước</span>
    </div>
    </div>
    <div className="control-bar flex flex-space-between bg-cod-gray">
    <div className="bg-black flex flex-hozi-center fw-500 fs-17 padding-0-10 height-50 border-l-b-t">
    <div className="margin-10-0 bg-gray-2">
    <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
    Tập {tap}
    </div>
    </div> </div>
    <div className="bg-black flex flex-hozi-center fs-17 padding-0-10 height-50 border-r-b-t">
    <a href={`/chitiet/${this.props.Anime.Id}.html`} className="button-default padding-5 bg-brown fs-21" title="Thông tin phim"><span className="material-icons-round">
    info
    </span></a>
    </div>
    </div>
    <div id="list_sv" className="flex flex-ver-center margin-10">
        {
            this.props.listServer.map((item,index)=>{
                if(item.IdServer===this.props.IdServer)
                return(<React.Fragment key={index}>
                        <Link to={`#root`} className="button-default bg-green" id={item.Id} name={item.Name}>{item.Name}</Link>
                </React.Fragment>
                )
                else
                return(
                    <React.Fragment key={index}>
                    <Link  onClick={()=>this.ClickTap(this.props.Anime.Id,item.EpisodeNumber,item.IdServer)} to={`/phim/${this.props.Anime.Id}/${item.IdServer}/${item.EpisodeNumber}.html`} className="button-default" id={item.Id} name={item.Name}>{item.Name}</Link>
                </React.Fragment>
                )

            })
        }
    </div>

            </>
        );
    }
}