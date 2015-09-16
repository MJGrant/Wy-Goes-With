WyGoesWith.Game = function (game) {
	this.grub;
	this.ui = {};
	this.stageItems = {};
};

WyGoesWith.Game.prototype = {

	create: function () {
		this.WyGameScale = new Phaser.ScaleManager(game, window.innerWidth, window.innerHeight);
		this.WyGameScale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.WyGameScale.setResizeCallback(function() {
			console.log("resizing is happening");
		}, this);

		this.stage.backgroundColor = '#66CCFF';

		this.grub = new WyGoesWith.Grub(this.game, game.time);

		//todo: investigate shoebox for packing button sprites

		//ui
		var stageCenter = game.world.width / 2;
		var uiButtonY = game.world.height - 70; //subtract button height plus a bit more

		//food
		this.ui.foodButton = new WyGoesWith.UIButton(game, stageCenter - 300, uiButtonY, 'food', 'square-button',
			this.spawnFood, this, 0, 0, 0, 0);
		this.ui.foodButton.activate();

		//play
		this.ui.playButton = new WyGoesWith.UIButton(game, stageCenter - 150, uiButtonY, 'play', 'square-button',
			this.spawnBall, this, 0, 0, 0, 0);
		this.ui.playButton.activate();

		//sleep
		this.ui.sleepButton = new WyGoesWith.UIButton(game, stageCenter, uiButtonY, 'sleep', 'square-button',
			this.spawnPillow, this, 0, 0, 0, 0);
		this.ui.sleepButton.activate();

		//wash
		this.ui.bathButton = new WyGoesWith.UIButton(game, stageCenter + 150, uiButtonY, 'wash', 'square-button',
			this.spawnBath, this, 0, 0, 0, 0);
		this.ui.bathButton.activate();

		//info
		this.ui.infoButton = new WyGoesWith.UIButton(game, stageCenter + 300, uiButtonY, 'info', 'square-button',
			this.openInfo, this, 0, 0, 0, 0);
		this.ui.infoButton.activate();

		//add grub sprite, make him idle, and kick off the loop that will make him walk when the timer's up
		this.grub.stateIdle();
		this.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.grub.stateWalk, this.grub);
    },

	update: function () {
	},

	spawnFood: function() {
		console.log("spawning food");
		//place a random cake on the stage
		var foodX = getRandom(0,1024);
		var foodY = getRandom(0,768);
		this.stageItems.cake = this.add.sprite(foodX,foodY, 'cake');
		this.grub.stateWalk(foodX, foodY, this.stageItems.cake);
		this.ui.foodButton.deactivate();
	},

	spawnBall: function() {
		console.log("spawning ball");
	},

	spawnPillow: function() {
		console.log("spawning pillow");
	},

	spawnBath: function() {
		console.log("spawning bath");
	},

	openInfo: function() {
		console.log("opening info pane");
	}
};
