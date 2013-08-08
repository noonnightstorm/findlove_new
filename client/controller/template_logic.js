Template.game.checkIniRoom_logic = function(part){
	var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
	if(controller){
		if(controller.part == part)
			return true;
		else
			return false;
	}
}