import React from "react";
import { Link } from "react-router-dom";

 class ItemLogin extends React.Component{

render(){
    let NumberThongBao=""
    if(this.props.NumberThongBao!==0)
    NumberThongBao=<span className="badge">{this.props.NumberThongBao}</span>
    if(sessionStorage.getItem('Account'))
    return(<>
    <Link to='/FolowAnime'><span className="material-icons-round">
    bookmarks
    </span></Link>
    <a href="##" onClick={()=>{this.props.clickEventDropDown("126ooo","account_circle")}} id="126ooo" className="toggle-dropdown" bind="drop-down-2"><span className="material-icons-round">
    account_circle
    </span></a>
    <div className="load-notification relative">
    {NumberThongBao} 
    <a href="##" id="toggle-notification" onClick={()=>{this.props.clickEventDropDown("toggle-notification","notifications")}} load_notification="true" className="toggle-dropdown" bind="drop-down-3" ><span className="material-icons-round">notifications</span></a>
    </div>
    </>)
    else
    return(<>
    <Link to="/Login"><span className="material-icons-round">
    login
    </span></Link>
    </>);
}
 }
export default ItemLogin;