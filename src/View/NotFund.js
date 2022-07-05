import React from "react";

export default class NotFund extends React.Component{


    render(){
        let so
        if(this.props.Load===1)
        so=<div className="ah_content">
        <div id="top-banner-pc">
        <div id="zone-kyl30cr3">
        </div>
        </div>
        <div id="top-banner-mb">
        </div>
        <div className="ah_404">404 PAGE NOT FOUND</div>
        <div id="ah_toast"></div>
        </div>
        else
        so=<div className="ah_content">
        <div id="top-banner-pc">
        <div id="zone-kyl30cr3">
        </div>
        </div>
        <div id="top-banner-mb">
        </div>
        <div className="ah_404">404 PAGE NOT FOUND</div>
        <div id="ah_toast"></div>
        </div>
        return(
            <>
            {
                so
            }
            </>
        );
    }
}