WyGoesWith.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

WyGoesWith.Preloader.prototype = {

	preload: function () {

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		window.addEventListener('resize', function () {
			this.game.scale.refresh();
		});
		this.game.scale.refresh();

		//http://www.html5gamedevs.com/topic/13177-canvas-resize-how-to-always-make-entire-game-visible/

		this.load.atlasJSONHash('grub', 'assets/anims/wy_spritesheet_packed.png', 'assets/anims/wy_spritesheet_packed.json');
		this.load.image('shadow', 'assets/grub/shadow.png');

		//background decorations
		this.load.image('cloud1', 'assets/stage/cloud1.png');
		this.load.image('cloud2', 'assets/stage/cloud2.png');
		this.load.image('cloud3', 'assets/stage/cloud3.png');

		//ui button icons
		this.load.image('food', 'assets/ui/btnArtFood.png');
		this.load.image('play', 'assets/ui/btnArtPlay.png');
		this.load.image('sleep', 'assets/ui/btnArtSleep.png');
		this.load.image('wash', 'assets/ui/btnArtWash.png');
		this.load.image('info', 'assets/ui/btnArtInfo.png');

		//foods
		this.load.image('cake', 'assets/food/cake.png');
		this.load.image('apple', 'assets/food/foodApple.png');
		this.load.image('banana', 'assets/food/foodBanana.png');
		this.load.image('brownie', 'assets/food/foodBrownie.png');
		this.load.image('burger', 'assets/food/foodBurger.png');
		this.load.image('carrot', 'assets/food/foodCarrot.png');
		this.load.image('cinnamon', 'assets/food/foodCinnamon.png');
		this.load.image('cupcake', 'assets/food/foodCupcake.png');
		this.load.image('donut', 'assets/food/foodDonut.png');
		this.load.image('eggroll', 'assets/food/foodEggroll.png');
		this.load.image('frenchsilk', 'assets/food/foodFrenchsilk.png');
		this.load.image('froyo', 'assets/food/foodFroyo.png');
		this.load.image('icecream', 'assets/food/foodIcecream.png');
		this.load.image('oreo', 'assets/food/foodOreo.png');
		this.load.image('pancakes', 'assets/food/foodPancakes.png');
		this.load.image('pizza', 'assets/food/foodPizza.png');
		this.load.image('steak', 'assets/food/foodSteak.png');
		this.load.image('tacos', 'assets/food/foodTacos.png');
		this.load.image('watermelon', 'assets/food/foodWatermelon.png');

		//ui button rectangles
		this.load.image('square-button', 'assets/ui/hud_button_square.png');

		//particles

      	},

	create: function () {

		this.state.start('Game');
	},

	update: function () {

	}

};