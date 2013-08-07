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
	insertUser : function(info,cb,err_cb){
		var obj = {
			username : info.name,
			account : info.account,
			password : info.pwd,
			gender : info.gender,
			profile : {
				real_name : "",
				mobile_phone: "",
				tel_phone : "", 
				birthday : "",
				standard : "",
				declaration : "",
				birthday : "",
				mv_url : ""
			}
		};
		var _id = Users.insert(obj,cb);
	},
	updateUser : function(info,cb,err_cb){
		Users.update({_id:Cookie.get("user_id")},
		{
			$set : {
				profile : {
					real_name : info.real_name,
					mobile_phone : info.mobile_phone,
					tel_phone : info.tel_phone,
					birthday : info.birthday,
					standard : info.standard,
					declaration : info.declaration,
					mv_url : info.mv_url
				}
			}
		});
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
		else{
			cb(_id);
		}
	},
	updateRoomNum : function(info,cb,err_cb){
		Rooms.update({_id:info.r_id},{$inc:{
			num : 1
		}},true,cb);
	},
	initController : function(info,cb,err_cb){
		var controller = {
			room_id : info.r_id,
			users : [info.u_id]
		};
		Controllers.insert(controller);
	},
	updateControllerNum : function(info,cb,err_cb){
		cb();
	}
};