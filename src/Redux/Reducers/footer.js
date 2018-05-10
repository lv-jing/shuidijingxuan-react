var footer = (prevstate=true,data={})=>{
	
	let {type} = data;
	
	switch(type){
		case "footershow":
			return true;
		case "footerhide":
			return false;		
		default:
			return prevstate;		
	}
	
	
}

export default footer;