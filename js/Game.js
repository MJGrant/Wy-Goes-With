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

		this.assets.grub.anchor.setTo(.5,1);
		this.grubStateIdle();
		this.startGrubStateLoop(this.grubStateWalk);
    },
	update: function () {},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	grubStateIdle: function() {
		this.assets.grub.animations.play('idle',30, true);
	},
	grubStateWalk: function() {
		var grub = this.assets.grub;
		grub.animations.play('walk', 30, true);
		//get his next idling destination as a point
		var randX = this.getRandom(0,1024 - grub.width);
		var randY = this.getRandom(0,768 - grub.height);

		var currentPos = new Phaser.Point(grub.x, grub.y);
		var walkDest = new Phaser.Point(randX, randY);
		//calculate the time it should take him to walk based on the distance between where he is and where he is going
		var time = Phaser.Point.distance(currentPos, walkDest) * 5;
		console.log(time);
		//flip him to face the direction he walks in
		if (grub.x > randX) {
			grub.scale.x = 1;
		} else {
			grub.scale.x = -1;
		}
		//tween it!
		var tween = this.add.tween(grub)
			.to({	x: randX,
					y: randY},
					time, Phaser.Easing.Linear.None, true);

		tween.onComplete.add(this.stopGrubStateLoop, this);
	},
	stopGrubStateLoop: function() {
		console.log("stopping grub state loop");
		this.time.events.stop();
		this.grubStateIdle();
		this.startGrubStateLoop(this.grubStateWalk);
	},
	startGrubStateLoop: function(animState) {
		console.log("starting grub state loop");
		this.time.events.start();
		this.time.events.loop(Phaser.Timer.SECOND * this.getRandom(2,4), animState, this);
	}
};
