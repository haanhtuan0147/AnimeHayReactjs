import React from "react";
import ItemLichSu from "./loaddata/itemlichsu";



export default class body extends React.Component{
    render(){
        return(
        <>
        <div className="ah_content">
        <div id="top-banner-pc">
        </div>
        <div id="top-banner-mb">
        </div>
            <div className="history">
                <div className="margin-10-0 bg-gray-2">
                <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
                Lịch sử xem
                </div>
                </div> 
                <div className="display_axios"> 
                    <div className="watch-history ah-frame-bg">
                        <ItemLichSu/>
                    </div>
                </div>
            </div>
        <div id="ah_toast"></div>
        </div>
        </>
        );
    }
    
}