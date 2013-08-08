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
	Template.game.owner = function(){
		var room = Rooms.findOne({_id:Cookie.get("room_id")});
		if(room){
			var owner = Users.findOne({_id:room.owner_id});
			return owner;
		}
	};
	Template.game.users = function(){
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			var users = [];
			for(var i = 0;i < controller.users.length;i++){
				var user = Users.findOne({_id:controller.users[i].user_id});
				users.push(user);
			}
			return users;
		}
	};
	Template.game.userId = function(){
		var user_id = Cookie.get("user_id");
		var room_id = Cookie.get("room_id");
		var controller = Controllers.findOne({room_id:room_id});
		var i = 0;
		if(controller){
			for(;i<controller.users.length;i++){
				if(user_id == controller.users[i])
					return ;
			}
		}
		return "game-person-" + i;
	};
	Template.game.talk = function(){
		var talk = Talks.findOne({room_id:Cookie.get("room_id")});
		if(talk){
			return talk
		}
	}
}


/*if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
