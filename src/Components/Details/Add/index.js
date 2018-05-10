import React,{Component} from "react"
import "./index.css"
import {NavLink} from "react-router-dom"
class Add extends Component{
	constructor(){
		super()
		this.state={
			isShow:false
		}
	}
	render(){
		return(
			<div className="add">
				<div className="jl">
					<a onClick={this.cli.bind(this)}>加入购物车</a>
					<NavLink to="/cart">立即购买</NavLink>
				</div>
				{
					this.state.isShow ?
						<div className = "cart">	
							<span onClick = {
								() => this.setState({
									isShow: false
								})
							}>X</span>
						 	<p>
						 		<a onClick={
						 			()=>{
				this.refs.ref.value<=1?this.refs.ref.value=1:this.refs.ref.value--;
						 			}
						 		}>-</a>
						 		<input type="text" name="text" id="txt"  ref="ref" value="1"/>
						 		<a onClick={
						 			()=>{
						 				this.refs.ref.value++;
						 			}
						 		}>+</a>
						 		<i>数量</i>
						 	</p>
						 	<div className="jl">
								<a  onClick={this.getId.bind(this)}>加入购物车</a>
							<NavLink to="/cart">立即购买</NavLink>
						</div>
						</div>
						:null
				}
				
			</div>
		)
	}
	
	cli(){
		this.setState({
			isShow:true
		})
	}
	
	getId(){
		var str = window.location.href.split("/");
		var id = str[str.length-1]
		var num = this.refs.ref.value;
		var obj={
			"id":id,
			"num":Number(num)
		};
		
		if(localStorage.car){
			var count = 0;
			var arr = JSON.parse(localStorage.car)
			for(var i = 0; i < arr.length; i++){
				if(arr[i].id === obj.id){
					count++;//判断
					arr[i].num+=obj.num;
				}
			}
			
			if(count === 0){
				arr.push(obj);
			}
		}else{
			arr = [];
			arr.push(obj);
		}
		
		
		var data = JSON.stringify(arr)
		localStorage.setItem("car",data)
		
	}
	
}


export default Add;