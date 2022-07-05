import React from "react";
 class Buttonguma extends React.PureComponent{
render(){
    if(this.props.time===0)
    return(<>
   <a href="##" className="button-default bg-green margin-10-0 padding-10-20" onClick={()=>{this.props.handleClickGuiMas()}} >Gửi</a>
    </>)
    else
    return(<>
        <a href="##" className="button-default bg-gray margin-10-0 padding-10-20" >{this.props.time}</a>
         </>)
}
 }
export default Buttonguma;