var Grub = function(game, time) {
    var scope = this;

    this.name = "Wy";
    this.time = time;
    this.game = game;

    this.grub = this.game.add.sprite(300, 200, 'grub');
    this.grub.tween = {};

    this.grub.animations.add('idle', Phaser.Animation.generateFrameNames('wy-idle_' , 0 ,  11, '.png', 2), 15, true);
    this.grub.animations.add('walk', Phaser.Animation.generateFrameNames('wy-walk_' , 0 ,  11, '.png', 2), 15, true);
    this.grub.anchor.setTo(.5,1);

    //enable click and hold on grub
    this.grub.inputEnabled = true;
    this.grub.events.onInputDown.add(function() {
        scope.statePickedUp();
    });
    this.grub.events.onInputUp.add(function() {
        time.events.start();
        scope.startGrubStateLoop(scope.stateWalk);
    });
    this.grub.input.enableDrag(true);
};

Grub.prototype = Object.create(Phaser.Sprite.prototype);
Grub.prototype.constructor = Grub;

Grub.prototype.stateIdle = function() {
    this.grub.animations.play('idle',30, true);
};


Grub.prototype.stateWalk = function(x, y) {

    //play walk animation and send him off towards a randomly chosen point
    this.animations.play('walk', 30, true);
    var currentPos = new Phaser.Point(this.x, this.y);

    //use x and y if they exist, otherwise pick a random point (he's idling)
    var walkDest =  {};

    if (x && y) {
        walkDest = new Phaser.Point((x + this.width / 2), (y + this.height / 2));
    } else {
        walkDest = Grub.Prototype.getRandomWalkPoint();
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
    var tween = this.game.add.tween(this.grub)
        .to({	x: walkDest.x,
            y: walkDest.y},
        timeToWalk, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.stopGrubStateLoop, this.game);
};

Grub.prototype.statePickedUp = function() {
    this.time.events.stop();
};

Grub.prototype.getRandomWalkPoint = function() {
    return new Phaser.Point(
        getRandom(0,1024 - this.width),
        getRandom(0,768 - this.height));
};

Grub.prototype.stopGrubStateLoop = function() {
    this.time.events.stop();
    this.stateIdle();
    this.startGrubStateLoop(this.stateWalk);
};

Grub.prototype.startGrubStateLoop = function() {
    game.time.events.start();
    game.time.events.loop(Phaser.Timer.SECOND * getRandom(2,4), this.stateWalk, this.grub);
};
