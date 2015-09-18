var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

game.state.add('Boot', WyGoesWith.Boot);
game.state.add('Preloader', WyGoesWith.Preloader);
game.state.add('Game', WyGoesWith.Game);
game.state.start('Boot');