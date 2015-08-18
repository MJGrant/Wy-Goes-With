var MainLayer = cc.LayerColor.extend({
    ctor: function() {
        this._super();

        cc.associateWithNative(this, cc.LayerColor);
    },

    onEnter: function() {
        this._super();
        var player = cc.Sprite.create(s_player);
        player.setPosition(player.getContentSize().width / 2, winSize.height / 2);
        this.addChild(player);
    },

    moveGrub: function() {

        //determine grub start location
        var minY = player.getContentSize().height / 2;
        var maxY = winSize.height - player.getContentSize().height / 2;
        var rangeY = maxY - minY;
        var actualY = (Math.random() * rangeY) + minY;

        player.setPosition(winSize.width + monster.getContentSize().width/2, actualY);
        //


    }
});


MainLayer.create = function() {
    var sg = new MainLayer();
    if(sg && sg.init(cc.c4b(255,255,255,255))) {
        return sg
    }
    return null;
};

MainLayer.scene = function() {
    var scene = cc.Scene.create();
    var layer = MainLayer.create();
    scene.addChild(layer);
    return scene;
}