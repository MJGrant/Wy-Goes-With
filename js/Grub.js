WyGoesWith.Grub = function(game, time) {

    Phaser.Sprite.call(this, game, 200, 300, 'grub');

    var scope = this;
    this.time = time;
    this.game = game;
    this.name = "Wy";
    this.target = {};
    this.walkDest = {};

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
        scope.stateFall(scope.stateWalk);
    });
    this.input.enableDrag(true);

    //add grub to stage
    game.add.existing(this);

    return this;
};


WyGoesWith.Grub.prototype = Object.create(Phaser.Sprite.prototype);
WyGoesWith.Grub.prototype.constructor = WyGoesWith.Grub;


WyGoesWith.Grub.prototype.stateIdle = function() {
    console.log("Idling at x: " + this.x + " y: " + this.y);
    this.animations.play('idle',30, true);
};


WyGoesWith.Grub.prototype.stateWalk = function(x, y, target) {
    //play walk animation and send him off towards a randomly chosen point
    this.animations.play('walk', 30, true);

    var currentPos = new Phaser.Point(this.x, this.y);
    //use x and y if they exist, otherwise pick a random point (he's idling)
    if (x && y) {
        this.walkDest = new Phaser.Point((x + this.width / 2), (y + this.height / 2));
    } else {
        this.walkDest = this.getRandomWalkPoint();
    }
    console.log("Walking to x: " + this.walkDest.x + " y: " + this.walkDest.y);

    //calculate the time it should take him to walk based on the distance between where he is and where he is going
    var timeToWalk = Phaser.Point.distance(currentPos, this.walkDest) * 5;

    //flip him to face the direction he walks in
    if (this.x > this.walkDest.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }

    //tween it! when the tween is done, stop the grub state loop
    var tween = this.game.add.tween(this)
        .to({
            x: this.walkDest.x,
            y: this.walkDest.y
            },
        timeToWalk, Phaser.Easing.Linear.None, true);

    if (target) {
        this.target = target;
        //does wy have a target object? if so, do stuff here (for now it's just food, should be expanded to a variety of target objects later)
        tween.onComplete.add(this.stateEat, this);
    } else {
        //no target? he's just idling
        tween.onComplete.add(this.stopGrubStateLoop, this);
    }
};

WyGoesWith.Grub.prototype.statePickedUp = function() {
    this.animations.play('walk',30, true);
    this.time.events.stop();
};

WyGoesWith.Grub.prototype.stateFall = function() {
    this.animations.play('idle',30, true);
    this.time.events.stop();
    this.game.add.tween(this)
        .to({
            x: this.x,
            y: this.y + 200
        },
        300, Phaser.Easing.Exponential.None, true);

};


WyGoesWith.Grub.prototype.getRandomWalkPoint = function() {
    return new Phaser.Point(
        getRandom(50,900 - this.width),
        getRandom(50,740 - this.height));
};


WyGoesWith.Grub.prototype.stopGrubStateLoop = function() {
    console.log("STOPPING grub state loop and calling idle...");
    this.time.events.stop();
    this.stateIdle();
    this.startGrubStateLoop(this.stateWalk);
};


WyGoesWith.Grub.prototype.startGrubStateLoop = function() {
    console.log("STARTING grub state loop...(he's gonna walk when the timer's up)");
    game.time.events.start();
    game.time.events.loop(Phaser.Timer.SECOND * getRandom(3,5), this.stateWalk, this);
};

WyGoesWith.Grub.prototype.stateEat = function() {
    console.log("EATING...");
    console.log(this.target);
    this.startGrubStateLoop(this.stateIdle);
};