var win = this;
if (Meteor.isClient) {
	Template.login.events({
		"blur #login-account" : win.VerifyHadnler.loginVerify.account,
		"blur #login-pwd" : win.VerifyHadnler.loginVerify.pwd,
		"submit #login-form" : win.VerifyHadnler.loginCheck
	});
	Template.register.rendered = win.Effect.register.radioStyle;
	Template.register.events({
		"blur #register-account" : win.VerifyHadnler.registerVerify.account,
		"blur #register-name" : win.VerifyHadnler.registerVerify.name,
		"blur #register-pwd" : win.VerifyHadnler.registerVerify.pwd,
		"blur #register-comfirm-pwd" : win.VerifyHadnler.registerVerify.comfirmPwd,
		"submit #register-form" : win.VerifyHadnler.addUser
	});
	Template.game_hall_boy.rendered = win.Effect.gameHall.init;
	Template.game_hall_girl.rendered = win.Effect.gameHall.init;
	Template.game_hall_boy.events({
		"submit #new-room-form" : win.RoomHandler.addRoom,
		"submit #personal-info-form" : win.HallHandler.updatePersonInfo,
		"click .hall-enter-btn" : win.RoomHandler.enterRoom
	});
	Template.game_hall_girl.events({
		"submit #personal-info-form" : win.HallHandler.updatePersonInfo,
		"click .hall-enter-btn" : win.RoomHandler.enterRoom
	});
	Template.game.rendered = win.Effect.Game.init;
	Template.game.events({
		"click .game-quit-btn" : win.RoomHandler.exitRoom,
		"click .game-start-btn" : win.GameHandler.run,
		"click #game-talk-btn" : win.GameHandler.talk
	});
}