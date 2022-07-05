import React from "react";
 class Dot extends React.Component{
render(){
    return this.props.Anime.map((item,index)=>{
        return (
            <React.Fragment key={index}>
                    <button   role="presentation" onClick={()=>this.props.clickdot(index)} className={`owl-dot t${index}`}  ><span></span></button>    
            </React.Fragment>
            )
    })
  /*  for (var i = 1; i < this.props.end; i++) {

    indents.push(<button role="presentation" onClick={()=>this.abcxyz(i)} className={`owl-dot t${i}`}  ><span ></span></button>);
    }*/
 }
}
export default Dot;