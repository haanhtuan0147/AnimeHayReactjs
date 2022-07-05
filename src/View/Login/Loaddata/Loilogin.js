import React from "react";
 class Loilogin extends React.PureComponent{
render(){
    if(this.props.Loilogin)
    return(<>
    {
        <div className="noti-error flex flex-hozi-center">
                    <span className="material-icons-round margin-0-5">
                        error
                    </span>
                {this.props.Loilogin}
        </div>
    }
    </>)
}
 }
export default Loilogin;