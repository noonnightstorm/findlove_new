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
		var cb = function(){
			Cookie.set("name",info.name);
			Cookie.set("account",info.account);
			Cookie.set("gender",info.gender);
			console.log(document.cookie);
			Meteor.Router.to("/game-hall");
		};
		win.db.insertUser(info,cb);
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