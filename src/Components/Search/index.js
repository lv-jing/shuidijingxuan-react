import React, { Component } from 'react';
import './index.css';
import axios from "axios"
import Header from "../Header"
class Search extends Component {

		constructor(){
				super();
				this.state={
						datalist:[]
				}
		}
	componentWillMount(){
		axios.get("https://www.bulaimei365.com//index.php?ctl=Index&met=getSearchKeyList&typ=json").then(res=>{
				this.setState({
							datalist:res.data.data.list
				})
		})
	}
  render() {
    return (
      <div >
      	<Header {...this.props}/>
        <div className="search-top">
        			<h3>热门搜索</h3>
        			<ul>
        				{
        					this.state.datalist.map((item,index)=>       					
        					<li key={index}  onClick={this.ssclick.bind(this,index)}>{item}</li>
        					)
        				}
        			</ul>
        </div>	
      </div>
    );
 }
    ssclick(index){
  	localStorage.setItem("type",1)
	var str=this.state.datalist[index]
	this.props.history.push("/lists/"+str)
  } 
}

export default Search;
