
var HelloWorldLayer = cc.Layer.extend({

	ctor:function () {

		this._super();
		var size = cc.director.getWinSize();

		var bg = new cc.Sprite(res.Background_png);
		bg.x = size.width/2;
		bg.y = size.height/2;
		this.addChild(bg);

		var placeLabel1 = new cc.LabelBMFont("Sequence", res.fnt2_fnt);
		var placeMenu1 = new cc.MenuItemLabel(placeLabel1, this.onMenuCallback,this);
		placeMenu1.tag = ActionTypes.kSequence;

		var placeLabel2 = new cc.LabelBMFont("Spawn", res.fnt2_fnt);
		var placeMenu2 = new cc.MenuItemLabel(placeLabel2, this.onMenuCallback,this);
		placeMenu2.tag = ActionTypes.kSpawn;

		var placeLabel3 = new cc.LabelBMFont("Repeate", res.fnt2_fnt);
		var placeMenu3 = new cc.MenuItemLabel(placeLabel3, this.onMenuCallback,this);
		placeMenu3.tag = ActionTypes.kRepeate;

		var placeLabel4 = new cc.LabelBMFont("RepeatForever", res.fnt2_fnt);
		var placeMenu4 = new cc.MenuItemLabel(placeLabel4, this.onMenuCallback,this);
		placeMenu4.tag = ActionTypes.kRepeatForever;

		var placeLabel5 = new cc.LabelBMFont("Reverse", res.fnt2_fnt);
		var placeMenu5 = new cc.MenuItemLabel(placeLabel5, this.onMenuCallback,this);
		placeMenu5.tag = ActionTypes.kReverse;

		

		var mn = new cc.Menu(placeMenu1, placeMenu2, placeMenu3,
				placeMenu4, placeMenu5);
		mn.alignItemsVerticallyWithPadding(50);
		this.addChild(mn);

		return true;
	},
	onMenuCallback:function(sender){
		cc.log("tag = " + sender.tag);
		var scene = new MyActionScene();
		var layer = new MyActionLayer(sender.tag);
		scene.addChild(layer);
		cc.director.pushScene(new cc.TransitionSlideInR(1,scene));
	}
});

var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new HelloWorldLayer();
		this.addChild(layer);
	}
});

