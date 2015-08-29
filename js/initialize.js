var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'game');

game.state.add('Boot', WyGoesWith.Boot);
game.state.add('Preloader', WyGoesWith.Preloader);
game.state.add('Game', WyGoesWith.Game);

game.state.start('Boot');