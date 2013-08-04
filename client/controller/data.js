if (Meteor.isClient) {
	Template.game_hall_boy.room = function(){
		return Rooms.find({});
	};
	Template.game_hall_girl.room = function(){
		return Rooms.find({});
	};
}


/*if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
