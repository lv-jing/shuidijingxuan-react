import React, { Component } from 'react';
import './index.css';
import axios from "axios"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";
class Login extends Component {
	constructor(){
		super();
		this.state={
			isShow:false,
			str:''
		}
	}
	componentWillMount(){
		this.props.myshow();
		
		this.props.myheader();
	}
  render() {
    return (
      <div id="Login">
      <div className="log">
				<NavLink to="/me">
						<i className="iconfont icon-back"></i>
				</NavLink>
      			<span>账户登录</span>
      </div>
      <div className="log-box">
      {
      	this.state.isShow?
      	<div className="msg-wrap">
      	  	<div className="msg-error"><b></b>{this.state.str}</div>
      	</div>
      	:null
      }

 		 <div className="mc">
 		 	<div className="froms">
 		 		<i className="iconfont icon-accountfilling"></i>
 		 		<input type="text" placeholder="邮箱/用户名/已验证手机" ref="usersvalue" onBlur={this.usersvalue.bind(this)}/>
 		 	</div>
 		 	<div className="froms">
 		 		<i className="iconfont icon-bags"></i>
 		 		   <input name="password"  placeholder="密码" ref="passwordValue" onBlur={this.passwordValue.bind(this)}/>
 		 	</div>
 		 	<button onClick={this.handclick.bind(this)}>点击登录</button>
 		 </div>
      </div>
		<div className="regist">
			<p>
				<NavLink to="/register"><span>立即注册</span></NavLink>|
				<span>忘记密码</span></p>
		</div>
      </div>
    );
  }
	//验证手机号账户
	usersvalue(){
		if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.refs.usersvalue.value)){
			console.log("验证成功")
			this.setState({				
				isShow: false
			})
			
		}else{
			console.log("验证失败")
			this.refs.usersvalue.value=""
			this.setState({
				str:"手机号不能为空或者手机号格式错误",
				isShow:true
			})
			
		}
	}
	//输入密码验证
	passwordValue(){
		if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.refs.passwordValue.value)){
			console.log("验证成功")
			this.setState({				
				isShow: false
			})
			
		}else{
			console.log("验证失败")
			this.refs.passwordValue.value=""
			this.setState({
				str:"密码不能为空或者密码格式错误",
				isShow:true
			})
			
		}		
	}
	//点击登录跳转
  handclick(){
	axios.post('/login', {
		phone: this.refs.usersvalue.value,
		password: this.refs.passwordValue.value
	}).then((res) => {
			if(res.data===true){
				this.setState({
				isShow: false
				})
				this.props.history.push("/home")
			}else{
				this.setState({
					str:"手机或密码错误",
					isShow: true
				})	
			}	
	})
}
}
export default connect(
	
	null,
	{
		myshow:()=>{
			return {
				type:"footerhide"
			}
		},
		myheader:()=>{
			return {
					type:"headerhide"
				}
			}
	}
)(Login);
