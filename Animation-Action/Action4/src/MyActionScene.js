
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
		
		var sprite = new cc.Sprite(res.hero_png);
		sprite.x = size.width/2;
		sprite.y = size.height/2;
		this.addChild(sprite,1,SP_TAG);
		
		var backMenuItem = new cc.MenuItemImage(
				res.Back_up_png,
				res.Back_down_png,
				function(){
					cc.director.popScene();
				}, this);
		backMenuItem.x = 140;
		backMenuItem.y = size.height - 65;

		var goMenuItem = new cc.MenuItemImage(
				res.Go_up_png,
				res.Go_down_png,
				this.onMenuCallback, this);
		goMenuItem.x = 822;
		goMenuItem.y = size.height - 540;
		
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
		
		var ac1 = cc.moveBy(2, cc.p(200,0));
		var ac2 = ac1.reverse();
		var ac = cc.sequence(ac1, ac2);
		
		switch(this.flagTag){
		case ActionTypes.kEaseIn:
			sprite.runAction(cc.EaseIn(ac,3));
			break;
		case ActionTypes.kEaseOut:
			sprite.runAction(cc.EaseOut(ac,3));
			break;
		case ActionTypes.kEaseInOut:
			sprite.runAction(cc.EaseInOut(ac,3));
			break;
			
		case ActionTypes.kEaseSineIn:
			sprite.runAction(cc.EaseSineIn(ac));
			break;
		case ActionTypes.kEaseSineOut:
			sprite.runAction(cc.EaseSineOut(ac));
			break;
		case ActionTypes.kEaseSineInOut:
			sprite.runAction(cc.EaseSineInOut(ac));
			break;
			
		case ActionTypes.kEaseExponentialIn:
			sprite.runAction(cc.EaseExponentialIn(ac));
			break;
		case ActionTypes.kEaseExponentialOut:
			sprite.runAction(cc.EaseExponentialOut(ac));
			break;
		case ActionTypes.kEaseExponentialInOut:
			sprite.runAction(cc.EaseExponentialInOut(ac));
			break;
			
		case ActionTypes.kSpeed:
			sprite.runAction(cc.Speed(ac, cc.random0To1()*5));
			break;
		
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
