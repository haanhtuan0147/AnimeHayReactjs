import React from "react";
 class pageso extends React.Component{
render(){
    if(this.props.pagemax===1){
        return(
            <>
                <a href="#root" className="active_page" onClick={()=>this.props.changepage(1)}>1</a>
            </>
            );
    }
       if(this.props.page===1)
       {
        return(
            <>
                <a href="#root" className="active_page" onClick={()=>this.props.changepage(1)}>1</a>
                <a href="#root" onClick={()=>this.props.changepage(2)}>2</a>
            </>
            );
       }
       if(this.props.page!==1&&this.props.page!==this.props.pagemax){
        return(
            <>
                <a href="#root" onClick={()=>this.props.changepage(this.props.page-1)}>{this.props.page-1}</a>
                <a href="#root" className="active_page" onClick={()=>this.ocoo(this.props.page)}>{this.props.page}</a>
                <a href="#root" onClick={()=>this.props.changepage(this.props.page+1)}>{this.props.page+1}</a>
            </>
        );
       }
       if(this.props.page===this.props.pagemax)
       {
        return(
            <>
                <a href="#root" onClick={()=>this.props.changepage(this.props.pagemax-1)}>{this.props.pagemax-1}</a>
                <a href="#root" className="active_page" onClick={()=>this.props.changepage(this.props.pagemax)}>{this.props.pagemax}</a>
            </>
        );
       }
 }
}
export default pageso;