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
			Cookie.set("name",data.name);
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
		var form = e.target,
		info = {
			name : form.name.value
		},
		cb = function(id){
			var c_info = {
				r_id : id,
				u_id : Cookie.get("user_id");
			},
			c_cb = function(){
				Meteor.Router.to("/game");
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
			console.log("callback");
			var c_info = {
				r_id : info.r_id,
				u_id : Cookie.get("user_id")
			},
			c_cb = function(){
				Meteor.Router.to("/game");
			},
			c_err_cb = function(){
				//later
			};
			win.db.updateControllerNum(c_info,c_cb,c_err_cb);
		},
		err_cb = function(){
			//later
		};
		win.db.updateRoomNum(info,cb,err_cb);
	}
};