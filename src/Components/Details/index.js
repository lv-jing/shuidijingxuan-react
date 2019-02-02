import React,{Component} from "react"
import axios from "axios"
import ReactSwipe from 'react-swipe';
import "./index.css"
import Add from "./Add"
import {connect} from "react-redux";
import Header from "../Header"
class Details extends Component{
	 constructor(){
	 	super();
	 	this.state={
	 		imglist:[],
	 		msglist:null,
	 		dzlist:null,
	 		cflist:null,
	 		isShow:false
	 		
	 	}
	 }
	componentWillMount(){
		this.props.myshow();
		axios.get(`https://www.bulaimei365.com//index.php?ctl=Goods_Goods&met=goods&typ=json&goods_id=${this.props.match.params.id}&k=&u=&cid=&lbs_geo=province%3A%E5%B9%BF%E4%B8%9C%E7%9C%81%2Ccity%3A%E5%B9%BF%E5%B7%9E%E5%B8%82%2Cdistrict%3A%E8%B6%8A%E7%A7%80%E5%8C%BA%2Cstreet%3A%2Cstreetnumber%3A&ua=wap`).then(res=>{
			this.setState({
				imglist:res.data.data.goods_info.image_row,
				msglist:res.data.data.goods_info,
				dzlist:res.data.data.goods_hair_info,
				cflist:res.data.data.goods_info.show_goods_spec_str
			})

		})
	}
	render(){
		return(
			<div>
			<Header/>
			{
				this.state.imglist.length?
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:3000}} key={this.state.imglist.length}>
					{
						this.state.imglist.map(item=>
							<img src={item.images_image} key={item.images_id} alt=""/>
						)
					}
				</ReactSwipe>
				:null
			}
			{
				this.state.msglist?
					<div className="msg" >
						<h3 key={this.state.msglist.cat_id}>{this.state.msglist.goods_name}</h3>
						<div>
							<ul>
								<li className="price"><span>￥{this.state.msglist.common_price}</span><i>销量：{this.state.msglist.common_salenum}件</i></li>
								<li className="spm">海关商品编码：</li>
								<li className="market">市场价：<span>￥{this.state.msglist.goods_market_price}</span></li>
							</ul>
							<div className="dj">
								<span>代金卷</span>
								<p className="fz6">已领取￥5代金券; ￥5代金券; ￥38代金券...</p>
								<i className="iconfont icon-more"></i>
							</div>
							<div className="dj dz">
								<span>送至</span>
								<p>{this.state.dzlist.area_name}<span>{this.state.dzlist.if_store_cn}</span></p>
								<i className="iconfont icon-map"></i>
							</div>
								<div className="dj dz cf">
									<span>已选</span>
									<p>成份<span>{this.state.cflist.split(':')[1]}</span></p>
									<i className="iconfont icon-more"></i>
								</div>	
							</div>
					</div>
				:null
			}
			<Add />
			</div>
			
		)
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
)(Details);




