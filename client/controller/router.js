Meteor.Router.add({
    '/' : 'login',
    '/register' : 'register',
    '/game-hall' : function(){
    	var gender = Cookie.get("gender");
    	if(gender == "male"){
    		return "game_hall_boy";
    	}
    	else if(gender == "female"){
    		return "game_hall_girl";
    	}
    	else{
    		return "login";
    	}
    },
    '/game' : function(){
        var user_id = Cookie.get("user_id");
        var account = Cookie.get("account");
        var name = Cookie.get("name");
        if(user_id && account &&name){
            return "game";
        }
        else{
            return "login";
        }
    }
});