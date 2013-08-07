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
}


/*if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
