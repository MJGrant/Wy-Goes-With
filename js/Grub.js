WyGoesWith.Grub = function(game, time) {

    Phaser.Sprite.call(this, game, 200, 300, 'grub');

    var scope = this;
    this.time = time;
    this.game = game;
    this.name = "Wy";

    this.anchor.setTo(.5,1);

    this.tween = {};

    this.animations.add('idle', Phaser.Animation.generateFrameNames('wy-idle_' , 0 ,  11, '.png', 2), 15, true);
    this.animations.add('walk', Phaser.Animation.generateFrameNames('wy-walk_' , 0 ,  11, '.png', 2), 15, true);

    //enable click and hold on grub
    this.inputEnabled = true;
    this.events.onInputDown.add(function() {
        scope.statePickedUp();
    });
    this.events.onInputUp.add(function() {
        time.events.start();
        scope.startGrubStateLoop(scope.stateWalk);
    });
    this.input.enableDrag(true);

    //add grub to stage
    game.add.existing(this);

    return this;
};


WyGoesWith.Grub.prototype = Object.create(Phaser.Sprite.prototype);
WyGoesWith.Grub.prototype.constructor = WyGoesWith.Grub;

WyGoesWith.Grub.prototype.stateIdle = function() {
    this.animations.play('idle',30, true);
};


WyGoesWith.Grub.prototype.stateWalk = function(x, y) {

    //play walk animation and send him off towards a randomly chosen point
    this.animations.play('walk', 30, true);
    var currentPos = new Phaser.Point(this.x, this.y);

    //use x and y if they exist, otherwise pick a random point (he's idling)
    var walkDest =  {};

    if (x && y) {
        walkDest = new Phaser.Point((x + this.width / 2), (y + this.height / 2));
    } else {
        walkDest = this.getRandomWalkPoint();
    }

    //calculate the time it should take him to walk based on the distance between where he is and where he is going

    var timeToWalk = Phaser.Point.distance(currentPos, walkDest) * 5;

    //flip him to face the direction he walks in
    if (this.x > walkDest.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }

    //tween it! when the tween is done, stop the grub state loop
    var tween = this.game.add.tween(this)
        .to({
            x: walkDest.x,
            y: walkDest.y
            },
        timeToWalk, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.stopGrubStateLoop, this);
};

WyGoesWith.Grub.prototype.statePickedUp = function() {
    this.time.events.stop();
};


WyGoesWith.Grub.prototype.getRandomWalkPoint = function() {
    return new Phaser.Point(
        getRandom(0,1024 - this.width),
        getRandom(0,768 - this.height));
};


WyGoesWith.Grub.prototype.stopGrubStateLoop = function() {
    this.time.events.stop();
    this.stateIdle();
    this.startGrubStateLoop(this.stateWalk);
};


WyGoesWith.Grub.prototype.startGrubStateLoop = function() {
    game.time.events.start();
    game.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.stateWalk, this);
};
