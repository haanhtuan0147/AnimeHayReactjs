import React from "react";
import TraiLoi from "./traloi";
import LoadCommentsAdd from "./loadCommentsAdd";
import TinhTimeCanhNhau from "../../Api/Time"


export default class Comment extends React.PureComponent{
    render(){
        let datepresent=new Date().getTime()
        let commentgui
        if(sessionStorage.getItem('Account'))
        commentgui=<div id="frame-comment">
                    <div  className="comment-editor relative flex flex-column margin-t-10">
                        <textarea id={`comment-editor-${1}`} className="content-of-comment" placeholder="Nhập bình luận của bạn tại đây" rows="3" maxLength={5000}>
                            </textarea>
                            <div className="tool-bar flex flex-space-auto">
                                <div>
                                    <div className="add-emoji button-default color-white" onClick={(event)=>this.props.clickicon(event,1)}> 
                                    <span className="material-icons-round">emoji_emotions</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="add-comment button-default bg-red color-white" onClick={(()=>this.props.clickgui1())}>Gửi
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
        else
        commentgui=<div className="flex flex-ver-center fw-500">
        <a href="/Login" className="button-default bg-red">
        Đăng nhập để bình luận
        </a>
         </div>
        return(
            <>
            <div className="flex flex-space-auto">
            <div className="fw-700 fs-16 color-yellow-2 flex flex-hozi-center"><span className="material-icons-round margin-0-5">
        comment
            </span>Bình luận ({this.props.Numbercomment})</div>
            <div id="refresh-comments" className="cursor-pointer"><span className="material-icons-round fs-35">refresh</span></div>
        </div>
        {commentgui}
        <div id="comments" className="margin-t-10">
            {
                this.props.Comment.map((item,index1)=>{
                    let datecomment=(new Date(item.UpDate).getTime())-(1000*60*60*7);
                    let date=TinhTimeCanhNhau(datepresent,datecomment);
                    let color="#b5b3b3";
                    let Commentsssssss
                                if(sessionStorage.getItem('Account'))
                                Commentsssssss=<a href="##" onClick={()=>this.props.cickTraloi(item.Id)} className="margin-r-5">✉</a>        
                                else
                                Commentsssssss=""
                    if(Number(item.Leve)>9)
                    color="#6ebee5";
                    let NoiDungComment=(item.Comment.replace("<br/>","\\")).split("\\")
                    return(
                        <React.Fragment key={index1}>

                        <div id="comment_98521" className="user-comment relative"><div className="flex bg-comment">
                        <div className="left" onClick={()=>this.props.initViewProfile("comment",item.Id)}> <div className="avatar">    
                            <img src={item.Avatar} style={{width:"50px",height:"50px"}} alt={item.NickName}/>
                        </div></div>
                        <div className="right"><div className="flex flex-column">    
                            <div className="flex flex-space-auto">        
                                <div className="flex flex-hozi-center">         
                                    <div className="nickname">          
                                    {item.NickName}        
                                    </div>          
                                    <div className="color-red fw-700 fs-12" style={{color:color}}>              
                                    Lv.{item.Leve}           
                                    </div>          
                                        </div>    
                                        <div className="flex flex-hozi-center relative">     
                                        </div>   
                                        </div>   
                                        <div className="content">   {
                                            NoiDungComment.map((value,index11)=>{
                                                return(
                                                        <React.Fragment key={index11}>
                                                            {value}<br/>
                                                        </React.Fragment>
                                                )
                                            })
                                        }     
                
                                        </div>    
                                        <div className="flex fs-12"> 
                                        {
                                            Commentsssssss
                                        }       
                                        <div>        
                                            {date}  trước         
                                        </div>      
                                        </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        <div id={`toggle_frame_comment_${item.Id}`}>
                        <TraiLoi Idcomment={item.Id} Ten="comment" clickgui={this.props.clickgui} clickicon={this.props.clickicon} id={item.Id} commentdiv={this.props.divIdComment}/>
                        </div>  
                        {
                            item.FeedBack.map((itemf,index2)=>{
                                let dateFeedBack=(new Date(item.UpDate).getTime())-(1000*60*60*7);
                                let date=TinhTimeCanhNhau(datepresent,dateFeedBack);
                                let color="#b5b3b3";
                                let traloi
                                if(sessionStorage.getItem('Account'))
                                traloi=<a href="##" onClick={()=>this.props.cickfeedback(itemf.Id)} className="margin-r-5 ">✉</a> 
                                else
                                traloi=""
                                if(Number(item.Leve)>9)
                                color="#6ebee5";
                                let NoiDungFeedBack=(itemf.FeedBack.replace("<br/>","\\")).split("\\")
                                return(
                                    <React.Fragment key={index2}>
                                    <div id="feedback_98365" className="frame-reply-comments">
                                        <div id="reply_36335" className="user-comment relative">
                                            <div className="flex bg-comment">
                                                <div className="left" onClick={()=>this.props.initViewProfile("FeedBack",itemf.Id)}> 
                                                    <div className="avatar">    
                                                        <img src={itemf.Avatar} style={{width:"50px",height:"50px"}} alt= {itemf.NickName} />
                                                        </div>
                                                </div>
                                                <div className="right">
                                                    <div className="flex flex-column">    
                                                        <div className="flex flex-space-auto">        
                                                                <div className="flex flex-hozi-center">          
                                                                    <div className="nickname">         
                                                                    {itemf.NickName}          
                                                                    </div>          
                                                                    <div className="color-red fw-700 fs-12" style={{color:color}}>              Lv.{itemf.Leve}   
                                                                    </div>          
                                                                </div>     
                                                                <div className="flex flex-hozi-center relative">    
                                                                </div>   
                                                        </div>   
                                                                <div className="content">  
                                                                {
                                                                NoiDungFeedBack.map((value,index21)=>{
                                                                    return(
                                                                            <React.Fragment key={index21}>
                                                                                {value}<br/>
                                                                            </React.Fragment>
                                                                    )
                                                                })
                                                                }     
                                                                </div>    
                                                        <div className="flex fs-12">       
                                                        {
                                                            traloi
                                                        }     
                                                                <div>       
                                                                    {date} trước          
                                                                </div>      
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id={`feedback_${itemf.Id}`} className="frame-reply-comments">
                                    <TraiLoi Idcomment={item.Id} Ten="FeedBack" clickgui={this.props.clickgui} clickicon={this.props.clickicon} id={itemf.Id} commentdiv={this.props.divIdComment}/>
                                    </div>
                                    </React.Fragment>
                                );
                            })
                        }
            
            </React.Fragment>)
                })
            }
        </div>
        <div id="toggle_frame_comment_98365">
        </div>
        <LoadCommentsAdd loadComments={this.props.loadComments} CommentEnd={this.props.CommentEnd} lenghtMax={(this.props.Comment).length}/>
            </>
        );
    }
    
}