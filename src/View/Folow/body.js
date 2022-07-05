import React from "react";
import { Link } from "react-router-dom";



export default class body extends React.Component{
    render(){
        if(this.props.Anime.length!==0)
        return(
        <>
    <div className="ah_follows">
    <div className="margin-10-0 bg-gray-2">
    <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
    Phim bạn theo dõi
    </div>
    </div> 
    <div className="display_axios ah-frame-bg">
    <div className="movies-list">
        {
            this.props.Anime.map((item,index)=>{
                return(
                    <React.Fragment key={index}>
                            <div className="movie-item" movie-id="3479">
                                <a className="delete" href="#root" onClick={()=>this.props.delFollowmovie(item.Idfollow)}>X</a>
                                <Link to={`/Chitiet/${item.Id}.html`} title="RPG Fudousan">
                                <div className="episode-latest">
                                <span>{item.EpisodeNumbers}/{item.EpisodeNumber}</span>
                                </div>
                                <div>
                                <img src={item.Avatar} alt="Phim RPG Fudousan"/>
                                </div>
                                <div className="score">
                                {(item.NumberEvaluate).toFixed(1)}
                                </div>
                                <div className="name-movie">
                                {item.NameAnime}
                                </div>
                                </Link>
                                </div>
                    </React.Fragment>
                )
            })
        }
    </div>
</div>
 </div>
        </>
        );
    }
    
}