import React, { Component } from 'react';
import './index.css';
import Swiper from "swiper";
import axios from "axios";
import {connect} from "react-redux";
class Home extends Component {
	constructor(){
		super();
		this.state ={
			looplist:[],
			navlist:[],
			imageUrl:"",
			imageUrl1:"",
			goodslist:[]
		}
	}
		
	componentWillMount(){
		this.props.myheader();
		this.props.myshow();
	}
	componentDidMount(){
		setTimeout(function(){
			var mySwiper1 = new Swiper ('#swiper1', {
          	slidesPerView: 3,
          // 分页器
	        pagination: {
	            el: '.swiper-pagination',
	            type: 'fraction'
	          }
	        })        
	        var mySwiper2 = new Swiper ('#swiper2', {
	          slidesPerView: 5,
	        })        
	        var mySwiper3 = new Swiper ('#swiper3', {
	          loop:true,
	          pagination: {
	            el: '.swiper-pagination',
	            type: 'bullets'
	          }
	        })
	                

	    },500)
		//获取轮播图、商品推荐等数据
		axios.get("https://www.bulaimei365.com//index.php?ctl=Index&met=index&typ=json&ua=wap&sub_site_id=0&page=1")
		.then(res=>{
			this.setState({
				looplist:res.data.data.module_data[0].slider_list.item,
				imageUrl:res.data.data.module_data[1].home1.image,
				imageUrl1:res.data.data.module_data[3].home1.image,
				goodslist:res.data.data.module_data[2].goods.item
			})
		})
				axios.get("https://www.bulaimei365.com//index.php?ctl=Index&met=index&typ=json&ua=wap&sub_site_id=0&page=2")
		.then(res=>{

			})

		axios.get("https://www.bulaimei365.com//index.php?ctl=Goods_Cat&met=cat&typ=json&cat_parent_id=0")
		.then(res=>{

			this.setState({
				navlist:res.data.data.items
			})
		})
	}
  render() {
    return (
      <div >
      		{
      			//导航栏
      		}
		<div className="swiper-container nav_list" id="swiper2">
		    <div className="swiper-wrapper">
		      {
		        this.state.navlist.map(item=>
		          <div className="swiper-slide" key={item.id} onClick={this.handclick.bind(this,item.cat_id
)}>
		          		{item.name}
		          </div>
		        )
		      }
		    </div>
		</div>
      		{
      			//轮播
      		}
		<div className="swiper-container nav_list" id="swiper3">
		    <div className="swiper-wrapper">

				{
					this.state.looplist.map(item=>
						<div className="swiper-slide" key={item.image}><img src={item.image}  alt=""/></div>
					)
				}
		    </div>
		    <div className="swiper-pagination"></div>
		</div>
			{
				//优惠中心
			}
		<div className="nav-middle">
			<ul>
			<li><i className="discounts"></i><p>优惠中心</p></li>
				<li><i className="groupon"></i><p>团购中心</p></li>
				<li><i className="shop"></i><p>店铺精选</p></li>
				<li><i className="myshop"></i><p>我的小店</p></li>
			</ul>
		</div>
		<div className="hot_sell">
			<img src={this.state.imageUrl} alt=""/>
		</div>
		{
			//热销商品信息
		}
		<div className="swiper-container" id="swiper1">
		    <div className="swiper-wrapper">
		      {
		        this.state.goodslist.map(item=>
		          <div className="swiper-slide" key={item.goods_id} onClick={this.click.bind(this,item.goods_id
)}>
		              <img src={item.goods_image}  alt=""/>
		              <h5>{item.goods_name}</h5>
		              <p>￥{item.goods_promotion_price}</p>
		          </div>
		        )
		      }
		    </div>
		    <div className="swiper-pagination"></div>
		</div>

		<div className="hot_sell cream">
			<img src={this.state.imageUrl1} alt=""/>
		</div>
		  <div className="swiper-container" id="swiper4">
		    <div className="swiper-wrapper">
		    </div>
		    <div className="swiper-scrollbar"></div>
		  </div>

      </div>

    );
  }
  handclick(id){
  		localStorage.setItem('type',2);
		this.props.history.push(`/lists/${id}`);
  }
  click(id){
  	this.props.history.push(`/details/${id}`);
  }
}

export default connect(
	null,
	{
		myheader:()=>{
			return {
				type:"headershow"
			}
		},
		myshow:()=>{
			return {
				type:"footershow"
			}
		}
	}
	
)(Home);
