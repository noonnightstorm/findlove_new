this.db = {
	selectUser : function(info,cb,err_cb){
		var user = Users.findOne({account:info.account,password:info.password});
		if(user){
			if(user.account == info.account && user.password == info.password){
				cb(user);
			}
			else{
				err_cb();
			}
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
				mv_url : "",
				new_mark : true
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
					mv_url : info.mv_url,
					new_mark : false
				}
			}
		});
	},
	cencelNewMark : function(){
		Users.update({_id:Cookie.get("user_id")},
		{
			$set : {
				profile : {
					real_name : "",
					mobile_phone: "",
					tel_phone : "", 
					birthday : "",
					standard : "",
					declaration : "",
					birthday : "",
					mv_url : "",
					new_mark : false
				}
			}
		});
	},
	insertRoom : function(info,cb,err_cb){
		var obj = {
			name : info.name,
			owner : Cookie.get("name"),
			owner_id : Cookie.get("user_id"),
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
	addRoomNum : function(info,cb,err_cb){
		Rooms.update({_id:info.r_id},{$inc:{
			num : 1
		}},true,cb);
	},
	reduceRoomNum : function(info){
		Rooms.update({_id:info.r_id},{$inc:{
			num : -1
		}},true);
	},
	deleteRoom : function(info){
		Rooms.remove({_id:info.r_id});
	},
	initController : function(info,cb,err_cb){
		var controller = {
			room_id : info.r_id,
			part : 0,
			users : []
		};
		var _id = Controllers.insert(controller);
		if(!_id){
			err_cb();
		}
		else{
			cb();
		}
	},
	addControllerNum : function(info,cb,err_cb){
		var controller = Controllers.findOne({room_id:info.r_id});
		var user = {
			user_id : Cookie.get("user_id"),
			light : true
		};
		Controllers.update({_id:controller._id},{$addToSet:{
			users : user
		}},true,cb);
	},
	pullControllerNum : function(info){
		var controller = Controllers.findOne({room_id:info.r_id});
		var user = {
			user_id : Cookie.get("user_id"),
			light : true
		};
		Controllers.update({_id:controller._id},{$pull:{
			users : user
		}},true);
	},
	deleteController : function(info){
		var controller = Controllers.find({room_id:info.r_id});
		if(controller){
			Controllers.remove({_id:controller._id});
		}
	},
	NextPart : function(id){
		Controllers.update({_id:controller._id},{$inc:{
			part : 1
		}},true);
	}
};