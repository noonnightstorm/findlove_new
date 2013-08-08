var win = this;
win.ATemplate = {
	hall_tutorail_box : [
		'<div class="hall-tutorial-box">',
			'<div class="tutorial-content">',
				'<p></p>',
				'<button class="tutorial-next-btn hall-all-btn">下一步</button>',
			'</div>',
			'<div class="tutorial-box-tail-border">',
				'<div class="tutorial-box-tail"></div>',
			'</div>',
		'</div>'
	].join(''),
	game_zodiac_box : [
		'<div class="game-zodiac-box game-all-image" zodiac-num="">',
			'<div class="game-zodiac-intro">',
				'<h2>星座特点：</h2>',
				'<div class="zodiac-intro-text"></div>',
				'<div class="game-scroll-btn-down game-scroll-btn"></div>',
				'<div class="game-scroll-btn-up game-scroll-btn"></div>',
				'<div class="zodiac-tail-border">',
					'<div class="zodiac-tail"></div>',
				'</div>',
			'</div>',
		'</div>'
	].join(''),

	game_dialog : [
		'<div class="game-dialog">',
			'<div class="game-scroll-btn-up game-scroll-btn"></div>',
			'<div class="game-scroll-btn-down game-scroll-btn"></div>',
			'<div class="game-dialog-text"></div>',
			'<div class="dialog-tail-border">',
				'<div class="dialog-tail"></div>',
			'</div>',
		'</div>'
	].join('')
};