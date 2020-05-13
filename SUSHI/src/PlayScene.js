//启动该场景的层
var PlayLayer = cc.Layer.extend({
	bgSprite:null,
	SushiSprites:null,
	
	scoreLabel:null,
	score:0,
	timeoutLabel:null,
	timeout:30,
	//背景
	ctor:function(){
		this._super();
		this.SushiSprites = [];//初始化精灵数组容器
		var size = cc.winSize;
		
		
		
		this.bgSprite = new cc.Sprite(res.Background_png);
		
		this.bgSprite.attr({
			x: size.width/2,
			y: size.height/2,
			rotation: 180
		});
		
		this.addChild(this.bgSprite	, 0);
		
		//加载帧图片到缓存中
		cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);
		
		this.scoreLabel = new cc.LabelTTF("score:0","Arial",40);
		this.scoreLabel.attr({
			x: size.width/2 + 220,
			y: size.height - 30
		});
		this.addChild(this.scoreLabel, 5);
		
		
		this.timeoutLabel = new cc.LabelTTF(""+ this.timeout,"Arial",60);
		this.timeoutLabel.attr({
			x: 40,
			y: size.height - 30
		});
//		this.timeoutLabel.x = 20;
//		this.timeoutLabel.x = size.height - 20;
//		cc.log(this.timeoutLabel.x);
		this.addChild(this.timeoutLabel, 5);
		
		this.schedule(this.updata, 1, 16*1024, 1);
		this.schedule(this.timer, 1, this.timeout, 1);
		
		return true;
		
		
	},
	
	updata: function() {
		this.addSushi();
		this.removeSushi();
	},
	timer: function() {
		//首先判断游戏是否结束
		if(this.timeout == 0){
			//加一个gameover层
			var gameOver = new cc.LayerColor(cc.color(255, 255, 255, 100));
			var size = cc.winSize;
			//字的坐标                                                 内容                    字体      字号
			var titleLable = new cc.LabelTTF("Game Over","Arial",38);
			//gameover层坐标
			titleLable.attr({
				x: size.width/2,
				y: size.height/2
			});
			//加入层
			gameOver.addChild(titleLable, 5);
			var TryAgainItem = new cc.MenuItemFont(
					"Try Again",
					function(){
						cc.log("Menu is clicked!");
						var transition = cc.TransitionFade(1,new PlayScene(),cc.Color(255, 255, 255, 255));
						cc.director.runScene(transition);
					},this
			);
			TryAgainItem.attr({
				x: size.width/2,
				y: size.height/2 -60,
				anchorX: 0.5,
				anchorY: 0.5,
			
			});
			var menu = new cc.Menu(TryAgainItem);
			menu.x = 0;
			menu.y = 0;
			gameOver.addChild(menu, 1);
			this.getParent().addChild(gameOver);
			
			this.unschedule(this.update);
			this.unschedule(this.timer);
			return;
		}
		//时间剩余，游戏继续
		this.timeout -=1;//每次减一
		//实现倒计时动画
		this.timeoutLabel.setString("" + this.timeout);
	},
	
	//添加精灵
	addSushi:function(){
		var sushi = new SushiSprite(res.Sushi_png);
		var size = cc.winSize;

		//随机x坐标 cc.random0To1:返回0-1之间值
		var x = sushi.width/2 + size.width/2 * cc.random0To1();
		sushi.attr({
			x: x,
			y: size.height - 20 
			
		});

		//存储精灵
		this.SushiSprites.push(sushi);
		//加到屏幕
		this.addChild(sushi,5);
		
		//使动态
		//cc.MoveTo:做直线运动
		var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-30));
		sushi.runAction(dorpAction);
		
	},
	removeSushiByindex:function(dx){
		if(isNaN(dx)||dx>this.SushiSprites.length){
			return false;
		}
		for(var i=0,n=0;i<this.length;i++){
			if(this.SushiSprites[i]!=this[dx]){
				this.SushiSprites[n++] = this.SushiSprites[i];
			}
		}
		this.SushiSprites.length -=1;
	},
	//删除屏幕底端数组
	removeSushi:function(){
		for(var i=0;i<this.SushiSprites.length;i++){
//			cc.log("removeSushi......");
			if(cc.sys.isObjectValid(this.SushiSprites[i])){
				if(this.SushiSprites[i].y < -19){
//					cc.log("=========remove:"+i);
					this.SushiSprites[i].removeFromParent();
					this.SushiSprites[i] = undefined;
					this.SushiSprites.splice(i,1);
					i = i-1;
				}
			}
			
			
		}
	},
	addScore:function(){
		this.score +=1;
		this.scoreLabel.setString("score:" + this.score);
	}
	
});


//启动场景
var PlayScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new PlayLayer();
		this.addChild(layer);
	}
});