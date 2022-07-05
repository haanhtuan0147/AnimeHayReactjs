import React from "react";
import Folow from"./Folow/body"
import Api from"./Api/axios"
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class FolowAnime extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            Anime:[],
        }
        this.delFollowmovie=this.delFollowmovie.bind(this);
    }
    async delFollowmovie(id){
      try {
            const response =await Api.delete('Follow/delete/'+id,{headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':'Bearer '+sessionStorage.getItem('Token')
            }
            })
            if(response.status===200)
            {
               await this.loadEmployeeAnime();
               toast.success("Đã Xóa Theo Dõi Thành Công");
            }
            
          } catch (error) {
            toast.error("Đã Xóa Theo Dõi Thất Bại Mời Bạn Kiểm Tra Lại Thông Tin Xóa");
          }
    }
    async loadEmployeeAnime (){
        try {
          const response =await Api.get('Follow/findUser',{headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':'Bearer '+sessionStorage.getItem('Token')
          }

        })
          if(response.status===200)
          {
            const Anime = response.data.result;
            //console.log(">>>>>>>>.",Anime)
             this.setState({ Anime:Anime });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async componentDidMount(){
      if(sessionStorage.getItem("Account")===null)
      {
        await this.props.use('/*')
        //return window.location.assign("/*");
      }
      else{
        await this.loadEmployeeAnime()
      }
    }
    shouldComponentUpdate(){
        if(Object.keys(this.state.Anime).length!==0)
        return true
        else
        return false
    }
    render(){

        return(
            <>
            <Folow Anime={this.state.Anime} delFollowmovie={this.delFollowmovie}/>
            <div id="ah_toast">
            <ToastContainer  position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'dark'}/>
            </div>
            </>
        );
    }
}