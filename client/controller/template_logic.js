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