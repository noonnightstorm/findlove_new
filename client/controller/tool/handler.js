var win = this;
win.VerifyHadnler = {
	loginVerify : {
		account : function(e){
			verify(e.target,6,"账户不能少于6位哦，亲！","login-notice","login-notice-account");
		},
		pwd : function(e){
			verify(e.target,6,"密码不能少于6位哦，亲！","login-notice","login-notice-pwd");
		}
	},
	registerVerify : {
		account : function(e){
			verify(e.target,6,"账户不能少于6位哦，亲！","register-notice","register-notice-account");
		},
		name : function(e){
			verify(e.target,1,"名字不能空哦，亲！","register-notice","register-notice-name");
		},
		pwd : function(e){
			verify(e.target,6,"密码不能少于6位哦，亲！","register-notice","register-notice-pwd");
		},
		comfirmPwd : function(e){
			var notice = $("#notice");
			var tips = $("#tips");
			notice.removeClass();
			if($("#register-pwd").val()!=$("#register-comfirm-pwd").val()){
				notice.css("display","block").addClass("register-notice").addClass("register-notice-comfirm-pwd");
				tips.text("密码看起来怎么不同了？");
			}
			else{
				notice.css("display","none");
			}
		}
	},
	loginCheck : function(e){
		e.preventDefault();
		var form = e.target
		,info = {
			account : form.account.value,
			password : form.password.value
		},
		cb = function(data){
			Cookie.set("user_id",data._id);
			Cookie.set("name",data.username);
			Cookie.set("account",data.account);
			Cookie.set("gender",data.gender);
			Meteor.Router.to("/game-hall");
		},
		err_cb = function(){
			var notice = $("#notice");
			var tips = $("#tips");
			notice.removeClass();
			notice.css("display","block").addClass("login-notice").addClass("login-notice-pwd");
			tips.text("密码错误");
		};
		win.db.selectUser(info,cb,err_cb);
	},
	addUser : function(e){
		e.preventDefault();
		//verify
		var account = document.getElementById("register-account");
		var name = document.getElementById("register-name");
		var pwd = document.getElementById("register-pwd");
		var comfirmPwd = document.getElementById("register-comfirm-pwd");
		var gender = $("#register-form-radio-row").attr("radio");
		if(account.value.length<6){
			verify(account,6,"账户不能少于6位哦，亲！","register-notice","register-notice-account");
			return false;
		}
		else if(name.value.length<1){
			verify(name,1,"名字不能空哦，亲！","register-notice","register-notice-name");
			return false;
		}
		else if(pwd.value.length<6){
			verify(pwd,6,"密码不能少于6位哦，亲！","register-notice","register-notice-pwd");
			return false;
		}
		else if(pwd.value != comfirmPwd.value){
			var notice = $("#notice");
			var tips = $("#tips");
			notice.removeClass();
			notice.css("display","block").addClass("register-notice").addClass("register-notice-comfirm-pwd");
			tips.text("密码看起来怎么不同了？");
			return false;
		}
		else if(!gender){
			var notice = $("#notice");
			var tips = $("#tips");
			notice.removeClass();
			notice.css("display","block").addClass("register-notice").addClass("register-notice-comfirm-pwd");
			tips.text("此处不承认双性者!");
			return false;
		}
		var info = {
			account : account.value,
			name : name.value,
			pwd : pwd.value,
			comfirmPwd : comfirmPwd.value,
			gender : gender
		};
		//insert
		var cb = function(err,id){
			Cookie.set("user_id",id);
			Cookie.set("name",info.name);
			Cookie.set("account",info.account);
			Cookie.set("gender",info.gender);
			Meteor.Router.to("/game-hall");
		},
		err_cb = function(){
			//later
		};
		win.db.insertUser(info,cb,err_cb);
	}
};
function verify(obj,length,text,baseClass,addClass){
	var notice = $("#notice");
	var tips = $("#tips");
	notice.removeClass();
	if(obj.value.length < length){
		notice.css("display","block").addClass(baseClass).addClass(addClass);
		tips.text(text);
	}
	else{
		notice.css("display","none");
	}
}


