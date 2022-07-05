import React from "react";
const Star=[
    1,2,3,4,5,6,7,8,9,10
]
export default class ThongBao extends React.PureComponent{
    ToMau(so){
        const nodeList=document.querySelectorAll(".stardes");
        for (let i = 0; i < nodeList.length; i++) {
            if(i<so)
            nodeList[i].classList.add("active");
            else
            nodeList[i].classList.remove("active");
          }
        this.props.ToMauStar(so)
    }
    render(){
    if(this.props.TrangThai!==0)
    return(
    <>
        <div id="modal" className="modal" style={{display: "block", visibility: "visible", top:`30%`, transition: "top 0.3s ease 0s", left: "30%", width: "500px"}}>
        <div>
        <div>Đánh giá phim</div>
        <a href="##" onClick={()=>this.props.ClickTrangThai(0)}><span className="material-icons-round margin-0-5">
        close
        </span></a>
        </div>
        <div>
        <div className="rated-star flex flex-hozi-center flex-ver-center">
            {
                Star.map((item,index)=>{
                    if(this.props.Star>=item)
                    return(
                        <React.Fragment key={index}>
                                    <span className="stardes active" rate={item} onClick={()=>this.ToMau(item)}>
                                    <span className="material-icons-round">star
                                    </span>
                                    </span>
                        </React.Fragment>
                    );
                    else
                    return(
                        
                        <React.Fragment key={index}>

                                    <span className="stardes" rate={item} onClick={()=>this.ToMau(item)}>
                                    <span className="material-icons-round">star
                                    </span>
                                    </span>
                        </React.Fragment>
                    );
                })
            }

            
        </div>
        </div>
        </div>
    </>
    );
    }

}