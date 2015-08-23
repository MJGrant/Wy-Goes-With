WyGoesWith.Game = function (game) {
	this.grub;
	this.walkTimer;
};

WyGoesWith.Game.prototype = {

	create: function () {

		this.stage.backgroundColor = '#66CCFF';

		this.grub = this.add.sprite(338,228, 'grub');

		//place a random cake on the stage
		var randX = this.getRandom(0,1024);
		var randY = this.getRandom(0,768);
		this.cake = this.add.sprite(randX,randY, 'cake');

		this.restartWalkTimer();

    },

	update: function () {

	},

	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	walkGrub: function() {
		var tween = this.add.tween(this.grub)
			.to({	x: this.getRandom(0,1024 - this.grub.width),
					y: this.getRandom(0,768 - this.grub.height)},
					2000, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(this.restartWalkTimer, this);
	},

	restartWalkTimer: function() {
		this.time.events.add(Phaser.Timer.SECOND * 4, this.walkGrub, this);
	}


};