import React, { Component } from 'react';
import './index.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
class Footerbar extends Component {
	  	constructor(){
  		super();
  		this.state={
  			
  		}
  	}
  render() {	
    return (
       <div className="footer">
       			{
       				this.props.myfooter?
 				<ul className="list">
					<li><NavLink to="/home" activeClassName="active">
						<i className="iconfont icon-discount"></i>
						<h3>首页</h3>
					</NavLink></li>
					<li><NavLink to="/classification" activeClassName="active">
						<i className="iconfont icon-all"></i>
						<h3>分类</h3>
					</NavLink></li>
					<li><NavLink to="/cart" activeClassName="active">
						<i className="iconfont icon-cart"></i>
						<h3>购物车</h3>
					</NavLink></li>
					<li><NavLink to="/me" activeClassName="active">
						<i className="iconfont icon-account"></i>
						<h3>我的</h3>
					</NavLink></li>
				</ul>
				
				:null
				
       		}
			
		</div>
    )   		

  }
}

export default connect(
	
	(state)=>{
			return {
					myfooter:state.footerReducer
			}
	}
	
	
)(Footerbar);
