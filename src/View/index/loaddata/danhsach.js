import React from "react";
import ItemMovies from "./itemovies";


 class DanhSach extends React.PureComponent{
    render(){
            return(
                <>
                           <div className="margin-10-0 bg-gray-2 flex flex-space-auto">
                            <div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
                            Mới cập nhật
                            </div>
                            <div className="margin-r-5 fw-500">
                            <a href="#root" className="bg-red padding-5-10 border-default">Anime</a>
                            <a href="#root" className="bg-blue padding-5-10 border-default">CNA</a>
                            </div>
                            </div>
                            <div className="movies-list ah-frame-bg">
                            <ItemMovies Animes={this.props.Anime}/>
                            </div>
                </>
                );
        
        
    }
    
}
export default DanhSach