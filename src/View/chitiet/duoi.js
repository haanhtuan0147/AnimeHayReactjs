import React from "react";
import Icon from "./Loaddata/icon";
import Api from"../Api/axios"

import Comments from "./Loaddata/Comment";





export default class Duoi extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            top01:500,
            left01:500,
            display01:"none",
            CommentEnd:0,
            Comment:[],
            IdCommentIcon:"",
            divIdComment:"",
            Numbercomment:0,
            id:""
        }
        this.clickicon=this.clickicon.bind(this);
        this.loadComments=this.loadComments.bind(this);
        this.cickfeedback=this.cickfeedback.bind(this);
        this.cickTraloi=this.cickTraloi.bind(this);
        this.clickgui=this.clickgui.bind(this);
        this.clickgui1=this.clickgui1.bind(this);
        this.initViewProfile=this.initViewProfile.bind(this);
    }
    async loadEmployeeDataComment (end){
        try {
        const response =await Api.get('Comment/findpage',
        {
            params:{
                IdAnime:this.props.id,
                end:end
            },
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }

        })
        if(response.status===200)
        {
            const Comment = response.data.result;
            this.setState({ Comment:Comment,CommentEnd:end ,Numbercomment:response.data.number,id:this.props.id});
        }
        
        } catch (error) {
        console.log(error)
        }

    }
    async loadComments(Number){
        let Numbercoment=Number+5
        await this.loadEmployeeDataComment(Numbercoment)
    }

    clickiconcomment(name,id){
        //document.getElementById(`comment-editor-${id}`).value=document.getElementById(`comment-editor-${id}`).value+name;
    }
    clickicon(event,id){
        /*var di=(document.querySelector(".fg-emoji-picker").style.display==="none")?"flex":"none";
        this.setState({
            top01:Number(event.pageY),
            left01:Number(event.pageX),
            display01:di,
            IdCommentIcon:id

        }); */ 
    }
    cickTraloi(id){
        if(document.getElementById(`toggle_frame_comment_${id}`).innerHTML==="")
        this.setState({
            divIdComment:id
        })
        else
        this.setState({
            divIdComment:""
        })

    }
    cickfeedback(id){
        if(document.getElementById(`feedback_${id}`).innerHTML==="")
        this.setState({
            divIdComment:id
        })
        else
        this.setState({
            divIdComment:""
        })
    }
    async componentDidMount() {
        await this.loadEmployeeDataComment(5)
    }
    async componentDidUpdate(){
        if(this.props.id!==this.state.id){
            await this.loadEmployeeDataComment(5)
        }
    }
    async loadbinhluan(comment){
        try {
            const response =await Api.post('Comment/create',{
                IdAnime:this.props.id,
                Comment:comment
            },
            {
                headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization':'Bearer '+sessionStorage.getItem('Token')
            }
    
            })
            if(response.status===200)
            {
                await this.loadEmployeeDataComment(this.state.CommentEnd)
            }
            
            } catch (error) {
            console.log(error)
            }
    
    }
    async loadtraloi(comment,id){
        try {
            const response =await Api.post('FeedBack/create',
            {IdComment:id,FeedBack:comment},
            {
                headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization':'Bearer '+sessionStorage.getItem('Token')
            }
    
            })
            if(response.status===200)
            {
                await this.loadEmployeeDataComment(this.state.CommentEnd)
            }
            
            } catch (error) {
            console.log(error)
            }
    
    }
    async clickgui(Ten,idcomment,id){
        let comment=document.getElementById(`comment-editor-${idcomment}`).value
        if(Ten==="comment")
        {
            this.cickTraloi(id)
        }
        if(Ten==="FeedBack"){
            this.cickfeedback(id)
        }
        await this.loadtraloi(comment.replace("\n","<br/>"),id)
    }
    async clickgui1(){
        let comment=document.getElementById(`comment-editor-${1}`).value
        await this.loadbinhluan(comment.replace("\n","<br/>"))
    }
    initViewProfile(Ien,ID){

    }
    render(){
        return(
            <>
    <div id="icon0001"className="fg-emoji-picker" style={{display: this.state.display01,top: `${this.state.top01}px`, left: `${this.state.left01}px`}}>
    <div className="fg-emoji-picker-all-categories">
            <ul className="fg-emoji-picker-category active" id="smileys--people" category-name="Smileys &amp; People">
                <div className="fg-emoji-picker-container-title">Smileys &amp; People</div>
                <div className="fg-emoji-picker-grid">
                <Icon onClick={this.clickiconcomment} id={this.state.IdCommentIcon}/>
                </div>
            </ul>
            </div>
    
    </div>
    <div className="ah-frame-bg">
        <Comments initViewProfile={this.initViewProfile} clickgui1={this.clickgui1} clickgui={this.clickgui} Numbercomment={this.state.Numbercomment} Comment={this.state.Comment} loadComments={this.loadComments} CommentEnd={this.state.CommentEnd} clickicon={this.clickicon} divIdComment={this.state.divIdComment} cickfeedback={this.cickfeedback} cickTraloi={this.cickTraloi}/>
    </div>
    
            </>
        );
    }
    
}