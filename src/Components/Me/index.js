import React, { Component } from 'react';
import './index.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
class Me extends Component {
	constructor(){
		super();
		this.state={
			num:''

		}
	}
	componentWillMount(){
		this.props.myshow();
		this.props.myheader();
	}
  render() {
    return (
      <div className="me">
      	<div className="url">
      		<NavLink to="/home"><i className="iconfont icon-back"></i></NavLink>	
      		<div className="box">
      			<p>{document.cookie.split("=")[1]}</p>
      			{
      				document.cookie.split("=")[1]?
      				<a onClick={this.click.bind(this)}><NavLink to="login">点击注销</NavLink></a>
      				:<NavLink to="login">点击登录</NavLink>
      			}
      		</div>				
      	</div>
      	<div className="login-box">
      		<span>
      			<em>0</em>
      			<p>商品收藏</p>
      		</span>
      		<span>
      			<em>0</em>
      			<p>店铺收藏</p>
      		</span>
       		<span>
      			<em>0</em>
      			<p>我的足迹</p>
      		</span>     	
      	</div>
      	
      	<div className="mg"></div>
      	
      	<div className="member">
      			<div className="member-box">
      					<h3>我的订单</h3>
      					<i className="iconfont icon-more"></i>
      					<h5>查看全部订单</h5>
      			</div>
      			<ul>
      				<li>
      					<i className="iconfont icon-trade"></i>
      					<p>代付款</p>
      				</li>
      				<li>
      					<i className="iconfont icon-store"></i>
      					<p>代发货</p>
      				</li>
      				<li>
      					<i className="iconfont icon-store"></i>
      					<p>代收货</p>
      				</li>
      				<li>
      					<i className="iconfont icon-comments"></i>
      					<p>待评论</p>
      				</li>
      				<li>
      					<i className="iconfont icon-folder"></i>
      					<p>退款/退货</p>
      				</li>
      			</ul>
      	</div>
      <div className="mg"></div>
      <div className="pay">
      	<div className="pay-box">
      		<em className="iconfont icon-jifen"></em>
      		<h3>我的财产</h3>
      		<i className="iconfont icon-more"></i>
      		<h5>查看全部订单</h5>
      	</div>
      	<div className="pay-box">
      		<em className="iconfont icon-jifen"></em>
      		<h3>代金券</h3>
      		<i className="iconfont icon-more"></i>
      	</div>
      	<div className="pay-box">
      		<em className="iconfont icon-jifen"></em>
      		<h3>用户地址管理</h3>
      		<i className="iconfont icon-more"></i>
      	</div>
      	<div className="pay-box">
      		<em className="iconfont icon-jifen"></em>
      		<h3>用户设置</h3>
      		<i className="iconfont icon-more"></i>
      	</div>
      </div>
      </div>
    );
  }
		click(){
				document.cookie="phone= "
		}
}

export default connect(
	null,
	{
		myshow:()=>{
			return{
				type:"footershow"
			}
		},
		myheader:()=>{
			return {
				type:"headerhide"
			}
		}
	}
	
)(Me);
