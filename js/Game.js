WyGoesWith.Game = function (game) {
	this.grub;
	this.uiButtonHeight = 70;
	this.bgDecor = {};
	this.ui = {};
	this.stageItems = {};
};

WyGoesWith.Game.prototype = {

	create: function () {

		//keep game running when the browser isn't in focus
		this.stage.disableVisibilityChange = true;

		//setup stage background
		this.stage.backgroundColor = '#66CCFF';
		this.bgDecor.cloud1 = this.add.sprite(10, 0, 'cloud1');
		this.bgDecor.cloud2 = this.add.sprite(150, -45, 'cloud2');
		this.bgDecor.cloud3 = this.add.sprite(800, -10, 'cloud3');

		var game = this.game;

		//establish window-resizing capabilities and methods
		this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.game.scale.setResizeCallback(function () {
			this.stage.height = window.innerHeight;
			//Phaser.canvas.height = window.innerHeight;
			this.repositionUI(this.ui);

			var height = window.innerHeight;
			var width = window.innerWidth;
			game.width = width;
			game.height = height;

			if (game.renderType === Phaser.WEBGL)
			{
				game.renderer.resize(width, height);
			}

		}, this);

		//make a grub
		this.grub = new WyGoesWith.Grub(this.game, game.time);

		//todo: investigate shoebox for packing button sprites

		//set up ui
		var stageCenter = game.world.width / 2;
		var buttonScale = .70;
		this.uiButtonY = game.world.height - this.uiButtonHeight; //subtract button height plus a bit more

		this.ui.foodButton = new WyGoesWith.UIButton(game, stageCenter - 300, this.uiButtonY, 'food', 'square-button', buttonScale, this.spawnFood, this, 0, 0, 0, 0);
		this.ui.foodButton.activate();

		//play
		this.ui.playButton = new WyGoesWith.UIButton(game, stageCenter - 150, this.uiButtonY, 'play', 'square-button', buttonScale, this.spawnBall, this, 0, 0, 0, 0);
		this.ui.playButton.activate();

		//sleep
		this.ui.sleepButton = new WyGoesWith.UIButton(game, stageCenter, this.uiButtonY, 'sleep', 'square-button', buttonScale,
			this.spawnPillow, this, 0, 0, 0, 0);
		this.ui.sleepButton.activate();

		//wash
		this.ui.bathButton = new WyGoesWith.UIButton(game, stageCenter + 150, this.uiButtonY, 'wash', 'square-button', buttonScale, this.spawnBath, this, 0, 0, 0, 0);
		this.ui.bathButton.activate();

		//info
		this.ui.infoButton = new WyGoesWith.UIButton(game, stageCenter + 300, this.uiButtonY, 'info', 'square-button', buttonScale, this.openInfo, this, 0, 0, 0, 0);
		this.ui.infoButton.activate();

		//add grub sprite, make him idle, and kick off the loop that will make him walk when the timer's up
		this.grub.stateIdle();
		this.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.grub.stateWalk, this.grub);
    },

	update: function () {
	},

	repositionUI: function(ui) {
		/*
		for (var button in ui) {
			ui[button].y = this.stage.height - 70;
		}*/
		var newUIButtonY = this.stage.height - 70;
		ui.foodButton.y = newUIButtonY;
		ui.playButton.y = newUIButtonY;
		ui.sleepButton.y = newUIButtonY;
		ui.bathButton.y = newUIButtonY;
		ui.infoButton.y = newUIButtonY;
	},

	spawnFood: function() {
		console.log("spawning food");
		//place a random cake on the stage
		var foodX = getRandom(0,window.innerWidth);
		var foodY = getRandom(0,window.innerHeight);
		var foodType = 'snack';
		this.stageItems.food = new WyGoesWith.Food(game, foodX, foodY, foodType);
		this.grub.stateWalk(foodX, foodY, this.stageItems.food);
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
