import React from "react";
 
export default class Thongbaothatbai extends React.PureComponent() {
    constructor(props){
        super(props);
        this.state={
            Status:0
        }
        this.ClickTrangThai=this.ClickTrangThai.bind(this)
    }
    componentDidMount(){
        if(this.state.Status!==0){
            this.time=setTimeout(()=>{this.setState({Status:0})},this.propstime)
        }
    }
    componentDidUpdate(){
        clearTimeout(this.time)
        if(this.state.Status!==0){
            this.time=setTimeout(()=>{this.setState({Status:0})},this.propstime)
        }
    }
    ClickTrangThai(){
        clearTimeout(this.time)
        this.setState({Status:0})
    }
render(){
    if(this.state.Status!==0)
    return (
        <>
        <div className="toast">
                    <div className="flex">
                        <div>
                            <div className="toast_head toast-error">
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