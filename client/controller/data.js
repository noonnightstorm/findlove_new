var win = this;
if (Meteor.isClient) {
	Template.game_hall_boy.room = function(){
		return Rooms.find({});
	};
	Template.game_hall_boy.myself = function(){
		return Users.findOne({_id : Cookie.get("user_id")});
	};
	Template.game_hall_boy.couple = function(){
		return Couples.find({});
	};
	Template.game_hall_girl.room = function(){
		return Rooms.find({});
	};
	Template.game_hall_girl.myself = function(){
		console.log(Users.findOne({_id : Cookie.get("user_id")}));
		return Users.findOne({_id : Cookie.get("user_id")});
	};
	Template.game_hall_girl.couple = function(){
		return Couples.find({});
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
	};
	Template.game.talk = function(){
		var talk = Talks.findOne({room_id : Cookie.get("room_id")});
		if(talk){
			return talk;
		}
	};
	Template.game.MaddZodiacClass= function(owner){
		var obj = win.Constellation.analysis(owner.profile.birthday);
		if(obj){
			return "zodiac-num-" + obj.mark;
		}
	};
	Template.game.MaddZodiacText = function(owner){
		var obj = win.Constellation.analysis(owner.profile.birthday);
		if(obj){
			return obj.feature;
		}
	};
	Template.game.FaddZodiac = function(){
		var obj = win.Constellation.analysis(this.profile.birthday);
		if(obj){
			return obj;
		};
	};
	Template.game.maleTalk = function(){
		var talk = Talks.findOne({room_id : Cookie.get("room_id")});
		if(talk){
			return talk.owner.content;
		}
	};
	Template.game.femaleTalk = function(){
		var girl = this;
		var talk = Talks.findOne({room_id : Cookie.get("room_id")});
		if(talk && girl){
			for(var i = 0;i < talk.guest.length;i++){
				if(girl._id == talk.guest[i].user_id){
					return talk.guest[i].content;
				}
			}
		}
		return "";
	};
	Template.game.showPartTips = function(){
		//填好提示
		var tips = [
			"请各位酝酿感情，游戏准备开始！",
			"男嘉宾自我介绍！",
			"女嘉宾发问环节！",
			"观看男嘉宾MV！",
			"请男嘉宾选择话题！",
			"男女嘉宾自由讨论！",
			"男嘉宾选择女嘉宾的MV！",
			"请观看女生的MV！",
			"选择心动女生!",
			"游戏结束，请大家有序离场！"
		];
		var controller = Controllers.findOne({room_id:Cookie.get("room_id")});
		if(controller){
			if(controller.part == 0){
				return tips[0];
			}
			else if(controller.part == 1){
				return tips[1];
			}
			else if(controller.part == 2){
				return tips[2];
			}
			else if(controller.part == 3){
				return tips[3];
			}
			else if(controller.part == 4){
				if(controller.owner.topic.mark == false){
					return tips[4];
				}
				else{
					return tips[5];
				}
			}
			else if(controller.part == 5){
				return tips[6];
			}
			else if(controller.part == 6){
				if(controller.owner.girl_mv.mark == true)
					return tips[7];
			}
			else if(controller.part == 7){
				return tips[8];
			}
			else if(controller.part == 8){
				return tips[9];
			}
		}
	}
}


/*if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
