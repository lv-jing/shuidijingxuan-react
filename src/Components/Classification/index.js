import React, { Component } from 'react';
import './index.css';
import axios from "axios"
import {connect} from "react-redux"

class Classification extends Component {
	constructor(){
  		super();
  		this.state={
  			datalist:[
  			{"name":"护理助手","id":"7"},
  			{"name":"彩妆/香水","id":"8"},
  			{"name":"母婴天地","id":"9"},
  			{"name":"吃吃喝喝","id":"10"},
  			{"name":"纤体保健","id":"11"},
  			{"name":"家居趣品","id":"12"},
  			{"name":"行走箱包","id":"13"},
  			{"name":"钟情珠宝","id":"14"},
  			{"name":"宠物热爱","id":"15"},
  			{"name":"汽车商品","id":"16"},
  			{"name":"其它","id":"17"},
  			],
  			cindex:0,
  			list:[]
  		}
  	}
	componentWillMount(){
		this.props.myshow();
		this.props.myheader();
	}
	
	componentDidMount(){
		axios.get(`https://www.bulaimei365.com//index.php?ctl=Goods_Cat&met=tree&typ=json&cat_parent_id=7`).then(res=>{
			this.setState({
				list:res.data.data.items
			})
		})
		
		
  }
  render() {
    return (
      <div className="cont">    
      <div className="left">
	     		<ul className="list">
	     				{
	     					this.state.datalist.map((item,index)=>
	     						<li key={item.id} onClick={this.cli.bind(this,index,item.id)} className={this.state.cindex===index? "sty":""}>
	     							<i className="iconfont icon-favoritesfilling"></i>
	     								{item.name}
	     						</li>
	     					)
	     				}
	     		</ul>
     		</div>
     		<div className="rig">
     				{
     					this.state.list.map(item=>
     						<dl key={item.cat_id}>
     							<dt>
     								<a>
     									<span></span>
     									{item.cat_name}
     									<i className="iconfont icon-more"></i>
     								</a>
     							</dt>
     							{
     								item.child.map(data=>
     									<dd key={data.id}>
     										<a onClick={this.jump.bind(this,data.id)}>{data.cat_name}</a>
     									</dd>
     								)
     							}
     						</dl>
     					)
     				}
     		</div>
      </div>
    )
  }
	
	jump(id){
		localStorage.setItem('type',2);
		this.props.history.push(`/lists/${id}`);
	}

  cli(index,id){
  	
  	this.setState({
  		cindex:index
  	})
  	axios.get(`https://www.bulaimei365.com//index.php?ctl=Goods_Cat&met=tree&typ=json&cat_parent_id=${id}`).then(res=>{
			this.setState({
				list:res.data.data.items
			})
	})
  }
}





export default connect(
	null,
	{
		myshow:()=>{
			return {
				type:"footershow"
			}
		},
		myheader:()=>{
			return {
				type:"headershow"
			}
		}
	}	
	
)(Classification);
