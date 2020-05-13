
var HelloWorldLayer = cc.Layer.extend({

	ctor:function () {

		this._super();
		var size = cc.director.getWinSize();

		var bg = new cc.Sprite(res.Background_png);
		bg.x = size.width/2;
		bg.y = size.height/2;
		this.addChild(bg);

		var placeLabel1 = new cc.LabelBMFont("MoveTo", res.fnt2_fnt);
		var placeMenu1 = new cc.MenuItemLabel(placeLabel1, this.onMenuCallback,this);
		placeMenu1.tag = ActionTypes.kMoveTo;

		var placeLabel2 = new cc.LabelBMFont("MoveBy", res.fnt2_fnt);
		var placeMenu2 = new cc.MenuItemLabel(placeLabel2, this.onMenuCallback,this);
		placeMenu2.tag = ActionTypes.kMoveBy;

		var placeLabel3 = new cc.LabelBMFont("JumpTo", res.fnt2_fnt);
		var placeMenu3 = new cc.MenuItemLabel(placeLabel3, this.onMenuCallback,this);
		placeMenu3.tag = ActionTypes.kJumpTo;

		var placeLabel4 = new cc.LabelBMFont("JumpBy", res.fnt2_fnt);
		var placeMenu4 = new cc.MenuItemLabel(placeLabel4, this.onMenuCallback,this);
		placeMenu4.tag = ActionTypes.kJumpBy;

		var placeLabel5 = new cc.LabelBMFont("BezierBy", res.fnt2_fnt);
		var placeMenu5 = new cc.MenuItemLabel(placeLabel5, this.onMenuCallback,this);
		placeMenu5.tag = ActionTypes.kBezierBy;

		var placeLabel6 = new cc.LabelBMFont("ScaleTo", res.fnt2_fnt);
		var placeMenu6 = new cc.MenuItemLabel(placeLabel6, this.onMenuCallback,this);
		placeMenu6.tag = ActionTypes.kScaleTo;

		var placeLabel7 = new cc.LabelBMFont("ScaleBy", res.fnt2_fnt);
		var placeMenu7 = new cc.MenuItemLabel(placeLabel7, this.onMenuCallback,this);
		placeMenu7.tag = ActionTypes.kScaleBy;

		var placeLabel8 = new cc.LabelBMFont("RotateTo", res.fnt2_fnt);
		var placeMenu8 = new cc.MenuItemLabel(placeLabel8, this.onMenuCallback,this);
		placeMenu8.tag = ActionTypes.kRotateTo;

		var placeLabel9 = new cc.LabelBMFont("RotateBy", res.fnt2_fnt);
		var placeMenu9 = new cc.MenuItemLabel(placeLabel9, this.onMenuCallback,this);
		placeMenu9.tag = ActionTypes.kRotateBy;

		var placeLabel10 = new cc.LabelBMFont("Blink", res.fnt2_fnt);
		var placeMenu10 = new cc.MenuItemLabel(placeLabel10, this.onMenuCallback,this);
		placeMenu10.tag = ActionTypes.kBlink;
		
		var placeLabel11 = new cc.LabelBMFont("TintTo", res.fnt2_fnt);
		var placeMenu11 = new cc.MenuItemLabel(placeLabel11, this.onMenuCallback,this);
		placeMenu11.tag = ActionTypes.kTintTo;

		var placeLabel12 = new cc.LabelBMFont("TintBy", res.fnt2_fnt);
		var placeMenu12 = new cc.MenuItemLabel(placeLabel12, this.onMenuCallback,this);
		placeMenu12.tag = ActionTypes.kTintBy;

		var placeLabel13 = new cc.LabelBMFont("FadeTo", res.fnt2_fnt);
		var placeMenu13 = new cc.MenuItemLabel(placeLabel13, this.onMenuCallback,this);
		placeMenu13.tag = ActionTypes.kFadeTo;

		var placeLabel14 = new cc.LabelBMFont("FadeIn", res.fnt2_fnt);
		var placeMenu14 = new cc.MenuItemLabel(placeLabel14, this.onMenuCallback,this);
		placeMenu14.tag = ActionTypes.kFadeIn;

		var placeLabel15 = new cc.LabelBMFont("FadeOut", res.fnt2_fnt);
		var placeMenu15 = new cc.MenuItemLabel(placeLabel15, this.onMenuCallback,this);
		placeMenu15.tag = ActionTypes.kFadeOut;

		var mn = new cc.Menu(placeMenu1, placeMenu2, placeMenu3,
				placeMenu4, placeMenu5, placeMenu6, 
				placeMenu7, placeMenu8, placeMenu9, 
				placeMenu10, placeMenu11, placeMenu12,
				placeMenu13, placeMenu14, placeMenu15);
		mn.alignItemsInColumns(3, 3, 3, 3, 3);
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

