var win = this;
Template.game.checkIniRoom_logic = function(part){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == part)
			return true;
		else
			return false;
	}
};

Template.game.checkMale = function(){
	var gender = Cookie.get("gender");
	if(gender && gender == "male"){
		return true;
	}
	return false;
};
Template.game.checkTalkInput = function(){
	var user_id = Cookie.get("user_id");
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	var talk = Talks.findOne({room_id : Cookie.get("room_id")});
	if(talk && controller && user_id){
		//先找男生
		if(talk.owner.user_id == user_id){
			if(talk.owner.talk_mark == true)
				return true;
		}
		//再找女生
		else{
			for(var i = 0; i < talk.guest.length; i++){
				if(talk.guest[i].user_id == user_id){
					if(talk.guest[i].talk_mark == true && controller.users[i].light == true)
						return true;
				}
			}
		}
	}
	else
		return false;
};
Template.game.checkMaleTalk = function(){
	var talk = Talks.findOne({room_id : Cookie.get("room_id")});
	if(talk){
		if(talk.owner.content != null && talk.owner.content != ""){
			return true;
		}
	}
	return false;
};
Template.game.checkFemaleTalk = function(){
	var girl = this;
	var talk = Talks.findOne({room_id:Cookie.get("room_id")});
	if(talk && girl){
		for(var i = 0;i < talk.guest.length;i++){
			if(girl._id == talk.guest[i].user_id && talk.guest[i].content != null && talk.guest[i].content != ""){
				return true;
			}
		}
	}
	return false;
};
Template.game.checkLight = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		for(var i = 0;i<controller.users.length;i++){
			if(controller.users[i].user_id == this._id){
				return controller.users[i].light;
			}
		}
	}
	return false;
};
Template.game.checkThirdPart = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 3){
			//先检查男生
			if(controller.owner.user_id == Cookie.get("user_id")){
				return controller.owner.mv_mark;
			}
			//再检查女生
			else{
				for(var i = 0 ;i < controller.users.length;i++){
					if(controller.users[i].user_id == Cookie.get("user_id")){
						return controller.users[i].mv_mark;
					}
				}
			}
		}
	}
	return false;
};
Template.game.checkForthPart = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 4 && Cookie.get("gender") == "male" && controller.owner.topic.mark == false){
			return true;
		}
	}
	return false;
};
Template.game.checkMVBtn = function(){
	var girl = this;
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		for(var i = 0;i < controller.users.length ; i++){
			if(controller.users[i].user_id == girl._id && controller.users[i].light == true && controller.part == 5 && Cookie.get("gender") == "male"){
				return true;
			}
		}
	}
	return false;
};
Template.game.checkGirlMV = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 6){
			//先检查男生
			if(controller.owner.user_id == Cookie.get("user_id")){
				return controller.owner.mv_mark;
			}
			//再检查女生
			else{
				for(var i = 0 ;i < controller.users.length;i++){
					if(controller.users[i].user_id == Cookie.get("user_id")){
						return controller.users[i].mv_mark;
					}
				}
			}
		}
	}
	return false;
};
Template.game.checkLove = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 7 && Cookie.get("gender") == "male"){
			return true;
		}
	}
	return false;
};
Template.game.findLove = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	var couple = Couples.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 8 && controller.match == true){
			if(couple.girl_id == Cookie.get("user_id") || couple.boy_id == Cookie.get("user_id")){
				return true;
			}
		}
	}
	return false;
};
Template.game.guestLove = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	var couple = Couples.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 8 && controller.match == true){
			if(couple.girl_id != Cookie.get("user_id") && couple.boy_id != Cookie.get("user_id")){
				return true;
			}
		}
	}
	return false;
};
Template.game.loseLove = function(){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == 8 && controller.match == false){
			return true;
		}
	}
	return false;
};