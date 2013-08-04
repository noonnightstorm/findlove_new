this.db = {
	selectUser : function(info,cb,err_cb){
		var user = Users.findOne({account:info.account,password:info.password});
		if(user.account == info.account && user.password == info.password){
			cb(user);
		}
		else{
			err_cb();
		}
	},
	insertUser : function(info,cb){
		var obj = {
			username : info.name,
			account : info.account,
			password : info.pwd,
			gender : info.gender,
			profile : {
				real_name : null,
				phone_num : null,
				standard : null,
				declaration : null,
				birthday : null
			}
		};
		Users.insert(obj,cb);
	}
};