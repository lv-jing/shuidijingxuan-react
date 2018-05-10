import React,{Component} from "react"
import axios from "axios"
import './index.css';
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";
class Lists extends Component{
	constructor(){
		super();
		this.state={
			datalist:[],
			lists:null,
			isShow:false
		}
	}

	componentWillMount(){
		this.props.myshow();
		var a = localStorage.getItem("type")
		//判断是分类接口还是搜索接口
		axios.get(a===2?`https://www.bulaimei365.com//index.php?ctl=Goods_Goods&met=goodslist&typ=json&ua=wap&sub_site_id=0&cat_id=${this.props.match.params.id}&pagesize=10&curpage=1&firstRow=0&cat_id=${this.props.match.params.id}`:`https://www.bulaimei365.com//index.php?ctl=Goods_Goods&met=goodslist&typ=json&ua=wap&sub_site_id=0&keyword=${this.props.match.params.id}&pagesize=10&curpage=1&firstRow=0&keywords=${this.props.match.params.id}`).then(res=>{
			this.setState({
				lists:res.data.data.items
			})
			if(this.state.lists.length===0){
				this.setState({
					isShow:true
				})
			}			
		})
	}
	componentDidMount(){
			var Oul = document.getElementById('head');
			var aLi = Oul.children
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].onclick = function(){
					
					for(var j = 0; j < aLi.length; j++) {
						aLi[j].className = '';
					}
					this.className = 'act';
				}
			}
		
	}
	render(){
		return(
			<div>
      <header className="header">
            		<div className="back">
            			<NavLink to="/Classification">
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
			<div className="headd">	
				<ul className="head" id="head">
					<li id="one">
						上架时间 <i></i>
					</li>
					<li>
						销量优先
					</li>
					<li>
						筛选 <i className="iconfont icon-filter"></i>
					</li>
				</ul>
		{
			this.state.isShow?
			<div className="mysj">
				<p>数据任何相关信息</p>
				<span>选择或搜索其它商品分类/名称...</span>
				<p><NavLink to="/classification">重新选择</NavLink></p>
			</div>
			:
		<div className="content">
			<ul>
			{		this.state.lists?
					this.state.lists.map(item=>
						<li key={item.common_id} onClick={this.cli.bind(this,item.goods_id)}>
							<div className="left">
								<img src={item.common_image} alt=""/>
							</div>
							<div className="right">
								<h3>{item.common_name}</h3>
								<div>
									<span>￥{item.common_market_price}</span>
									<p>
										<span>销量:{item.common_salenum}</span>
										<span>评论:{item.common_evaluate}</span>
									</p>
								</div>
							</div>
						</li>						
					)
					:null
				}
			</ul>
			
		</div>			
		}	
	</div>		
	</div>
		)
	}
	
	cli(id){
		this.props.history.push(`/details/${id}`);
	}
	handclick(){
		
		var txt = this.refs.seachvalue.value
		//判断是分类接口还是搜索接口
		axios.get(`https://www.bulaimei365.com//index.php?ctl=Goods_Goods&met=goodslist&typ=json&ua=wap&sub_site_id=0&keyword=${txt}&pagesize=10&curpage=1&firstRow=0&keywords=${txt}`).then(res=>{
			this.setState({
				lists:res.data.data.items
			})
			if(this.state.lists.length===0){
				this.setState({
					isShow:true
				})
			}else{
				this.setState({
					isShow:false
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
		}
	}
	
	
	
)(Lists);


