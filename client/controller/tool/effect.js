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
		newMark : true,
		helpMark : true,
		init : function(){
			win.Effect.gameHall.showMenu();
			win.Effect.gameHall.showHelp();
		},
		showMenu : function(){
			var arrow = $('#hall-nav-arrow');
			var navBtn = $('.nav-btn');
			var content = $('.content');
			for(var i = 0;i<navBtn.length;i++){
				$(navBtn[i]).attr("num",i);
			}
			$(navBtn).click(function(){
				var num = parseInt($(this).attr('num'));
				if(win.Effect.gameHall.newMark){
					$(arrow).css({
						'margin-top':parseInt(40*(num+1)+65*num+10)+'px',
						'display':'block'
					}).attr("num",num).animate({opacity:1},'fast');
					$(content[num]).css('display','block').animate({opacity:1},'fast');
					win.Effect.gameHall.newMark = false;
				}
				else{
					var curNum = parseInt(arrow.attr("num"));
					$(arrow).animate({marginTop:parseInt(40*(num+1)+65*num+10)+'px'},'fast');
					if( curNum != num ){
						$(content[curNum]).animate({opacity:0},'fast',function(){
							$(this).css('display','none');
						});
						$(content[num]).css('display','block').animate({opacity:1},'fast');
						arrow.attr("num",num);
					}
				}
			});
		},
		showHelp : function(){
			$('#hall-help').click(function(){
				if(win.Effect.gameHall.helpMark){
					$('#hall-help').animate({marginLeft:'600px'},'fast',function(){
						win.Effect.gameHall.helpMark = false;
						$('.hidden-arrow').css({
							'-webkit-transform':'rotate(180deg)',
							'-moz-transform':'rotate(180deg)',
							'-o-transform':'rotate(180deg)',
							'transform':'rotate(180deg)'
						});
					});
				}
				else{
					$('#hall-help').animate({marginLeft:'0px'},'fast',function(){
						win.Effect.gameHall.helpMark = true;
						$('.hidden-arrow').css({
							'-webkit-transform':'rotate(0deg)',
							'-moz-transform':'rotate(0deg)',
							'-o-transform':'rotate(0deg)',
							'transform':'rotate(0deg)'
						});
					});
				}
			});
		}
	}
}