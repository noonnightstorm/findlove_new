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
    		Meteor.Router.to("/");
    	}
    }
});