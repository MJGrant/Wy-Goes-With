WyGoesWith.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

WyGoesWith.Preloader.prototype = {

	preload: function () {

      		this.load.atlasJSONHash('grub', 'assets/anims/wy_spritesheet_packed.png', 'assets/anims/wy_spritesheet_packed.json');
      		this.load.image('cake', 'assets/food/cake.png');

      	},

	create: function () {

		this.state.start('Game');
	},

	update: function () {

	}

};