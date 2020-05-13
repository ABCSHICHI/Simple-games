
var HelloWorldLayer = cc.Layer.extend({

	ctor:function () {

		this._super();
		var size = cc.director.getWinSize();

		var bg = new cc.Sprite(res.Background_png);
		bg.x = size.width/2;
		bg.y = size.height/2;
		this.addChild(bg);

		var placeLabel1 = new cc.LabelBMFont("EaseIn", res.fnt2_fnt);
		var placeMenu1 = new cc.MenuItemLabel(placeLabel1, this.onMenuCallback,this);
		placeMenu1.tag = ActionTypes.kEaseIn;
		placeMenu1.setScale(0.8, 0.8);

		var placeLabel2 = new cc.LabelBMFont("EaseOut", res.fnt2_fnt);
		var placeMenu2 = new cc.MenuItemLabel(placeLabel2, this.onMenuCallback,this);
		placeMenu2.tag = ActionTypes.kEaseOut;
		placeMenu2.setScale(0.8, 0.8);
		var placeLabel3 = new cc.LabelBMFont("EaseInOut", res.fnt2_fnt);
		var placeMenu3 = new cc.MenuItemLabel(placeLabel3, this.onMenuCallback,this);
		placeMenu3.tag = ActionTypes.kEaseInOut;
		placeMenu3.setScale(0.8, 0.8);
		var placeLabel4 = new cc.LabelBMFont("EaseSineIn", res.fnt2_fnt);
		var placeMenu4 = new cc.MenuItemLabel(placeLabel4, this.onMenuCallback,this);
		placeMenu4.tag = ActionTypes.kEaseSineIn;
		placeMenu4.setScale(0.8, 0.8);
		var placeLabel5 = new cc.LabelBMFont("EaseSineOut", res.fnt2_fnt);
		var placeMenu5 = new cc.MenuItemLabel(placeLabel5, this.onMenuCallback,this);
		placeMenu5.tag = ActionTypes.kEaseSineOut;
		placeMenu5.setScale(0.8, 0.8);
		var placeLabel6 = new cc.LabelBMFont("EaseSineInOut", res.fnt2_fnt);
		var placeMenu6 = new cc.MenuItemLabel(placeLabel6, this.onMenuCallback,this);
		placeMenu6.tag = ActionTypes.kEaseSineInOut;
		placeMenu6.setScale(0.8, 0.8);
		var placeLabel7 = new cc.LabelBMFont("EaseExponentialIn", res.fnt2_fnt);
		var placeMenu7 = new cc.MenuItemLabel(placeLabel7, this.onMenuCallback,this);
		placeMenu7.tag = ActionTypes.kEaseExponentialIn;
		placeMenu7.setScale(0.8, 0.8);
		var placeLabel8 = new cc.LabelBMFont("EaseExponentialOut", res.fnt2_fnt);
		var placeMenu8 = new cc.MenuItemLabel(placeLabel8, this.onMenuCallback,this);
		placeMenu8.tag = ActionTypes.kEaseExponentialOut;
		placeMenu8.setScale(0.8, 0.8);
		var placeLabel9 = new cc.LabelBMFont("EaseExponentialInOut", res.fnt2_fnt);
		var placeMenu9 = new cc.MenuItemLabel(placeLabel9, this.onMenuCallback,this);
		placeMenu9.tag = ActionTypes.kEaseExponentialInOut;
		placeMenu9.setScale(0.8, 0.8);
		var placeLabel10 = new cc.LabelBMFont("Speed", res.fnt2_fnt);
		var placeMenu10 = new cc.MenuItemLabel(placeLabel10, this.onMenuCallback,this);
		placeMenu10.tag = ActionTypes.kSpeed;
		placeMenu10.setScale(0.8, 0.8);
		var mn = new cc.Menu(placeMenu1, placeMenu2, placeMenu3, placeMenu4, placeMenu5,
							placeMenu6, placeMenu7, placeMenu8, placeMenu9, placeMenu10);

		mn.alignItemsInColumns(2,2,2,2,2);
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

