//场景层
var StartLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.winSize;
		//添加背景素材
		this.bgSprite = new cc.Sprite(res.Background_png);
		this.bgSprite.attr({
			x: size.width/2,
			y: size.height/2
		});
		this.addChild(this.bgSprite, 0);
		
		
		//添加菜单
		var startItem = new cc.MenuItemImage(
			res.Start_N_png,
			res.Start_S_png,
			function() {
				cc.director.replaceScene(cc.TransitionPageTurn(1,new PlayScene(),false));
				cc.log("Menu is clicked!");
			},this);
		startItem.attr({
			x: size.width/2,
			y: size.height/2,
			anchorX: 0.5,
			anchorY: 0.5
		});
		var menu = new cc.Menu(startItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu,1);
		
		
//		var helloLabel = new cc.LabelTTF("Hello World","",38);
//		helloLabel.x = size.width/2;
//		helloLabel.y = size.height/2;
//		this.addChild(helloLabel);
		
		return true;
	}
});

//场景
var StartScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
});