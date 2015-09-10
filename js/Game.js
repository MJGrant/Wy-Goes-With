WyGoesWith.Game = function (game) {
	this.grub;
};

WyGoesWith.Game.prototype = {

	create: function () {
		this.stage.backgroundColor = '#66CCFF';

		this.grub = new WyGoesWith.Grub(this.game, game.time);

		//todo: investigate shoebox for packing button sprites

		//ui
		this.foodButton = this.add.button(200, 300, 'button', this.spawnFood, this, 1, 1, 0);

		//add grub sprite, make him idle, and kick off the loop that will make him walk when the timer's up

		this.grub.stateIdle();
		//this.grub.startGrubStateLoop();
		this.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.grub.stateWalk, this.grub);
    },

	update: function () {},

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
