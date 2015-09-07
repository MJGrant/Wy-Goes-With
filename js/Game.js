WyGoesWith.Game = function (game) {
	this.assets = {};
};

WyGoesWith.Game.prototype = {

	create: function () {
		this.stage.backgroundColor = '#66CCFF';

		this.assets.grub = new Grub(this, game.time);

		//todo: investigate shoebox for packing button sprites

		//ui
		this.assets.foodButton = this.add.button(200, 300, 'button', this.spawnFood, this, 1, 1, 0);

		//add grub sprite and the walk and idle animations
		this.assets.grub.stateIdle();
		this.startGrubStateLoop(this.assets.grub.stateWalk);
    },

	update: function () {},

	stopGrubStateLoop: function() {
		this.time.events.stop();
		this.assets.grub.stateIdle();
		this.startGrubStateLoop(this.assets.grub.stateWalk);
	},
	startGrubStateLoop: function(animState) {
		this.time.events.start();
		this.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), animState, this.assets.grub);
	},
	spawnFood: function() {
		//place a random cake on the stage
		var foodX = getRandom(0,1024);
		var foodY = getRandom(0,768);
		this.assets.cake = this.add.sprite(foodX,foodY, 'cake');
		this.assets.grub.stateWalk(foodX, foodY);
		//todo: disable cake button until the cake is eaten
		//todo: walk wy to the cake's coordinates
	}
};
