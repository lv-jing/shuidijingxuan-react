import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import {NavLink} from "react-router-dom"

class Cart extends Component {
	  	constructor(){
  		super();
  		this.state={
  			datalist:[],
        arr:[]
  		}
  	}
    componentWillMount(){
      var arr1 = JSON.parse(localStorage.car)
      this.setState({
        arr:arr1
      })
    }
  	componentDidMount(){
  		var list=[];
  		if(this.state.arr){this.state.arr.map(item=>
          axios.get(`https://www.bulaimei365.com//index.php?ctl=Goods_Goods&met=goods&typ=json&goods_id=${item.id}`)
          .then(res=>{
            
            list.push(res.data.data.goods_info)

            this.setState({
              datalist:[...list]
            },function(){
            })
          })

        )}
  	}

  render() {

        
   return (
      
       <div >
          <header id="header" className="fixed">
            <div className="header-wrap">
                <div className="header-l">
                    <NavLink to=""><i className="back"></i></NavLink>
                </div>
                <div className="header-title">
                    <h1>购物车</h1>
                </div>
                
                <div className="header-r">
                    <i className="more"></i>
                </div>
            </div>
            
        </header>
      {
        this.state.datalist.length?
        
          <div className="nctouch-main-layout">
            <div className="mb50" id="cart-list-wp">
            
              <div className="nctouch-cart-container">
                    <ul className="nctouch-cart-item">
                      {
                        
                        this.state.datalist.map((item,index)=>
                    <li cart_id="1783" className="cart-litemw-cnt" key={item.id} ref={"show"+index}>
                                <div className="buy-li">
                                    <div className="goods-check">
                                        <input type="checkbox" ref={"checkbox"+index} onClick={this.click.bind(this,index,item.goods_price)}/>
                                    </div>
                                    <div className="goods-pic" onClick={this.handleClick.bind(this,item.goods_id)}>
                                            <img src={item.goods_image} alt=""/>
                                    </div>
                                    <dl className="goods-info" >
                                        <dt className="goods-name">
                                            <a>{item.goods_name}</a>
                                        </dt>
                                        <dd className="goods-type"></dd>
                                        <span className="goods-price">￥<em>{item.goods_price}</em></span>
                                        <span className="fr nums">{JSON.parse(localStorage.car)[index].num}</span>
                                        <span className="goods-sale">
                                        
                                        </span>
                                    </dl>
                                    <div className="edit-area">
                                     <div className="goods-subtotal">
                                        
                                        <div className="value-box">
                                                <span className="minus">
                                                    <a onClick={this.minus.bind(this,index,item.goods_price)}>&nbsp;</a>
                                                </span>
                                                {
                                            //s 获取并设置限购数量 2017.5.2 
                                              }
                                                <span>
                                                    
                                                    <input type="number" min="1" className="buy-num buynum"  ref={"count"+index} value={JSON.parse(localStorage.car)[index].num} onChange={this.handleClick}/>
                                                {
                                            //s 获取并设置限购数量 2017.5.2 
                                              }
                                                </span>
                                                <span className="add">
                                                    <a onClick={this.add.bind(this,index,item.goods_price)}>&nbsp;</a>
                                                </span>
                                                <i className="delete" onClick={this.del.bind(this,index)}>删除</i>
                                        </div>
                                    </div>
                                    </div>
                                   
                                </div>
                            </li>                         
                          )
                          
                          
                      }
                      
                    
                    </ul>
              </div>
                            <div className="nctouch-cart-bottom">
                <input type="checkbox" className="checkall" ref="checkall" onClick={this.checkall.bind(this)} />全选
                <span className="totalprice">合计总金额：<span className="price">￥<span ref="price">{this.state.sum}</span></span></span>
                <span className="payment">去付款(<span className="count"></span>)</span>
              </div>
            </div>
          </div>
              :
            <div>
                  <h1 className="h1">购物车为空</h1>
                  <NavLink to="./home" className="cartlink">随便逛逛</NavLink>
                </div>      
      }

  </div>
    
  )    
  }
    
  handleClick(id){
  	this.props.history.push(`/home/${id}`);
  }
  minus(index,price){
  	var count = "count"+index;
  	var checkbox = "checkbox"+index;
    var arr = JSON.parse(localStorage.car)
    if(arr[index].num>1){arr[index].num--}
    
    
    var newarr = JSON.stringify(arr)

    localStorage.setItem("car",newarr)

  	if(this.refs[count].value>1){
  		this.refs[count].value--;
  		  if(this.refs[checkbox].checked){
  		this.refs.price.innerText=(Number(Number(this.refs.price.innerText).toFixed(2))-Number(price)).toFixed(2)
  	}

  	}
  }
  add(index,price){
  	var count = "count"+index;
  	var checkbox = "checkbox"+index;
        var arr = JSON.parse(localStorage.car)
    arr[index].num++
    var newarr = JSON.stringify(arr)

    localStorage.setItem("car",newarr)

  	this.refs[count].value++
  if(this.refs[checkbox].checked){
  		this.refs.price.innerText=(Number(Number(this.refs.price.innerText).toFixed(2))+Number(price)).toFixed(2)
  	}
   }
  click(index,price){
  	var count = "count"+index;
  	var checkbox = "checkbox"+index;
  if(this.refs[checkbox].checked){
  		this.refs.price.innerText=Number(this.refs.price.innerText)+Number(this.refs[count].value)*price
  	}else{
  		this.refs.price.innerText=(Number(this.refs.price.innerText)-Number(this.refs[count].value)*price).toFixed(2);
  		this.refs.checkall.checked = false;
  	}
  }
  checkall(){
  	var sum = 0;
  	
  	if(this.refs.checkall.checked){
  		for(var attr in this.refs){
  			this.refs[attr].checked = true;
  			
  		}
  			
  			
  			this.state.datalist.map((item,index)=>
  			
  				sum +=item.goods_price*(JSON.parse(localStorage.car)[index].num)
  			
  			)
  		
  		this.refs.price.innerText=sum;
  	}else{
  		for(var att in this.refs){
  			this.refs[att].checked = false;
  		}
  		this.refs.price.innerText=0;
  	}
  }
  del(index){
    var arr = JSON.parse(localStorage.car)
    arr.splice(index,1)
  	var newarr = JSON.stringify(arr)

  	localStorage.setItem("car",newarr)
  	window.location.reload()
  }
}

export default Cart;