win.HallHandler = {
	updatePersonInfo : function(e){
		e.preventDefault();
		var form = e.target,
		info = {
			real_name : form.real_name.value,
			tel_phone : form.tel_phone.value,
			moblie_phone : form.moblie_phone.value,
			birthday : form.birthyear.value+"-"+form.birthmonth.value+"-"+form.birthday.value,
			standard : form.standard.value,
			declaration : form.declaration.value,
			mv_url : form.mv.value || ""
		},
		cb = function(){
			//later
		},
		err_cb = function(){
			//later
		};
		win.db.updateUser(info,cb,err_cb);
	}
};
win.RoomHandler = {
	addRoom : function(e){
		e.preventDefault();
		//检测资料
		var user = Users.findOne({_id:Cookie.get("user_id")});
		var profile = user.profile;
		if(profile.real_name==""||profile.birthday==""||profile.standard==""||profile.declaration==""){
			alert("请完善个人资料再创建房间");
			return ;
		}

		var form = e.target,
		info = {
			name : form.name.value
		},
		cb = function(id){
			var c_info = {
				r_id : id,
				u_id : Cookie.get("user_id")
			},
			c_cb = function(){
				if(id){
					Cookie.set("room_id",id);
					Meteor.Router.to("/game");
				}
			},
			c_err_cb = function(){
				//later
			};
			win.db.initController(c_info,c_cb,c_err_cb);
		},
		err_cb = function(){
			//deal with the problem
		};
		win.db.insertRoom(info,cb,err_cb);
	},
	enterRoom : function(e){
		var info = {
			r_id : $(e.target).attr("r_id")
		},
		cb = function(){
			var c_info = {
				r_id : info.r_id,
				u_id : Cookie.get("user_id")
			},
			c_cb = function(){
				Cookie.set("room_id",info.r_id);
				Meteor.Router.to("/game");
			},
			c_err_cb = function(){
				//later
			};
			win.db.addControllerNum(c_info,c_cb,c_err_cb);
		},
		err_cb = function(){
			//later
		};
		//检测资料
		var user = Users.findOne({_id:Cookie.get("user_id")});
		var profile = user.profile;
		if(profile.real_name==""||profile.birthday==""||profile.standard==""||profile.declaration==""){
			alert("请完善个人资料再进入房间");
			return ;
		}
		win.db.addRoomNum(info,cb,err_cb);
	},
	exitRoom : function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			//只能在开始和结束离开
			if(controller.part == 0 || controller == 6){
				//女生离场
				if(Cookie.get("gender") == "female"){
					var info = {
						r_id : controller.room_id
					};
					win.db.pullControllerNum(info);
					win.db.reduceRoomNum(info);
					Meteor.Router.to("/game-hall");
				}
				//男生离场
				else{
					var info = {
						r_id : controller.room_id
					};
					win.db.deleteRoom(info);
					win.db.deleteController(info);
					win.db.deleteTalk(info);
					Meteor.Router.to("/game-hall");
				}
				Cookie.set("room_id",undefined);
			}
			else{
				alert("不能中途离场");
			}
		}
	}
};

