import React from "react";
import { Link } from "react-router-dom";


 class ItemMovies extends React.Component{
    render(){
        return(
                <>
                {
                    this.props.Animes.map((item,index)=>{
                    return(
                    <React.Fragment key={index}>
                        <div className="movie-item" id={item.Id} key={index}>
                                    <Link to={`chitiet/${item.Id}.html`} title={item.NameAnime}>
                                        <div className="episode-latest"> <span>{item.EpisodeNumbers}/{item.EpisodeNumber}</span></div>
                                        <div>
                                            <img src={item.Avatar} alt={item.NameAnime}/>
                                        </div>
                                        <div className="score">
                                        {
                                            (item.NumberEvaluate).toFixed(1)
                                        }
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
                </>
                );
        
        
    }
    
}
export default ItemMovies