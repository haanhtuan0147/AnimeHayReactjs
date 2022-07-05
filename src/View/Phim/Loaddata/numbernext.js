import React from "react";
import { Link } from "react-router-dom";



export default class Numbernext extends React.PureComponent{
    render(){
        if(this.props.Numbernext===1)
        return(<>
        <div>
            <Link onClick={()=>this.props.ClickTap(this.props.IdAnime,Number(this.props.EpisodeNumber)+1,this.props.IdServer)} to={`/phim/${this.props.IdAnime}/${this.props.IdServer}/${Number(this.props.EpisodeNumber)+1}.html`} class="button-default padding-10-20 flex flex-hozi-center fw-700">Tiếp<span class="material-icons-round ">
            arrow_forward_ios
            </span></Link>
        </div>
        </>);
        else
        return(
        <>
        </>);
    }
    
}