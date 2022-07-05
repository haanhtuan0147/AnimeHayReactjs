import React from "react";
import Pageso from "./thanhpageso";
 class Page extends React.PureComponent{
    render(){
        //console.log(">>>>>>>>>>>>>",this.props.page,this.props.countpage)
        /*                                    <button onClick={()=>this.props.goPage()}>
                                    <span class="material-icons-round">mouse</span>
                                    </button>*/
        return(
            <>
            
                <div className="pagination">
                        <div>
                            <a href="#root" onClick={()=>this.props.changepage(1)}>Đầu</a>
                            <Pageso changepage={this.props.changepage} page={this.props.page} pagemax={this.props.countpage}/>
                            <div className="go_page" style={{display:"none"}}>
                            <form onSubmit={(event)=>this.props.goPage(event)} >
                                    <input type="number" name="go_page" placeholder="Nhập page cần đến" id="go_page"/>
                                    <button type="submit">
                                    <span className="material-icons-round">mouse</span>
                                    </button>
                            </form>
                            </div>           
                            <a href="##" onClick={(e)=>this.props.toggleGoPage(e)} style={{background: "#a54f4f"}}>GO</a>
                            <a href="#root" onClick={()=>this.props.changepage(this.props.countpage)}>Cuối</a>
                        </div>
                </div>
                <div id="ah_toast"></div>
            </>
            );
        }
        
    
}

export default Page