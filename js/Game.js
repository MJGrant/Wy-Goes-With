WyGoesWith.Game = function (game) {
	this.grub;
	this.ui = {};
	this.stageItems = {};
};

WyGoesWith.Game.prototype = {

	create: function () {
		this.stage.backgroundColor = '#66CCFF';

		this.grub = new WyGoesWith.Grub(this.game, game.time);

		//todo: investigate shoebox for packing button sprites

		//ui
		this.ui.foodButton = new WyGoesWith.Button(this.game, 200, 300, 'button', this.spawnFood, this.game);
		//this.foodButton.activate();

		//add grub sprite, make him idle, and kick off the loop that will make him walk when the timer's up

		this.grub.stateIdle();
		this.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.grub.stateWalk, this.grub);
    },

	update: function () {},

	spawnFood: function() {
		//place a random cake on the stage
		var foodX = getRandom(0,1024);
		var foodY = getRandom(0,768);
		this.stageItems.cake = this.add.sprite(foodX,foodY, 'cake');
		this.grub.stateWalk(foodX, foodY);
		//this.foodButton.deactivate();
		//todo: disable cake button until the cake is eaten
		//todo: walk wy to the cake's coordinates
	}
};
