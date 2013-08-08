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
	else
		return false;
};
Template.game.MaddZodiacClass_logic= function(owner){
	var obj = win.Constellation.analysis(owner.profile.birthday);
	var obj;
	if(obj){
		return "zodiac-num-" + obj.mark;
	}
};
Template.game.MaddZodiacText_logic = function(owner){
	var obj = win.Constellation.analysis(owner.profile.birthday);
	var obj;
	if(obj){
		return obj.feature;
	}
};
Template.game.FaddZodiac_logic = function(){
	var obj = win.Constellation.analysis(this.profile.birthday);
	if(obj){
		return obj;
	}
};

Template.game.checkFirstPart = function(part){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == part)
			return true;
		else
			return false;
	}
};
Template.game.talk = function(){
	var talk = Talks.findOne({room_id : Cookie.get("room_id")});
	if(talk){
		return talk;
	}
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