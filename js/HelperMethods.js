var getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//todo: make a class and attach it to WyGoesWith game object
// Usage: WyGoesWith.Helpers.getRandom(1, 2);