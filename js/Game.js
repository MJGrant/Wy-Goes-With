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
		this.grub = new WyGoesWith.Grub(this.game);

		//attach input listeners to grub
		this.grub.events.onInputDown.add(function() {
			this.grubStatePickedUp;
		});
		this.grub.events.onInputUp.add(function() {
			this.grubStateFall;
		});
		this.grub.input.enableDrag(true);


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
		this.startGrubLoop();
    },

	update: function () {
	},

	getRandomWalkPoint: function() {
		return new Phaser.Point(
			getRandom(50,900 - this.width),
			getRandom(100,740 - this.height));
	},

	grubStateWalk: function(x, y, target) {
		this.time.events.stop();
		this.grub.walk();
		var currentPos = new Phaser.Point(this.grub.x, this.grub.y);
		var walkDest;
		//use x and y if they exist, otherwise pick a random point (he's idling)
		if (x && y) {
			walkDest = new Phaser.Point((x + this.grub.width / 2), (y + this.grub.height / 2));
		} else {
			walkDest = this.getRandomWalkPoint();
		}
		//console.log("Walking to x: " + walkDest.x + " y: " + walkDest.y);

		//calculate the time it should take him to walk based on the distance between where he is and where he is going
		var timeToWalk = Phaser.Point.distance(currentPos, walkDest) * 5;

		this.grub.setFacing(walkDest);

		//tween it! when the tween is done, stop the grub state loop
		var tween = this.game.add.tween(this.grub)
			.to({
				x: walkDest.x,
				y: walkDest.y
			},
			timeToWalk, Phaser.Easing.Linear.None, true);

		if (target) {
			console.log("walking to target: ", target);
			this.target = target;
			//does wy have a target object? if so, do stuff here (for now it's just food, should be expanded to a variety of target objects later)
			tween.onComplete.add(this.grubStateEat, this);
		} else {
			//no target? he's just idling
			tween.onComplete.add(this.startGrubLoop, this);
		}
	},

	grubStateIdle: function() {
		this.grub.idle();
	},

	grubStatePickedUp: function() {
		this.pauseGrubLoop();
		this.grub.pickedUp();
	},

	grubStateFall: function() {
		console.log("grub falling");
		this.pauseGrubLoop();
		this.grub.fall();
		this.game.add.tween(this.grub)
			.to({
				x: this.grub.x,
				y: this.grub.y + 150
			},
			300, Phaser.Easing.Exponential.None, true);
	},

	grubStateEat: function(target) {
		this.pauseGrubLoop();
		this.target.destroy();
		this.grubStateIdle();
		this.enableUI();
		this.startGrubLoop();
	},

	pauseGrubLoop: function() {
		this.time.events.stop();
	},

	startGrubLoop: function() {
		this.time.events.stop();
		this.time.events.start();
		this.grubStateIdle();
		game.time.events.loop(Phaser.Timer.SECOND * getRandom(3,5), this.grubStateWalk, this);
	},

	repositionUI: function(ui) {
		var newUIButtonY = this.stage.height - 70;
		ui.foodButton.y = newUIButtonY;
		ui.playButton.y = newUIButtonY;
		ui.sleepButton.y = newUIButtonY;
		ui.bathButton.y = newUIButtonY;
		ui.infoButton.y = newUIButtonY;
	},

	spawnFood: function() {
		var foodX = getRandom(0,window.innerWidth);
		var foodY = getRandom(0,window.innerHeight);
		var foodType = 'snack';
		this.stageItems.food = new WyGoesWith.Food(game, foodX, foodY, foodType);
		this.grubStateWalk(foodX, foodY, this.stageItems.food);
		this.disableUI();
	},

	spawnBall: function() {
		console.log("spawning ball");
		this.disableUI();
	},

	spawnPillow: function() {
		console.log("spawning pillow");
		this.disableUI();
	},

	spawnBath: function() {
		console.log("spawning bath");
		this.disableUI();
	},

	openInfo: function() {
		console.log("opening info pane");
		this.disableUI();
	},

	disableUI: function() {
		this.ui.foodButton.deactivate();
		this.ui.playButton.deactivate();
		this.ui.sleepButton.deactivate();
		this.ui.bathButton.deactivate();
		this.ui.infoButton.deactivate();
	},

	enableUI: function() {
		this.ui.foodButton.activate();
		this.ui.playButton.activate();
		this.ui.sleepButton.activate();
		this.ui.bathButton.activate();
		this.ui.infoButton.activate();
	}
};
