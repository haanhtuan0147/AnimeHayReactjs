import React from "react";
import { Link } from "react-router-dom";


export default class Giua extends React.Component{
    render(){
        let noidung=this.props.Content
        return(
            <>
    <div className="body">
        <div className="list_episode ah-frame-bg">
            <div className="heading flex flex-space-auto fw-700">
                <span>Danh sách tập</span>
                <span id="newest-ep-is-readed" className="fs-13"></span>
            </div>
        <div className="list-item-episode scroll-bar">
            {
                this.props.Episode.map((item,index)=>{
                    return(<React.Fragment key={index}>
                                   <Link to={`/phim/${item.IdAnime}/${item.IdServer }/${item.NumberView}.html`} title={`Tập ${item.EpisodeNumber}`}>
                        <span>{item.EpisodeNumber}</span>
                        </Link>
                    </React.Fragment>)
                })
            }
        </div>
        </div>
        <div className="desc ah-frame-bg">
            <div>
                <h2 className="heading">
                Nội dung
                </h2>
            </div>
            <div>
                <p>{noidung}</p> 
            </div>
        </div>
    </div>
            </>
        );
    }
    
}