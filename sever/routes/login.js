var express = require('express');
var router = express.Router();
var Usermodel = require('../model/user');
/* GET home page. */
router.get('/',function(req,res,next) {
  res.render('login');
});


router.post('/',function(req,res){
	
	isrep = false
	console.log(req.body)
	Usermodel.find({
		username: req.body.phone,
		password: req.body.password
	}, function(err, data) {
	    console.log(data,333)
		if(!err) {
			if(data.length == 0) {
				res.send(isrep);
			} else {
				res.cookie("phone", data[0].username, {
					path: '/',
					maxAge: 1000 * 3600
				});
				isrep = true
				res.send(isrep);
			}
		}
	})
})
module.exports = router;
