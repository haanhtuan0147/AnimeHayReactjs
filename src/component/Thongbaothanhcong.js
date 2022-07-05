import React from "react";
 
export default class Thongbaothanhcong extends React.PureComponent (){
    constructor(props){
        super(props);
        this.state={
            Status:this.props.Status
        }
        this.ClickTrangThai=this.ClickTrangThai.bind(this)
    }
    componentDidMount(){
        if(this.state.Status!==0){
            this.time=setTimeout(()=>{this.setState({Status:0})},this.props.time)
        }
    }
    componentDidUpdate(){
        clearTimeout(this.time)
        if(this.state.Status!==0){
            this.time=setTimeout(()=>{this.setState({Status:0})},5000)
        }
    }
    ClickTrangThai(){
        clearTimeout(this.time)
        this.setState({Status:0})
    }
render(){
    return (
        <>
        <div className="toast"><div className="flex"><div>
            <div className="toast_head toast-success">
              <div className="toast_title">Thông báo</div>
              <div className="toast_exit padding-0-10" onClick={this.ClickTrangThai}>X</div>
            </div>
            <div className="toast_body">
                <div className="toast_message">{this.props.Content}</div>
            </div>
            </div>
            <div>
            </div>
            </div>
        </div>
        </>
  );
}
};