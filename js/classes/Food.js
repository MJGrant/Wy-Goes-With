WyGoesWith.Food = function(game, x, y, foodType) {

    var snackArray = ['apple', 'banana', 'oreo', 'carrot', 'donut', 'watermelon'];
    var mealArray = ['burger', 'pizza', 'eggroll', 'steak', 'pancakes', 'tacos'];
    var treatArray = ['brownie', 'cake', 'cinnamon', 'cupcake', 'frenchsilk'];

    var random = Math.floor(Math.random() * 6);
    var randomFood = "";
    console.log("random", random);

    if (foodType === "snack") {
        console.log("getting a snack");
        randomFood = snackArray[random];
    };

    //but this one is strict about the parameters it takes
    Phaser.Sprite.call(this, game, x, y, randomFood);

    var scale = .65;
    this.scale.x = scale;
    this.scale.y = scale;
    this.anchor.setTo(.5, .5);

    //add button to stage
    game.add.existing(this);

};

WyGoesWith.Food.prototype = Object.create(Phaser.Sprite.prototype);
WyGoesWith.Food.prototype.constructor = WyGoesWith.Food;