import React from "react";


export default class loadCommentsAdd extends React.PureComponent{
    render(){
        if(Number(this.props.lenghtMax)===Number(this.props.CommentEnd))
        return(
            <>
            <div className="flex flex-ver-center fw-700 load-more button-default bg-blue" onClick={()=>this.props.loadComments(this.props.CommentEnd)}>
                                    <a href="##">Tải thêm bình luận
                                    </a>                                           
                </div>
            </>
        );
    }
    
}