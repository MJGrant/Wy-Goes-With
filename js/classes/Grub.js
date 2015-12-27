WyGoesWith.Grub = function(game) {

    Phaser.Sprite.call(this, game, 200, 300, 'grub');

    this.game = game;
    this.target = {};

    this.stats = {
        name:"Wy",
        hunger:100,
        play:100
    };

    this.xScale = .65;
    this.yScale = .65;

    this.scale.x = this.xScale;
    this.scale.y = this.yScale;
    this.anchor.setTo(.5,1);

    this.tween = {};

    this.animations.add('idle', Phaser.Animation.generateFrameNames('wy-idle_' , 0 ,  11, '.png', 2), 15, true);
    this.animations.add('walk', Phaser.Animation.generateFrameNames('wy-walk_' , 0 ,  11, '.png', 2), 15, true);
    this.animations.add('grabbedLoop', Phaser.Animation.generateFrameNames('wy-grabbed_loop_' , 0 ,  13, '.png', 3), 15, true);

    //make grub shadow
    this.shadow = this.addChild(this.game.make.sprite(-(this.width / 2), -15, 'shadow'));
    this.shadow.z = -100;

    //enable click and hold on grub
    this.inputEnabled = true;
    this.input.useHandCursor = true;

    //add grub to stage
    game.add.existing(this);

    return this;
};


WyGoesWith.Grub.prototype = Object.create(Phaser.Sprite.prototype);
WyGoesWith.Grub.prototype.constructor = WyGoesWith.Grub;

WyGoesWith.Grub.prototype.setFacing = function(walkDest) {
    //flip him to face the direction he walks in
    if (this.x > walkDest.x) {
        this.scale.x = this.xScale;
    } else {
        this.scale.x = -this.xScale;
    }
};

WyGoesWith.Grub.prototype.idle = function() {
    this.animations.play('idle', 30, true);
};

WyGoesWith.Grub.prototype.grabbed = function() {
    console.log("Grub is picked up");
    this.animations.play('grabbedLoop', 30, true);
};

WyGoesWith.Grub.prototype.walk = function() {
    this.animations.play('walk', 30, true);
};

WyGoesWith.Grub.prototype.fall = function() {
    this.animations.play('idle',30, true);
};

WyGoesWith.Grub.prototype.eat = function() {
  this.animations.play('idle', 30, true);
};