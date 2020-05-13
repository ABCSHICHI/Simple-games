//全局变量
var gameLayer;
var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];//1维数组
var pickedTiles = [];
var scoreText;
var moves = 0;
var allTiles = [];

var game = cc.Layer.extend({
	ctor:function () {
		this._super();
		var backGroundLayer = new cc.LayerColor(new cc.Color(40, 40, 40, 255),640,960);//添加背景颜色层（黑）
		this.addChild(backGroundLayer);
		
		var gradient = new cc.LayerGradient(cc.color(40, 80, 120, 255),cc.color(0x90, 0x82, 0xB4, 255));
		this.addChild(gradient);//渐变背景色

		//分数标签
		scoreText = new cc.LabelTTF("Moves: 0", "Arial", "48");
		this.addChild(scoreText);
		scoreText.setPosition(100, 70);

		var backText = new cc.LabelTTF("Back","Arial","48");
		var backMenu = new cc.MenuItemLabel(backText,function(){cc.director.runScene(new gameScene()); moves = 0; allTiles = []});
		var menu = new cc.Menu(backMenu);
		menu.x = 300;
		menu.y = 70;
		this.addChild(menu);
		cc.log("ok");
		for(var i =0; i<16; i++){
			var tile = new MemoryTile();
			tile.pictureValue = gameArray[i];//每个精灵赋值
			this.addChild(tile, 0);
			tile.setPosition(86+i%4*155, 800-Math.floor(i/4)*165);//每个精灵位置
			allTiles.push(tile);
		}
		var lookText = new cc.LabelTTF("Look","Arial","48");
		var lookMenu = new cc.MenuItemLabel(lookText,function(){
			for(var i=0; i<16;i++){
				if(allTiles[i] != null)
					allTiles[i].initWithFile("assets/tile_" + allTiles[i].pictureValue + ".png");
			}
			setTimeout(function(){
				for(var i=0;i<16; i++){
					if(allTiles[i] != null)
						allTiles[i].initWithFile("assets/cover.png");
				}
			},1200);
		});
		var menu2 = new cc.Menu(lookMenu);
		menu2.x = 450;
		menu2.y = 70;
		this.addChild(menu2);
	}
});

var MemoryTile = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile("assets/cover.png");

		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,//监听器类型:单点触摸事件监听器
			swallowTouches: true, //设置吞没事件。在onTouchBegan方法返回true时吞掉事件，不在向下传递
			onTouchBegan: function(touch,event){
				if(pickedTiles.length<2){
					var target = event.getCurrentTarget();
					var location = target.convertToNodeSpace(touch.getLocation());
					var targetSize = target.getContentSize();
					var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
					if(cc.rectContainsPoint(targetRectangle, location)){
						if(pickedTiles.indexOf(target) == -1){
							target.initWithFile("assets/tile_" + target.pictureValue + ".png");
							pickedTiles.push(target);//点击目标放入点击数组中
							if(pickedTiles.length == 2){//确保点击数组中只有两个元素
								checkTiles();
							}
						}
					}
				}
			}
		});
		
		cc.eventManager.addListener(listener.clone(), this);//事件管理器
	}
});

function checkTiles(){
	moves++;
	scoreText.setString("Moves: " + moves);
	var pause = setTimeout(function(){
		if(pickedTiles[0].pictureValue != pickedTiles[1].pictureValue){
			pickedTiles[0].initWithFile("assets/cover.png");
			pickedTiles[1].initWithFile("assets/cover.png");
		}
		else{//如果一样，移除数组
			gameLayer.removeChild(pickedTiles[0]);
			gameLayer.removeChild(pickedTiles[1]);
			for(var i=0; i<16;i++){
				if(allTiles[i]!=null){
					if(pickedTiles[0].pictureValue == allTiles[i].pictureValue)
					allTiles[i] = null;
				}
				
			}
			
		}
		pickedTiles = [];//置空，下一轮判断
	},500);
}

//打乱数组
shuffle = function(v){
	for(var j,x,i = v.length; i ;j = parseInt(Math.random() * i),x = v[--i], v[i] = v[j],v[j] = x);
	return v;
};

var gameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		gameArray = shuffle(gameArray);//打乱数组排序
		gameLayer = new game();
//		gameLayer.init();//初始化
		this.addChild(gameLayer);
	}
});
