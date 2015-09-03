var Grub = function(game) {
    this.name = "Wy";
    this.game = game;
    this.grub = this.game.add.sprite(300, 200, 'grub');

    this.grub.animations.add('idle', Phaser.Animation.generateFrameNames('wy-idle_' , 0 ,  11, '.png', 2), 15, true);
    this.grub.animations.add('walk', Phaser.Animation.generateFrameNames('wy-walk_' , 0 ,  11, '.png', 2), 15, true);
    this.grub.anchor.setTo(.5,1);
};

//Grub.prototype = Object.create(this.game.sprite);

Grub.prototype.stateIdle = function() {
    this.grub.animations.play('idle',30, true);
};


Grub.prototype.stateWalk = function() {
    this.grub.animations.play('walk', 30, true);

    var currentPos = new Phaser.Point(this.grub.x, this.grub.y);

    var walkDest = this.getNextWalkPoint();
    //calculate the time it should take him to walk based on the distance between where he is and where he is going
    var timeToWalk = Phaser.Point.distance(currentPos, walkDest) * 5;
    //flip him to face the direction he walks in
    if (this.grub.x > walkDest.x) {
        this.grub.scale.x = 1;
    } else {
        this.grub.scale.x = -1;
    }
    //tween it!
    console.log(this.grub);
    var tween = this.game.add.tween(this.grub)
        .to({	x: walkDest.x,
            y: walkDest.y},
        timeToWalk, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.game.stopGrubStateLoop, this.game);
};


Grub.prototype.getNextWalkPoint = function() {
    return new Phaser.Point(
        getRandom(0,1024 - this.grub.width),
        getRandom(0,768 - this.grub.height));
};

