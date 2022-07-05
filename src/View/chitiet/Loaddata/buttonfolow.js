import React from "react";


export default class Buttonfolow extends React.PureComponent{


    render(){
        if(Object.keys(this.props.Follow).length>0)
        return(
            <>
             <a href="##" onClick={this.props.XoaPhim} id="toggle_follow" className="bg-green padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center" title="Theo dõi phim này" style={{backgroundColor:"rgb(125, 72, 72)"}}><span className="material-icons-round">bookmark_remove</span> </a>
            </>
        );
        else
        return(
        <>
            <a href="##" onClick={this.props.ThemPhim} id="toggle_follow" className="bg-green padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center" title="Theo dõi phim này"><span className="material-icons-round">bookmark_add</span> </a>
        </>);
    }
    
}