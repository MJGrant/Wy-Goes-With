WyGoesWith.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

WyGoesWith.Preloader.prototype = {

	preload: function () {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;

		this.load.atlasJSONHash('grub', 'assets/anims/wy_spritesheet_packed.png', 'assets/anims/wy_spritesheet_packed.json');
		this.load.image('cake', 'assets/food/cake.png');

		this.load.image('fork', 'assets/ui/btnArtFood.png');
		this.load.image('square-button', 'assets/ui/hud_button_square.png');

      	},

	create: function () {

		this.state.start('Game');
	},

	update: function () {

	}

};