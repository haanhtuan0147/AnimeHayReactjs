import React from "react";
 class LoiRegister extends React.PureComponent{
render(){
    if(this.props.LoiRegister.length!==0)
    return(<>
    {
        this.props.LoiRegister.map((item,index)=>{
            return(
                <React.Fragment key={index}>
            <div className="noti-error flex flex-hozi-center">
            <span className="material-icons-round margin-0-5">
                error
            </span>
              {item}
            </div>
            </React.Fragment>
            )
        })

    }
    </>)
}
 }
export default LoiRegister;