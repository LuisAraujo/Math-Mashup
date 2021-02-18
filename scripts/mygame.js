const se = new StarterEngine(0,0);

se.setAsMobile(true);
se.landscape = false;

se.setResources = function () {
		
  //menu
  this.loader.addResource('logo', 'gui/logo.png', 'image');
  this.loader.addResource('bt-play', 'button/bt-play.png', 'image');
  this.loader.addResource('bt-play-hover', 'button/bt-play-hover.png', 'image');
  this.loader.addResource('level-1', 'button/level-1.png', 'image');
  this.loader.addResource('level-1-hover', 'button/level-1-hover.png', 'image');
   this.loader.addResource('level-2', 'button/level-2.png', 'image');
  this.loader.addResource('level-2-hover', 'button/level-2-hover.png', 'image');
  this.loader.addResource('level-disable', 'button/level-disable.png', 'image');
  
  this.loader.addResource('bt-next-levels', 'button/bt-next-levels.png', 'image');
  this.loader.addResource('bt-prior-levels', 'button/bt-prior-levels.png', 'image');
  
  this.loader.addResource('bt-menu', 'button/bt-menu.png', 'image');
  this.loader.addResource('bt-next', 'button/bt-next.png', 'image');
  this.loader.addResource('bt-clear', 'button/bt-clear.png', 'image');
  this.loader.addResource('bt-result', 'button/bt-result.png', 'image');
  
  this.loader.addResource('console', 'gui/console.png', 'image');
}


se.gameReady = function () {
	wfull = window.innerWidth;
	hfull = window.innerHeight;
	var startmenu = new Scene(undefined, true);
	
	startmenu.setFunctionStart( function () {
		new Rect(0, 0, hfull, wfull, "#3688D8");
		new Sprite("logo", wfull*0.15, 100, wfull*0.7, wfull*0.7);	
		new Text("point", wfull*0.3, wfull*0.7+150, "#1A6099", 60, "Bauhaus93" );
		new Text("200", wfull*0.3 - 10, wfull*0.7+310, "#1A6099", 200, "Bauhaus93" );
		new MButton( [ new Animation("bt-play"), new Animation("bt-play-hover")] ,  wfull*0.35, wfull*0.7 + 400, 
		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				se.mlevel.loadScene(1
				);
			},200);
		}, wfull*0.3, wfull*0.3);
		
	});
	
	var menulevels = new Scene(undefined, true);
	menulevels.setFunctionStart( function () {
		
		new Rect(0, 0, hfull*0.1, wfull, "#3688D8");
		txt = new Text("levels", wfull*0.5, 100, "#fff", 100, "Bauhaus93");
		txt.toCenter();
		line = 0;
		col = 0;
		
		for(let i = 0; i < 20; i++){
			
			if(col == 4){
				col = 0;
				line++;
			}
			
			anim = undefined;
			
			if ( getStatusLevel(i) ){
			
				anim = [ new Animation("level-1"), new Animation("level-1-hover")];
				fcolor = "#fff";
				
				if( (col + line) %2 != 0){
					anim = [ new Animation("level-2"), new Animation("level-2-hover")];
					fcolor = "#2E75AF"
				}
			}else{
				anim = [ new Animation("level-disable")];
				fcolor = "#636566";
			}
			
			posx = wfull * 0.05 + (wfull*0.2 + 20) * col;
			posy = hfull * 0.15 + (wfull*0.2 + 20) * line;
			new MButton(anim, posx, posy,  
		
			function(){
				this.setAnimationByIndex(1);	
				setTimeout( function(){
					currentChallenge = i;
					se.mlevel.loadScene(2);
				}, 200);
			
			}, wfull*0.2, wfull*0.2);
		
			
			txt = new Text( (i+1).toString() , posx+ wfull*0.1, posy + wfull*0.15, fcolor , 150, "Bauhaus93");
			txt.toCenter();
			
			col++;
		
		}
		
		line++;
		
		posy = hfull * 0.85;
		new Button("bt-prior-levels", 30 , posy,  

		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				
			}, 200);

		}, wfull*0.2, wfull*0.2);
	
		new Button("bt-next-levels", wfull * 0.05 + (wfull*0.2 + 20) * 3, posy,  

		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				
			}, 200);

		}, wfull*0.2, wfull*0.2);
	
	});
	
	
	
	
	
	var gameplay = new Scene(undefined, true);
	gameplay.setFunctionStart( function () {
	
		new Rect(0, 0, hfull*0.13, wfull, "#3688D8");
		
		new MButton("bt-menu", 20, 20, function(){
			se.mlevel.loadScene(1);
		},
		wfull*0.15, wfull*0.15);	
		
		
		new MButton("bt-next", wfull * 0.85 - 20,20,  function(){
			
		},
		wfull*0.15, wfull*0.15);	
		
		value = "";
		txt = new Text("", wfull * 0.05 + 10, hfull * 0.55 + 125,  "#222", 150, "Bauhaus93");
		txt.setUpdateFunction(function(){
			this.text = value;
		});
		new Sprite("console", wfull * 0.05, hfull * 0.55 - 5, wfull * 0.92, hfull * 0.1 );
		
		col = 0;
		line = 0;
		for(let i = 0; i < 10; i++){
			
			if(col == 5){
				col = 0;
				line++;
			}
			posx = wfull * 0.05 + (wfull*0.17 + 15) * col;
			posy = hfull * 0.65 + (wfull*0.15 + 5) * line;
			
			new MButton("level-1", posx, posy,  
		
			function(){
				this.setAnimationByIndex(1);	
				setTimeout( function(){
					value += i;
				}, 200);
			
			}, wfull*0.15, wfull*0.17);
			
			fcolor = "#fff"
		
			txt = new Text( (i).toString() , posx+ wfull*0.075, posy + wfull*0.12, fcolor , 130, "Bauhaus93");
			txt.toCenter();
			
			col++;
		}
		
		new MButton("bt-clear", wfull*0.05 , hfull*0.85,  

		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				value = value.substr(0, value.length-1);
			}, 200);

		}, wfull*0.2, wfull*0.2);
		
		
		new MButton("bt-result", wfull*0.25 + 5  , hfull*0.85 ,  

		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				
			}, 200);

		}, wfull*0.2, wfull*0.7+5);
		
		
	});

	se.mlevel.loadScene(0);
}



function getStatusLevel(index){
	
	arr = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false, false, false,false];
	
	return arr[index];
	
}


function showItens(){
	
	json = [{'name':'melon', 'value':'1'}, {'name':'melon', 'value':'0.5'}];
	
	
	
	
}