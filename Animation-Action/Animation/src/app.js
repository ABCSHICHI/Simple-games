
var HelloWorldLayer = cc.Layer.extend({
	isPlaying: false,
    sprite:null,
    ctor:function () {
       
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite(res.background_png);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);
        
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.run_plist, res.run_png);

        this.sprite = new cc.Sprite("#h1.png");
        this.sprite.x = size.width/2;
        this.sprite.y = size.height/2;
        this.addChild(this.sprite);
        
        //toggle菜单
        var goNormalSprite = new cc.Sprite("#go.png");
        var goSelectedSprite = new cc.Sprite("#go.png");
        var stopSelectedSprite = new cc.Sprite("#stop.png");
        var stopNormalSprite = new cc.Sprite("#stop.png");
        
        var goToggleMenuItem = new cc.MenuItemSprite(goNormalSprite,goSelectedSprite);
        var stopToggleMenuItem = new cc.MenuItemSprite(stopSelectedSprite,stopNormalSprite);
        
        var toggleMenuItem = new cc.MenuItemToggle(
        		goToggleMenuItem,
        		stopToggleMenuItem,
        		this.onAction,this
        );
        toggleMenuItem.x = 900;
        toggleMenuItem.y = size.height -540;
        
        var mn = new cc.Menu(toggleMenuItem);
        mn.x = 0;
        mn.y = 0;
        this.addChild(mn);
        return true;
    },
    onAction:function(sender){
    	
    	if(this.isPlaying != true){
    		var animation = new cc.Animation();
    		for(var i=1; i<=4; i++){
    			
    			var frameName= "h" + i + ".png";
    			cc.log("frameName = " + frameName);
    			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
    			animation.addSpriteFrame(spriteFrame);
    		}
    		
    		animation.setDelayPerUnit(0.15);
    		animation.setRestoreOriginalFrame(true);
    		
    		var action = cc.animate(animation);
    		this.sprite.runAction(cc.repeatForever(action));
    		
    		this.isPlaying = true;
    	}else{
    		this.sprite.stopAllActions();
    		this.isPlaying = false;
    	}
    	
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

