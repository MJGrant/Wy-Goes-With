WyGoesWith.Game = function (game) {
	this.grub;
	this.grubGroup;
	this.uiButtonHeight = 70;
	this.bgDecor = {};
	this.ui = {};
	this.stageItems = {};

	this.statUpdateInterval = 1000;
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
		this.grub.events.onInputDown.add(this.grubStateGrabbed, this);
		this.grub.events.onInputUp.add(this.grubStateFall, this);
		this.grub.input.enableDrag(true);

		//put grub stats on the screen
		console.log("grub stats", this.grub.stats);

		//todo: investigate shoebox for packing button sprites

		//set up ui
		var stageCenter = game.world.width / 2;
		var buttonScale = .70;game.debug.text('Grub name:', 100, 100);
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
		this.statUpdateInterval --;
		if (this.statUpdateInterval <= 0) {
			this.grub.stats.hunger --;
			this.grub.stats.play --;
			this.statUpdateInterval = 1000;
		}
	},

	render: function() {

		var x = 50;

		game.debug.text('Grub name:', x, 100);
		game.debug.text(this.grub.stats.name, x, 120);
		game.debug.text('Hunger level:', x, 140);
		game.debug.text(this.grub.stats.hunger, x, 160);
		game.debug.text('Fun level:', x, 180);
		game.debug.text(this.grub.stats.play, x, 200);
	},

	getRandomWalkPoint: function() {
		return new Phaser.Point(
			getRandom(50,900),
			getRandom(100,740));
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
			console.log(walkDest);
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

	grubStateGrabbed: function() {
		this.pauseGrubLoop();
		console.log("grub grabbed!");
		this.grub.grabbed();
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

		if (this.grub.stats.hunger < 100) {
			this.grub.stats.hunger += 10;
			if (this.grub.stats.hunger > 100) {
				this.grub.stats.hunger = 100;
			}
		}
		
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
