WyGoesWith.Game = function (game) {
	this.assets = {};
};

WyGoesWith.Game.prototype = {

	create: function () {
		this.stage.backgroundColor = '#66CCFF';

		//place a random cake on the stage
		var randX = this.getRandom(0,1024);
		var randY = this.getRandom(0,768);
		this.assets.cake = this.add.sprite(randX,randY, 'cake');

		//add grub sprite and the walk and idle animations
		this.assets.grub = this.add.sprite(300, 200, 'grub');

		this.assets.grub.animations.add('idle', Phaser.Animation.generateFrameNames('wy-idle_' , 0 ,  11, '.png', 2), 15, true);
		this.assets.grub.animations.add('walk', Phaser.Animation.generateFrameNames('wy-walk_' , 0 ,  11, '.png', 2), 15, true);

		this.grubStateIdle();
		this.startGrubStateLoop(this.grubStateWalk);
    },
	update: function () {},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	grubStateIdle: function() {
		console.log("idle state");
		this.assets.grub.animations.play('idle',30, true);
	},
	grubStateWalk: function() {
		console.log("walk state");
		this.assets.grub.animations.play('walk', 30, true);

		var tween = this.add.tween(this.assets.grub)
			.to({	x: this.getRandom(0,1024 - this.assets.grub.width),
					y: this.getRandom(0,768 - this.assets.grub.height)},
					2000, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(this.stopGrubStateLoop, this);
	},
	stopGrubStateLoop: function() {
		this.time.events.stop();
		this.grubStateIdle();
		this.startGrubStateLoop(this.grubStateWalk);
	},
	startGrubStateLoop: function(animState) {
		this.time.events.start();
		this.time.events.loop(Phaser.Timer.SECOND * 4, animState, this);
	}
};
