var header = (prevstate=true,data={})=>{
	
	let {type} = data;
	
	switch(type){
		case "headershow":
			return true;
		case "headerhide":
			return false;		
		default:
			return prevstate;		
	}
	
 
	
}

export default header;