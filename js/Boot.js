WyGoesWith = {
    music: null,
    orientated: false
};

WyGoesWith.Boot = function (game) {

};

WyGoesWith.Boot.prototype = {
    preload: function() {

    },

    create: function() {
        this.state.start('Preloader');
    }

}

