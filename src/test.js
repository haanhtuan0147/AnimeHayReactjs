import React from 'react';
import{ useSelector,useDispatch}from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import addtimeskip from "./action/onpausetime";
function Board () {
    const Skiptime= useSelector((state=> state.timeskip));
    const Dispatch= useDispatch()
    var timeskip=Number(localStorage.getItem('myCat'))||0
    
    function clicl01(){
        const newsstate={
            id:uuidv4(),
            timeskip:localStorage.getItem('myCat')
          }
          const action=addtimeskip(newsstate);
        Dispatch(action)
    }
   setInterval(()=>{timeskip=timeskip+1;localStorage.setItem('myCat',timeskip)},1000)
        return (
            <>
            {
                Skiptime.map((item)=>{
                    return(
                        <>
                        <ul>
                            <li>{item.id}</li>
                            <li>{item.timeskip}</li>
                        </ul>
                        </>
                    )
                })
            }
                <div>H{Math.floor(Number(localStorage.getItem('myCat')/(60*60)))}Phút{Math.floor(Number(localStorage.getItem('myCat')/60))}giây{Math.floor(Number(localStorage.getItem('myCat')%60))}</div>
                <div onClick={clicl01}>hello</div>
            </>
        )
  }
  export default Board;