WyGoesWith.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

WyGoesWith.Preloader.prototype = {

	preload: function () {

		this.load.image('grub', 'assets/grub/grub.png')
		this.load.image('cake', 'assets/food/cake.png');

	},

	create: function () {

		this.state.start('Game');
	},

	update: function () {

	}

};