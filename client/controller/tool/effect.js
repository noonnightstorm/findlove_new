var win = this;
win.Effect = {
	register : {
			radioStyle : function(){
			var radioLabel = $(".radio-label");
			radioLabel.click(function(e){
				var value = $(this).siblings(".form-radio").val();
				$(".selected").css("display","none");
				$(this).children(".radioBtn").children(".selected").css("display","block");
				$("#register-form-radio-row").attr("radio",value);
			});
		}
	},
	gameHall : {
		init : function(){
			win.Effect.gameHall.showMenu();
		},
		showMenu : function(){
			var arrow = $('#hall-nav-arrow');
			var navBtn = $('.nav-btn');
			var content = $('.content');
			for(var i = 0;i<navBtn.length;i++){
				navBtn.attr("num",i);
			}
			navBtn.click(function(e){
				var num = parseInt($(this).attr("num"));
				$(arrow).css({
					'margin-top':parseInt(40*(num+1)+65*num+10)+'px',
					'display':'block'
				}).animate({opacity:1},'fast');
				$(content[num]).css('display','block');
				$(content[num]).animate({opacity:1},'fast');
			});
		}
	}
}