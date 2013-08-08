if (Meteor.isClient) {
	Template.game_hall_boy.room = function(){
		return Rooms.find({});
	};
	Template.game_hall_boy.myself = function(){
		return Users.findOne({_id : Cookie.get("user_id")});
	};
	Template.game_hall_girl.room = function(){
		return Rooms.find({});
	};
	Template.game_hall_girl.myself = function(){
		return Users.findOne({_id : Cookie.get("user_id")});
	};
	Template.game.room = function(){
		return Rooms.findOne({_id:Cookie.get("room_id")});
	};
	Template.game.controller = function(){
		return Controllers.findOne({room_id:Cookie.get("room_id")});
	};
	Template.game.users = function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		var users = [];
		for(var i = 0;i < controller.users;i++){
			var user = Users.findOne({_id:controller.users[i]});
			users.push();
		}	
		return users;
	};
}


/*if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
