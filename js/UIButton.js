//you can pass in whatever you want up here
WyGoesWith.UIButton = function(game, x, y, icon, buttonArt, scale, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {

    //but this one is strict about the parameters it takes
    Phaser.Button.call(this, game, x, y, buttonArt, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.scale.x = scale;
    this.scale.y = scale;
    this.anchor.setTo(.5, .5);

    if (icon) {
        this.setIcon(icon);
    }

    //add button to stage
    game.add.existing(this);
};


WyGoesWith.UIButton.prototype = Object.create(Phaser.Button.prototype);
WyGoesWith.UIButton.prototype.constructor = WyGoesWith.UIButton;


WyGoesWith.UIButton.prototype.setIcon = function(icon) {
    this.icon = game.add.sprite(0, 0, icon);
    this.icon.anchor.setTo(.5, .5);
    this.addChild(this.icon);
    this.icon.x = 0;
    this.icon.y = 0;
};


WyGoesWith.UIButton.prototype.activate = function() {
    this.input.enabled = true;
};


WyGoesWith.UIButton.prototype.deactivate = function() {
    console.log("button deactivated");
    this.input.enabled = false;
};