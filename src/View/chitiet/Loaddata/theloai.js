import React from "react";
import Api from"../../Api/axios";
import { Link } from "react-router-dom";



export default class TheLoai extends React.Component{
    constructor(props){
        super(props);
        this.state={
            category:[],
        }
    }
    
    async loadEmployeeDatacategory (){
        try {
          const response =await Api.get('Category/findinlistid',
          {
              params:{ListCategory:JSON.stringify(this.props.category)},
              headers: {
            'Content-Type': 'application/json;charset=utf-8'
              }

        })
          if(response.status===200)
          {
            const category = await response.data.result;
            this.setState({ category:category });
          }
          
        } catch (error) {
          console.log(error)
        }

      }
    async componentDidMount(){
      if(this.props.category){
        if(this.state.category.length!==this.props.category.length&&this.state.category.length===0)
        await this.loadEmployeeDatacategory()
      }
      }
    async componentDidUpdate(){
      let Number=0
      if(this.props.category){
        if(this.state.category.length===this.props.category.length)
      {
          for (let index = 0; index < this.state.category.length; index++) {
            for (let i = 0; i < this.props.category.length; i++) {
              if(this.props.category[i] === this.state.category[index].Id)
              Number=index+1
          }
          }
          if(Number!==this.state.category.length)
          {
            await this.loadEmployeeDatacategory();
          }
      }
      if(this.state.category.length!==this.props.category.length&&this.state.category.length===0)
      await this.loadEmployeeDatacategory();
      }
      /*if(this.props.category)
        await this.loadEmployeeDatacategory()*/
      }
    /*shouldComponentUpdate(){
        let Number=0
        if(!this.props.category)
        {
            return true;
        }
      if(this.state.category.length===this.props.category.length)
      {
          for (let index = 0; index < this.state.category.length; index++) {
              if(this.props.category[index] !== this.state.category[index].Id)
              Number=index+1
          }
          if(Number>0)
          {
            return true;
          }
      }
      if(this.state.category.length!==this.props.category.length&&this.state.category.length===0)
      return true;
      return false;
      }*/
    render(){
    return(
        this.state.category.map((item,index)=>{
            return (
                <React.Fragment key={index}>
                        <Link onClick={()=>this.props.renderweb1()} to={`/Boloc?ListCategory=${item.Id}`}>{item.NameCategory} </Link>
                </React.Fragment>
        )
    })
    )
    }

}