
var MyActionLayer = cc.Layer.extend({
	flagTag: 0,
	hiddenFlag: true,
	ctor:function (flagTag) {
		this._super();
		this.flagTag = flagTag;
		this.hiddenFlag = true;
		cc.log("MyActionLayer init flagTag" + this.flagTag);
		
		var size = cc.director.getWinSize();
		
		var bg = new cc.Sprite(res.Background_png);
		bg.x = size.width/2;
		bg.y = size.height/2;
		this.addChild(bg);
		
		var sprite = new cc.Sprite(res.Plane_png);
		sprite.x = size.width/2;
		sprite.y = size.height/2;
		this.addChild(sprite,1,SP_TAG);
		
		var backMenuItem = new cc.MenuItemImage(
				res.Back_up_png,
				res.Back_down_png,
				function(){
					cc.director.popScene();
				}, this);
		backMenuItem.x = 100;
		backMenuItem.y = size.height - 120;

		var goMenuItem = new cc.MenuItemImage(
				res.Go_up_png,
				res.Go_down_png,
				this.onMenuCallback, this);
		goMenuItem.x = size.width/2;
		goMenuItem.y = 100;
		
		var mn = new cc.Menu(backMenuItem,goMenuItem);
		this.addChild(mn,1);
		mn.x = 0;
		mn.y = 0;
		mn.anchorX = 0.5;
		mn.anchorY = 0.5;
		return true;
	},

	onMenuCallback:function(sender){
		cc.log("tag = " + this.flagTag);
		var sprite = this.getChildByTag(SP_TAG);
		
		var size = cc.director.getWinSize();
		var p = cc.p(cc.random0To1()*size.width,cc.random0To1()*size.height);
		
		switch(this.flagTag){
		case ActionTypes.PLACE_TAG:
			sprite.runAction(cc.place(p));
			break;
		case ActionTypes.FLIPX_TAG:
			sprite.runAction(cc.flipX(true));
			break;
		case ActionTypes.FLIPY_TAG:
			sprite.runAction(cc.flipY(true));
			break;
		case ActionTypes.HIDE_SHOW_TAG:
			if(this.hiddenFlag){
				sprite.runAction(cc.hide());
				this.hiddenFlag = false;
			}
			else{
				sprite.runAction(cc.show());
				this.hiddenFlag = true;
			}
			break;
		case ActionTypes.TOGGLE_TAG:
			sprite.runAction(cc.toggleVisibility());
		}
	}
});

var MyActionScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
//		var layer = new HelloWorldLayer();
//		this.addChild(layer);
	}
});
