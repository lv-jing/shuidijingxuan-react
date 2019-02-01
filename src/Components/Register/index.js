import React,{Component} from 'react';
import './index.css';
import axios from "axios"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
class Register extends Component {
	constructor(){
		super();
		this.state={
			str:"",
			isShow:false,
			yzm:""

		}
	}
	componentWillMount(){
		this.props.myshow();
		this.props.myheader();
	}
	componentDidMount() {
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var mathRandom = [];
		for(var i = 0; i <= 3; i++) {
			mathRandom.push(arr[Math.floor(Math.random() * arr.length)])
		}
		var yzm = mathRandom
		var str = ""
		for(var j = 0;j<yzm.length;j++){
			str+=yzm[j]
		}
		this.setState({
			yzm: str
		})	
		
	}
	render() {
		return(
	<div id="Register">
       	<div className="log">
				<NavLink to="/login">
					<i className="iconfont icon-back"></i>
				</NavLink>
      			<span>注册账户</span>
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
      	 		 	<div className="from">
      	 		 		<i className="iconfont icon-accountfilling"></i>
      	 		 		<input type="text" placeholder="您的手机号" ref="namevalue" onBlur={this.namevalue.bind(this)} />
      	 		 	</div>
      	 		 	<div className="from">
      	 		 		<i className="iconfont icon-bags"></i>
      	 		 		   <input type="password" ref="psvalue"  placeholder="6-16位数字和字母的组合" onBlur={this.psvalue.bind(this)}/>
      	 		 	</div>
      	 		 	<div className="from">
      	 		 		<i className="iconfont icon-bags"></i>
      	 		 		<input  type="password" placeholder="强再次输入密码" ref="pswdvalue" onBlur={this.pswdvalue.bind(this)}/>
      	 		 	</div>
      	 		 	<div className="from">
      	 		 		<i className="iconfont icon-bags"></i>
      	 		 		<input type="text"  placeholder="请输入验证码" ref="yzmvalue" onBlur={this.yzmvalue.bind(this)}/>
      	 		 		<span className="yzm" onClick={(e)=>{    	 		 		
      	 		 			var newmathRandom = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      	 		 			var mathRandom = [];
      	 		 			for(var i = 0; i <= 3; i++) {
      	 		 				mathRandom.push(newmathRandom[Math.floor(Math.random() * newmathRandom.length)])
      	 		 			}
							var yzm = mathRandom
							var str = ""
							for(var j = 0;j<yzm.length;j++){
								str+=yzm[j]
							}
							console.log(str)
							this.setState({
								yzm: str
							})
      	 		 		}}>{this.state.yzm}</span>
      	 		 	</div>
      	 		 	<button onClick={this.handclick.bind(this)}>点击注册</button>
      	 		 </div>
				</div>
				<div className="regist">
					<p>
						<NavLink to="/login"><span>已有账号请登陆</span></NavLink>
					</p>
				</div>
	</div>
		);
	}
	//验证手机号账户
	namevalue(){
		if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.refs.namevalue.value)){
			console.log("验证成功")
			this.setState({				
				isShow: false
			})		
		}else{
			console.log("验证失败")
			this.refs.namevalue.value=""
			this.setState({
				str:"手机号不能为空或者手机号格式错误",
				isShow:true
			})
			
		}
	}
	//验证密码
	psvalue(){
		if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.refs.psvalue.value)){
			console.log("验证成功")
			console.log(this.state.yzm)
			this.setState({				
				isShow: false
			})
		}else{
			console.log("验证失败")
			this.refs.psvalue.value=""
			this.setState({
				str:"密码不能为空或者密码格式错误",
				isShow:true
			})
			
		}		
	}
	//验证输入密码
	pswdvalue() {
		if(this.refs.pswdvalue.value !== this.refs.psvalue.value){
			console.log("验证失败")
			this.refs.pswdvalue.value = ""
			this.setState({
				str: "密码不能为空或者两次密码不一样",
				isShow: true
			})
		}else{
			console.log("密码正确")

			this.setState({
				isShow: false
			})
		}
	}
	//确认验证码输入
	yzmvalue() {
		var str =this.refs.yzmvalue.value.split()
		var yzm = this.state.yzm
		console.log(str,yzm)
		if(str[0]==yzm){
			console.log("验证成功")
			this.refs.yzmvalue.value = this.state.yzm
			this.setState({
				isShow: false
			})
		}else{
			console.log("验证失败")
			this.setState({
				str: "验证码不能为空或者验证码错误",
				isShow: true
			})
		}
	}
	//点击注册跳转首页
	handclick(){
		var str = this.refs.namevalue.value
		var str1 = this.refs.psvalue.value
		var str2 = this.refs.pswdvalue.value
		var str3 = this.refs.yzmvalue.value
		if(str!==""&&str1!==""&&str2!==""&&str3!==""){
			this.setState({
				isShow: false
			})
			axios.post("/register", {
			phone: this.refs.namevalue.value,
			pass: this.refs.psvalue.value
			
		}).then(res => {
			if(res.data === true) {
				this.setState({
					isShow: false
				})
				this.props.history.push("/login")
			} else {
				this.setState({
					str: "账户重复",
					isShow: true
				})
			}
		})		
			
		}else{
			this.setState({
				str: "信息不完善",
				isShow: true
			})
		}
		

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
	
)(Register);