win.GameHandler = {
	game : [
		"ready",
		"introduction",
		"girlQA",
		"boyMV",
		"topic",
		"showMVBtn",
		"girlMV",
		"choiceGirl",
		"gameOver"
	],
	run : function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			var handler = win.GameHandler;
			var cb = function(){
				win.db.NextPart(controller._id);
				win.GameHandler.run();
			};
			handler[handler.game[controller.part]](cb);
		}
	},
	ready : function(cb){
		var room_id = Cookie.get("room_id");
		if(room_id){
			win.db.initTalk(room_id);
			cb();
		}
	},
	introduction : function(cb){
		var talk = Talks.findOne({room_id : Cookie.get("room_id")});
		var room_id = Cookie.get("room_id");
		if(talk && room_id){
			win.db.turnTalk(talk.owner.user_id,false);
		}	
		setTimeout(function(){
			win.db.turnTalk(talk.owner.user_id,false);
			cb();
		},3*1000);
	},
	girlQA : function(cb){
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(talk){
			function girlTalk(count,obj){
				setTimeout(function(){
					for(var i = count;i < controller.users.length;i++){
						if(controller.users[count].light == true){
							win.db.turnTalk(obj.guest[count].user_id,true);
							break;
						}
						else{
							count++;
						}
					}
					if(obj.guest.length<=count){
						cb();
						return;
					}
					girlTalk(count+1,obj);
				},3*1000);
			}
			if(talk.guest.length > 1){
				for(var i = 0;i < controller.users.length;i++){
					if(controller.users[i].light == true){
						win.db.turnTalk(talk.guest[i].user_id,true);
						break;
					}
				}
				if(i+1 >= controller.users.length){
					setTimeout(cb,10*1000);
				}
				else{
					girlTalk(i+1,talk);
				}
			}
			else{
				if(controller.users[0].light == true){
					win.db.turnTalk(talk.guest[0].user_id,true);
				}
				setTimeout(cb,3*1000);
			}
		}
	},
	boyMV : function(cb){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			setTimeout(function(){
	
				//检验是否跳过这个环节
				var mark = true;
				//先检验男生
				if(controller.owner.mv_mark == true){
					mark = false;
				}
				//再检验女生
				else{
					for(var i = 0;i < controller.users.length ;i++){
						if(controller.users[i].mv_mark == true){
							mark = false;
							break;
						}
					}
				}

				//处理结果
				if(mark == true &&controller.part == 3){
					cb();
				}
			},5*60*1000);
		}
	},
	topic : function(cb){
		setTimeout(function(){
			cb();
		},5*1000);
	},
	showMVBtn : function(cb){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			win.db.allNoTalk();
			setTimeout(function(){
				if(controller.part == 5){
					cb();
				}
			},10*1000);
		}
	},
	girlMV : function(cb){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			setTimeout(function(){
				//检验是否跳过这个环节
				var mark = true;
				//先检验男生
				if(controller.owner.mv_mark == true){
					mark = false;
				}
				//再检验女生
				else{
					for(var i = 0;i < controller.users.length ;i++){
						if(controller.users[i].mv_mark == true){
							mark = false;
							break;
						}
					}
				}

				//处理结果
				if(mark == true &&controller.part == 3){
					cb();
				}
			},5*60*1000);
		}
	},
	choiceGirl : function(cb){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			setTimeout(function(){
				if(controller.part ==7 && controller.match == false){
					cb();
				}
			},5*1000);
		}
	},
	gameOver : function(cb){
		console.log("gameOver");
	},
	lightOff : function(e){
		var target = $(e.target);
		var u_id = target.parents(".game-girl-all").attr("u_id");
		var user_id = Cookie.get("user_id");
		if(user_id && user_id == u_id){
			win.db.offLight(user_id);
		}
	},
	talk : function(){
		var talk = {
			user_id : Cookie.get("user_id"),
			content : $("#game-talk-input").val()
		};
		$("#game-talk-input").val("");
		win.db.insertTalk(talk);
		setTimeout(function(){
			var talk = {
				user_id : Cookie.get("user_id"),
				content : null
			};
			win.db.insertTalk(talk);
		},3000);
	},
	finishMV: function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			var controller = win.db.updateMVStatus(Cookie.get("user_id"));
			//检验是否跳过这个环节
			var mark = true;
			//先检验男生
			if(controller.owner.mv_mark == true){
				mark = false;
			}
			//再检验女生
			for(var i = 0;i < controller.users.length ;i++){
				if(controller.users[i].mv_mark == true){
					mark = false;
					break;
				}
			}
			console.log(controller);
			console.log(mark);
			//处理结果
			if(mark == true){
				win.db.NextPart(controller._id);
				win.GameHandler.run();
			}	
		}
	},
	choiceTopic : function(e){
		e.preventDefault();
		var form = $(e.target);
		var topic = form.attr("radio");

		//init Talk
		win.db.allTalk(topic);
	},
	addGirlMV : function(){
		win.db.initMV();
		win.db.updateGirlMV();
	},
	choiceLove : function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			var girl = this;
			win.db.insertLove(girl._id);
			win.db.NextPart(controller._id);
			win.GameHandler.run();
		}
	},
	backToHall : function(){
		Meteor.Router.to("/game-hall");
	}
};