import React from "react";
import Dot from "./loaddata/owl-dot";
import DanhSachDeCu from "./loaddata/DanhSachDeCu";

export default class decu extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            so:this.props.end,
            sohientai:1,
            kt:"owl-next",
            trangthai:true,
            Timeout:0
        } 
        this.onMouseOut=this.onMouseOut.bind(this);
        this.onMouseOver=this.onMouseOver.bind(this);
        this.ClickPN=this.ClickPN.bind(this)
        this.loadEmployeeData=this.loadEmployeeData.bind(this)
        this.clickdot=this.clickdot.bind(this)
        
    }
    onMouseOver(){
        this.setState({
            trangthai:false
        })
    }
    onMouseOut(){
        this.setState({
            trangthai:true
        })
    }
    loadEmployeeData() {  
        if(this.state.trangthai){
                const cc =(call)=>{
                    if(this.state.kt==="owl-next"&& this.state.so===this.state.sohientai+2){
                        this.setState({
                        kt:"owl-prev"
                    });
                    }
                    if(this.state.kt==="owl-prev"&& this.state.sohientai===2){
                        this.setState({
                        kt:"owl-next"});
                    }
                    call();
                }
                    cc(()=>{
                        this.ClickPN(this.state.kt);
                    })
                }
    }
    componentDidMount() {
        this.time=setTimeout(()=>this.loadEmployeeData(), 2000);
    }
    componentWillUnmount(){
        clearTimeout(this.time)
    }
    componentDidUpdate(){
        clearTimeout(this.time)
        this.time=setTimeout(()=>this.loadEmployeeData(), 2000);
    }
    ClickPN(name){
        if(name==="owl-prev")
        {
            
            if(this.state.sohientai!==1){
                this.setState({
                    sohientai:this.state.sohientai-1
                });
            }
            else{
                    this.setState({
                        sohientai:this.state.so
                    });
                    
            }
        }else{
            if(this.state.sohientai!==this.state.so){
                    this.setState({
                        sohientai:this.state.sohientai+1
                    });
            }else{
                    this.setState({
                        sohientai:1
                    });
            }
        }
        const cc01=(call)=>{
            const nodeList=document.querySelectorAll("button.owl-dot");
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove("active");
              }
            call();
        }
       cc01(()=>{
            document.querySelector(`button.t${this.state.sohientai}`).classList.add("active");
        });
    }
    clickdot(i){
        //console.log("đã click")
        //console.log(i)
        this.setState({
            sohientai:i
        })
    }
    render(){
        //console.log("render") 
        return(
            <>
            
<div id="top-banner-pc">
</div>
<div id="top-banner-mb">
</div>
<div className="ah-carousel">
<div className="margin-10-0 bg-gray-2">
<div className="fs-17 fw-700 padding-0-20 color-gray inline-flex height-40 flex-hozi-center bg-black border-l-t">
Phim đề cử
</div>
</div>
<div className="ah-frame-bg owl-carousel owl-theme owl-loaded owl-drag">
<div className="owl-stage-outer"onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
    <div className="owl-stage"  style={{transition: "all 0.25s ease 0s", width: "15000px", padding:"0 0px 0 0px",transform: `translate3d(${(-this.props.width*(this.state.sohientai-1))}px, 0px, 0px)`}}>
    <DanhSachDeCu Animes={this.props.Animes} widths={this.props.width}/>
</div>
</div>
<div className="owl-nav disabled">
    <button type="button" role="presentation" className="owl-prev" onClick={()=>{this.ClickPN("owl-prev")}}><span aria-label="Previous">‹</span></button>
    <button type="button" role="presentation" className="owl-next" onClick={()=>{this.ClickPN("owl-next")}}><span aria-label="Next">›</span></button>
</div>
<div className="owl-dots">
    <Dot clickdot={this.clickdot} Anime={this.props.Animes}/>
</div>
</div>
</div>
            
            </>
            
        );
        
    }
}