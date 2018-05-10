import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom"

import React from "react"
import App from "../Components/App"
import Home from "../Components/Home"
import Cart from "../Components/Cart"
import Classification from "../Components/Classification"
import Login from "../Components/Login"
import Register from "../Components/Register"
import Me from "../Components/Me"
import Footerbar from "../Components/Footerbar"
import Lists from "../Components/Lists"
import Details from "../Components/Details"
import Search from "../Components/Search"
import {Provider} from "react-redux"
import store from "../Redux/Store"
//路由配置文件

const router = (
 <Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/register" component={Register}/>
					<Route path="/footerbar" component={Footerbar}/>
					<Route path="/home" component={Home}/>
					<Route path="/search" component={Search}/>
					<Route path="/classification" component={Classification}/>
					<Route path="/cart" component={Cart}/>
					<Route path="/me" component={Me}/>
					<Route path="/lists/:id" component={Lists}/>
					<Route path="/lists" component={Lists}/>
					<Route path="/details/:id" component={Details}/>
					<Redirect from="/" to="/home"/>
				</Switch>
			</App>
		</Router>
</Provider>	
)

export default router;