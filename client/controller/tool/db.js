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
				mobile_phone: null,
				tel_phone : null, 
				standard : null,
				declaration : null,
				birthday : null
			}
		};
		Users.insert(obj,cb);
	},
	insertRoom : function(info,cb,err_cb){
		var obj = {
			name : info.name,
			owner : Cookie.get("name"),
			num : 1
		};
		var _id = Rooms.insert(obj,cb);
		if(!_id){
			err_cb();
		}
	}
};