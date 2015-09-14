WyGoesWith.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

WyGoesWith.Preloader.prototype = {

	preload: function () {

		this.load.atlasJSONHash('grub', 'assets/anims/wy_spritesheet_packed.png', 'assets/anims/wy_spritesheet_packed.json');
		this.load.image('cake', 'assets/food/cake.png');

		//ui button icons
		this.load.image('food', 'assets/ui/btnArtFood.png');
		this.load.image('play', 'assets/ui/btnArtPlay.png');
		this.load.image('sleep', 'assets/ui/btnArtSleep.png');
		this.load.image('wash', 'assets/ui/btnArtWash.png');
		this.load.image('info', 'assets/ui/btnArtInfo.png');

		//ui button rectangles
		this.load.image('square-button', 'assets/ui/hud_button_square.png');

		//particles

      	},

	create: function () {

		this.state.start('Game');
	},

	update: function () {

	}

};