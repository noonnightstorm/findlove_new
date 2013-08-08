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
	NextPart : function(controller_id){
		Controllers.update({_id:controller_id},{$inc:{
			part : 1
		}},true);
	},
	initTalk : function(r_id){
		var controller = Controllers.findOne({room_id:r_id});
		if(controller){
			var talk = {
				room_id : r_id,
				owner : {
					user_id : Cookie.get("user_id"),
					content : null
				},
				guest : []
			};
			for(var i = 0 ;i<controller.users.length;i++){
				var obj = {
					user_id : controller.users[i].user_id,
					content : null
				};
				talk.guest.push(obj);
			}
			var _id = Talks.insert(talk);
		}
	},
	deleteTalk : function(info){
		var talk = Talks.find({room_id:info.r_id});
		if(talk){
			Talks.remove({_id:talk._id});
		}
	},
	insertTalk : function(info){
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		console.log(info);
		if(talk){
			//先检查是否为拥有者
			if(talk.owner.user_id == info.user_id){
				talk.owner.content = info.content;
				Talks.update({_id:talk._id},{$set:{
					owner : talk.owner
				}});
			}
			//再检验嘉宾
			else{
				for(var i = 0 ;i < talk.guest.length ;i++){
					if(talk.guest[i].user_id == info.user_id){
						talk.guest[i].content = info.content;
						Talks.update({_id:talk._id},{$set:{
							guest : talk.guest
						}});
						break;
					}
				}
			}
		}
	}
};