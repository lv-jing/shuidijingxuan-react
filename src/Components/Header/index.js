import React, { Component } from 'react';
import './index.css';
import {NavLink} from "react-router-dom"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
class Header extends Component {
	
		constructor(){
				super();
				this.state={
						
				}
		}

  render() {
    return (
      <div >
      {
      		this.props.myheader?
      		<header className="header">
            		<div className="back">
            			<NavLink to="/home">
            				<i className="iconfont icon-back"></i>
            			</NavLink>
            		</div>
            	
            			<div className="search">
            				<i className="iconfont icon-moreunfold"></i>
            				<input type="text" placeholder="请输入搜索关键词" id="search-inpt" ref="seachvalue"/>
            			</div>
            		<div className="rights">
            			<a onClick={this.handclick.bind(this)}>搜索</a>
            		</div>
        </header>
        :null
      }

        	
      </div>
    );
  }
  
   handclick(){ 	
	var txt = this.refs.seachvalue.value
	localStorage.setItem('type',1);
	this.props.history.push("/lists/"+txt)
  }

  
  
  
}

export default connect(
	(state)=>{
		return{
			myheader:state.headerReducer
		}
	}
	
)(withRouter(Header));
