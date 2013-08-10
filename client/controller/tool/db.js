var win = this;
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
		var _id = Rooms.insert(obj);
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
		var room = Rooms.findOne({_id:info.r_id});
		var controller = {
			room_id : info.r_id,
			owner : {
				user_id : room.owner_id,
				mv_mark : true,
				topic : {
					mark : false,
					content : null
				},
				girl_mv : {
					mark : false,
					content : null
				},
				match : false
			},
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
			light : true,
			talk_mark : false,
			mv_mark : true
		};
		Controllers.update({_id:controller._id},{$addToSet:{
			users : user
		}},true,cb);
	},
	pullControllerNum : function(info){
		var controller = Controllers.findOne({room_id:info.r_id});
		var user = {
			user_id : Cookie.get("user_id")
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
	offLight : function(user_id){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			for(var i = 0;i<controller.users.length;i++){
				if(controller.users[i].user_id == user_id){
					controller.users[i].light = false;
					Controllers.update({_id:controller._id},{$set:{
						users : controller.users
					}},true);
				}
			}
		}
	},
	initTalk : function(r_id){
		var controller = Controllers.findOne({room_id:r_id});
		if(controller){
			var talk = {
				room_id : r_id,
				owner : {
					user_id : Cookie.get("user_id"),
					content : null ,
					talk_mark : false
				},
				guest : []
			};
			for(var i = 0 ;i<controller.users.length;i++){
				var obj = {
					user_id : controller.users[i].user_id,
					content : null,
					talk_mark : false
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
				console.log("girl!!!!");
				for(var i = 0 ;i < talk.guest.length ;i++){
					if(talk.guest[i].user_id == info.user_id){
						talk.guest[i].content = info.content;
						console.log(talk.guest[i]);
						Talks.update({_id:talk._id},{$set:{
							guest : talk.guest
						}});
						break;
					}
				}
			}
		}
	},
	turnTalk : function(user_id,mark){
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		if(talk){
			//先找男生
			if(talk.owner.user_id == user_id){
				talk.owner.talk_mark = !talk.owner.talk_mark;
				Talks.update({_id:talk._id},{$set:{
					owner : talk.owner
				}});
			}
			//再找女生
			else{
				for(var i = 0 ;i < talk.guest.length ;i++){
					if(talk.guest[i].user_id == user_id){
						talk.guest[i].talk_mark = !talk.guest[i].talk_mark;
						Talks.update({_id:talk._id},{$set:{
							guest : talk.guest
						}});
						break;
					}
				}
			}
			if(mark == true){
				setTimeout(function(){
					win.db.turnTalk(user_id,false);
				},10*1000);
			}
		}
	},
	updateMVStatus : function(user_id){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			//先改男生
			if(controller.owner.user_id == Cookie.get("user_id")){
				controller.owner.mv_mark = false;
				Controllers.update({_id:controller._id},{$set:{
					owner : controller.owner
				}});
			}
			//再改女生
			else{
				for(var i = 0;i<controller.users.length;i++){
					if(controller.users[i].user_id == Cookie.get("user_id")){
						controller.users[i].mv_mark = false;
						Controllers.update({_id:controller._id},{$set:{
							users : controller.users
						}});
						break;
					}
				}
			}
			return controller;
		}
	},
	insertTopic : function(content){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			controller.owner.topic.mark = true;
			controller.owner.topic.content = content;
			Controllers.update({_id:controller._id},{$set:{
				owner : controller.owner
			}});
		}
	},
	allTalk : function(content){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		if(talk){
			talk.owner.content = null;
			talk.owner.talk_mark = true;
			for(var i = 0;i < talk.guest.length;i++){
				if(controller.users[i].light == true){
					talk.guest[i].content = null;
					talk.guest[i].talk_mark = true;
				}
				else{
					talk.guest[i].talk_mark = false;
				}
			}
			controller.owner.topic.mark = true;
			controller.owner.content = content;

			Talks.update({_id:talk._id},{$set:{
				owner : talk.owner,
				guest : talk.guest
			}});
			Controllers.update({_id:controller._id},{$set:{
				owner : controller.owner,
			}});
		}
	},
	allNoTalk : function(){
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		if(talk){
			talk.owner.content = null;
			talk.owner.talk_mark = false;
			for(var i = 0;i < talk.guest.length;i++){
				talk.guest[i].talk_mark = false;
			}
			Talks.update({_id:talk._id},{$set:{
				owner : talk.owner,
				guest : talk.guest
			}});
		}
	},
	initMV : function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			controller.owner.mv_mark = true;
			for(var i = 0;i < controller.users.length;i++){
				controller.users[i].mv_mark = true;
			}
			Controllers.update({_id:controller._id},{$set:{
				owner : controller.owner,
				users : controller.users
			}});
		}
	},
	updateGirlMV : function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			controller.owner.girl_mv.mark = true;
			Controllers.update({_id:controller._id},{$set:{
				owner : controller.owner,
			}});
		}
	},
	insertLove : function(girl_id){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		var room = Rooms.findOne({_id:Cookie.get("room_id")});
		if(controller){
			var boy = Users.findOne({_id:controller.owner.user_id});
			var girl = Users.findOne({_id:girl_id});
			Controllers.update({_id:controller._id},{$set:{
				match : true,
			}});
			var couple = {
				room_id : room._id,
				room_name : room.name,
				girl_id : girl_id,
				girl_name : girl.name,
				boy_id : controller.owner.user_id,
				boy_name : boy.name
			}
			Couples.insert(couple);
		}
	}
};