var Grub = function(game, time) {
    this.name = "Wy";
    this.time = time;
    var scope = this;
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
        game.startGrubStateLoop(scope.stateWalk);
    });
    this.grub.input.enableDrag(true);
};

//Grub.prototype = Object.create(this.game.sprite);

Grub.prototype.stateIdle = function() {
    this.grub.animations.play('idle',30, true);
};


Grub.prototype.stateWalk = function(x, y) {
    this.grub.animations.play('walk', 30, true);

    var currentPos = new Phaser.Point(this.grub.x, this.grub.y);

    //use x and y if they exist, otherwise pick a random point (he's idling)
    var walkDest =  {};
    if (x && y){
        //todo: stop current tween and make a new one for this particular walk state
        // move tween to grub constructor, overwrite whatever's in there when using a new tween
        walkDest = new Phaser.Point((x + this.grub.width / 2), (y + this.grub.height / 2));
    } else {
        walkDest = this.getRandomWalkPoint();
    }

    //calculate the time it should take him to walk based on the distance between where he is and where he is going
    var timeToWalk = Phaser.Point.distance(currentPos, walkDest) * 5;
    //flip him to face the direction he walks in
    if (this.grub.x > walkDest.x) {
        this.grub.scale.x = 1;
    } else {
        this.grub.scale.x = -1;
    }
    //tween it!
    var tween = this.game.add.tween(this.grub)
        .to({	x: walkDest.x,
            y: walkDest.y},
        timeToWalk, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.game.stopGrubStateLoop, this.game);
};

Grub.prototype.statePickedUp = function() {
    this.time.events.stop();
};

Grub.prototype.getRandomWalkPoint = function() {
    return new Phaser.Point(
        getRandom(0,1024 - this.grub.width),
        getRandom(0,768 - this.grub.height));
};

