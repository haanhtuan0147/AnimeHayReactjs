import React from "react";
import { Link } from "react-router-dom";

export default class FindSearch extends React.PureComponent{
    render(){
        let display="none";
        if(this.props.Search.length>0)
        display="block";
        return(
            <>
         <div className="live-search" style={{display:display}}>
          <div className="padding-10 flex">
            <Link onClick={()=>{this.props.CloseSearch()}} to="/BoLoc" style={{flex:"0.7"}}>
            Đến trang tìm kiếm
            </Link>
            <a href="##" onClick={()=>this.props.CloseSearch()} style={{flex:"0.3",textAlign:"right"}} >
            <span className="material-icons-round fs-21">
            close
            </span>
            </a>
          </div>
          <div className="result-of-search">
         
            {
                this.props.Search.map((value, index, array) => {
                    return(
                    <React.Fragment key={index}>
            <Link onClick={()=>{this.props.CloseSearch();this.props.researchAnime(value.Id)}} to={"/chitiet/"+value.Id+".html"} >
              <div className="row_one">
                <img src={value.Avatar} alt={value.NameAnime}/>
              </div>
              <div className="row_two">
                <span className="fw-500">
                {value.NameAnime}
                </span> 
                <span className="fs-12 margin-t-5">
                {value.EpisodeNumbers+"/"+value.EpisodeNumber}
                </span>
              </div>
            </Link>
            </React.Fragment>
                   )
                })
            }
             </div>
        </div>
            </>
        );
    }
}