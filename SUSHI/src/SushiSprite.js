
//新建精灵类
var SushiSprite = cc.Sprite.extend({
	disappearAction:null,
	touchListener:null,
	index:null,
	onEnter:function(){
//		cc.log("onEnter");
		this._super();
		//首先定义消失动画
		this.disappearAction = this.createDisapeatAction();
		this.disappearAction.retain();
		//事件监听器
		this.addTouchEventListenser();
	},
	onExit:function(){
//		cc.log("onExit");
		this.disappearAction.release();
		this._super();
	},
	
	//添加触摸事件
	addTouchEventListenser:function(){
		//触摸事件通过cc.EventListener.create创建一个touch事件监听器touchListener
		this.touchListener = cc.EventListener.create({
			//event是用户监听器的属性，定义其类型
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			//设定是否吃掉事件，事件被吃掉后不会传递给下一层监听器
			swallowTouch: true,
			//处理触摸点击按下事件，可获取触摸点坐标pos
			onTouchBegan: function(touch,event){
				//获取触摸点坐标
				var pos = touch.getLocation();
				//获取当前事件的接收者，
				var target = event.getCurrentTarget();
				//判断当前是否点击到精灵
				if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
					target.removeTouchEventListenser();
//					cc.log("pos.x="+pos.x+",pos.y="+pos.y);
					target.stopAllActions();
					var ac = target.disappearAction;
					var seqAc = cc.Sequence.create(ac,cc.CallFunc.create(function(){
						cc.log("callfunc.....");
						target.getParent().addScore();
						target.getParent().removeSushiByindex(target.index - 1);
						target.removeFromParent();
					},target));
					target.runAction(seqAc);
					return true;
				}
				return false;
			}
		
		});
		//注册监听器到事件管理器
		cc.eventManager.addListener(this.touchListener,this);
	},
	removeTouchEventListenser:function(){
		cc.eventManager.removeListener(this.touchListener);
	},
	//消失动画
	createDisapeatAction:function(){
		var frames = [];
		for(var i = 0; i<11; i++){
			var str = "sushi_1n_"+i+".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		var animation = new cc.Animation(frames,0.02);
		var action = new cc.Animate(animation);
		return action;
	}
	
});