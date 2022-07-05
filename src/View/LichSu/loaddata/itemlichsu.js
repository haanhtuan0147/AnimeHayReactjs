import React from "react";
import { Link } from "react-router-dom";



export default class ItemLichSu extends React.PureComponent{
    render(){
        let history=JSON.parse(localStorage.getItem("watchhistory"))
        if(history!==null)
        return(
            <>{
                history.map((item,index)=>{
                    return(
                        <React.Fragment key={index}>
                     <div className="item">
                            <Link to={`/Phim/${item.IdAnime}/${item.IdServer}/${item.EpisodeNumber}`}>
                            <div>
                            <img src={item.Avatar} alt=""/>
                            </div>
                            <div>
                            <div>{item.NameAnime}</div><div>Bạn đã xem tập {item.EpisodeNumber}</div>
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