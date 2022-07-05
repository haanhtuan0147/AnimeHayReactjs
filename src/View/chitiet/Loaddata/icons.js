import React from "react";


export default class body extends React.Component{
    render(){
        return(
       <>
          <li data-name={iconss[i].name} onClick={(i)=>this.props.onClick(iconss[i].Value)}>
             <a class="fg-emoji-picker-item" title={iconss[i].name} data-name={iconss[i].name} data-code={iconss.code} href="##">
            {iconss[i].Value}</a>
             </li> 
       </>
        );
    }
    
}