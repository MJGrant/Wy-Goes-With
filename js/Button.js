WyGoesWith.Button = function(game, x, y, key, callback, callbackContext) {
    Phaser.Button.call(game, x, y, key, callback, callbackContext);
    game.add.existing(this);
};

WyGoesWith.Button.prototype = Object.create(Phaser.Button.prototype);
WyGoesWith.Button.prototype.constructor = Phaser.Button;

/*
WyGoesWith.Button.prototype.activate = function() {
    console.log("button enabled");
    this.input.enabled = true;
    //this.frame = 0;
};

WyGoesWith.Button.prototype.deactivate = function() {
    this.input.enabled = false;
    console.log("button disabled");
    //this.frame = 2; // change this to match greyed out frame in the button spritesheet
};
    */