import React from "react";
import { Link } from "react-router-dom";

 class DanhSachDeCu extends React.Component{
render(){
   
    return(
        <>
       {
            this.props.Animes.map((item,index)=>{
                return(
                    <React.Fragment key={index}>
                                            <div className="owl-item cloned" style={{width: this.props.width+"px", margin: "0 10px 0 0"}}><div>
                    <Link to={`chitiet/${item.Id}.html`}>
                    <div><img src={item.Avatar}alt={item.NameAnime} style={{width:this.props.widths+"px"}} /></div>
                    <div className="name">{item.NameAnime}</div>
                    <div className="episode_latest">
                    205/{item.EpisodeNumber} </div>
                    </Link>
                    </div>
                        </div>

                    </React.Fragment>

                )
            })
       }
        </>
        )
}
 }
export default DanhSachDeCu;