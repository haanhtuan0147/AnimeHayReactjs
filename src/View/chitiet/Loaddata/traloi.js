import React from "react";


export default class TraiLoi extends React.PureComponent{
    render(){
        if(this.props.commentdiv===this.props.id)
        return(
            <>
            <div  class="comment-editor relative flex flex-column margin-t-10">
            <textarea id={`comment-editor-${this.props.id}`} class="content-of-comment" placeholder="Nhập bình luận của bạn tại đây" rows="3" maxlength="5000">
            </textarea>
            <div class="tool-bar flex flex-space-auto">
                <div>
                    <div class="add-emoji button-default color-white" >
                        <span class="material-icons-round" onClick={(event)=>this.props.clickicon(event,this.props.id)}>emoji_emotions
                        </span>
                        </div>
                    </div>
                    <div>
                    <div class="add-comment button-default bg-red color-white" onClick={()=>this.props.clickgui(this.props.Ten,this.props.id,this.props.Idcomment)}>
                    Gửi</div>
                </div>
            </div>
            </div>
            </>
        );
    }
    
}