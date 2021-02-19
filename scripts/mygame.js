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
  this.loader.addResource('level-disable-hover', 'button/bt-level-disable-hover.png', 'image');
  
  this.loader.addResource('bt-next-levels', 'button/bt-next-levels.png', 'image');
  this.loader.addResource('bt-next-levels-hover', 'button/bt-next-levels-hover.png', 'image');
  this.loader.addResource('bt-prior-levels', 'button/bt-prior-levels.png', 'image');
  this.loader.addResource('bt-prior-levels-hover', 'button/bt-prior-levels-hover.png', 'image');
  
  this.loader.addResource('bt-menu', 'button/bt-menu.png', 'image');
  this.loader.addResource('bt-next', 'button/bt-next.png', 'image');
  
  this.loader.addResource('bt-clear', 'button/bt-clear.png', 'image');
  this.loader.addResource('bt-clear-hover', 'button/bt-clear-hover.png', 'image');
  
  this.loader.addResource('bt-result', 'button/bt-result.png', 'image');
  this.loader.addResource('bt-result-hover', 'button/bt-result-hover.png', 'image');
  
  this.loader.addResource('bt-reload', 'button/bt-reload.png', 'image');
  this.loader.addResource('bt-reload-hover', 'button/bt-reload-hover.png', 'image');
 
  this.loader.addResource('bt-next-level', 'button/bt-next-level.png', 'image');
  this.loader.addResource('bt-next-level-hover', 'button/bt-next-level-hover.png', 'image');
  
  this.loader.addResource('bt-erase', 'button/bt-erase.png', 'image');
  
  this.loader.addResource('console', 'gui/console.png', 'image');
  this.loader.addResource('bg-clock', 'gui/bg-clock.png', 'image');
  this.loader.addResource('bg-clock-2', 'gui/bg-clock-2.png', 'image');
  
  
  this.loader.addResource('colock-1', 'gui/colock-1.png', 'image');
  this.loader.addResource('colock-2', 'gui/colock-2.png', 'image');
  this.loader.addResource('colock-3', 'gui/colock-3.png', 'image');
  this.loader.addResource('colock-4', 'gui/colock-4.png', 'image');
  this.loader.addResource('colock-5', 'gui/colock-5.png', 'image');
  this.loader.addResource('colock-6', 'gui/colock-6.png', 'image');
  
  this.loader.addResource('less10', 'gui/less10.png', 'image');
  
  this.loader.addResource('banana', 'itens/banana.png', 'image');
  this.loader.addResource('banana2', 'itens/banana2.png', 'image');
  this.loader.addResource('banana3', 'itens/banana3.png', 'image');
  
    this.loader.addResource('melon', 'itens/melon.png', 'image');
    this.loader.addResource('melon2', 'itens/melon2.png', 'image');
	
	
    this.loader.addResource('div', 'op/div.png', 'image');
    this.loader.addResource('sub', 'op/sub.png', 'image');
    this.loader.addResource('add', 'op/add.png', 'image');
    this.loader.addResource('mult', 'op/mult.png', 'image');
    this.loader.addResource('equal', 'op/equal.png', 'image');
    this.loader.addResource('quest', 'op/quest.png', 'image');
	
	
	
}


se.gameReady = function () {
	
	if ( db.getItem("MathM_totalpoint") == null )
	   db.setNewItem("MathM_totalpoint", 0);
	
	totalpoints = 0 ;
	currentChallenge = 1;
	
	
	initialNumberLevel = 1;
	wfull = window.innerWidth;
	hfull = window.innerHeight;
	var startmenu = new Scene(undefined, true);
	
	startmenu.setFunctionStart( function () {
		if ( db.getItem("MathM_totalpoint") == null )
			db.setNewItem("MathM_totalpoint", 0);
		
		totalpoints = parseInt( db.getItem("MathM_totalpoint") ) ;
		
		new Rect(0, 0, hfull, wfull, "#3688D8");
		
		new MButton("bt-erase", 10, hfull - 70, function(){
			
			db.clearAllItems();
			se.mlevel.loadScene(0);
			
		}, 60, 70 );
		
		
		new Sprite("logo", wfull*0.15, 100, wfull*0.7, wfull*0.7);	
		new Text("point", wfull*0.3, wfull*0.7+150, "#1A6099", 60, "Bauhaus93" );
		new Text(totalpoints, wfull*0.3 - 10, wfull*0.7+310, "#1A6099", 200, "Bauhaus93" );
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
	menulevels.setFunctionStart( menufunction );

	var gameplay = new Scene(undefined, true);
	
	gameplay.setFunctionStart( function () {
	
		loadLevel();
		
	});
	
	

	se.mlevel.loadScene(0);
}


function menufunction () {
	
		se.mlevel.getCurrentScene().removeAllObjects();
		new Rect(0, 0, hfull*0.1, wfull, "#3688D8");
		txt = new Text("levels", wfull*0.5, 100, "#fff", 100, "Bauhaus93");
		txt.toCenter();
		line = 0;
		col = 0;
		
		new MButton("logo", 10, 10, function(){
			
			se.mlevel.loadScene(0);
			
		}, hfull*0.1 - 10, hfull*0.1 - 10);
		
		
		for(let i = 0; i < 20; i++){
			
			if(col == 4){
				col = 0;
				line++;
			}
			
			anim = undefined;
			if(  db.getItem( "MathMlevel"+ (i + initialNumberLevel)) == 'true'){
			
				anim = [ new Animation("level-1"), new Animation("level-1-hover")];
				fcolor = "#fff";
				
				if( (col + line) %2 != 0){
					anim = [ new Animation("level-2"), new Animation("level-2-hover")];
					fcolor = "#2E75AF"
				}
			}else{
				anim = [ new Animation("level-disable"), new Animation("level-disable-hover")];
				fcolor = "#636566";
			}
			
			posx = wfull * 0.05 + (wfull*0.2 + 20) * col;
			posy = hfull * 0.15 + (wfull*0.2 + 20) * line;
			new MButton(anim, posx, posy,  
		
			function(){
				this.setAnimationByIndex(1);	
				setTimeout( function(){
					currentChallenge = i + initialNumberLevel;
					se.mlevel.loadScene(2);
				}, 200);
			
			}, wfull*0.2, wfull*0.2);
		
			if( (i + initialNumberLevel) <=  99)
				txt = new Text( i + initialNumberLevel , posx+ wfull*0.1, posy + wfull*0.15, fcolor , 150, "Bauhaus93");
			else 
			txt = new Text( i + initialNumberLevel , posx+ wfull*0.1, posy + wfull*0.12, 	fcolor , 100, "Bauhaus93");
			
			txt.toCenter();
			
			
			col++;
		
		}
		
		line++;
		
		posy = hfull * 0.85;
		
		if( initialNumberLevel > 1){
			anim = [ new Animation("bt-prior-levels"), new Animation("bt-prior-levels-hover")];
			new Button(anim, 30 , posy,  

			function(){
				this.setAnimationByIndex(1);	
				setTimeout( function(){
					if(initialNumberLevel > 20)
						initialNumberLevel-=20;
						
					menufunction();
				}, 200);

			}, wfull*0.2, wfull*0.2);
		}
		
		if( initialNumberLevel < 81){
			anim = [ new Animation("bt-next-levels"), new Animation("bt-next-levels-hover")];
			new Button(anim, wfull * 0.05 + (wfull*0.2 + 20) * 3, posy,  

			function(){
				this.setAnimationByIndex(1);	
				setTimeout( function(){
					if( initialNumberLevel < 80)
						initialNumberLevel+=20;
						
					menufunction();
					
				}, 200);

			}, wfull*0.2, wfull*0.2);
		
		}
	
}
	
	
function getStatusLevel(index){
	
	arr = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false, false, false,false];
	
	return arr[index];
	
}

function printSupmenu(){
	
	new Rect(0, 0, hfull*0.13, wfull, "#3688D8");
	
	new MButton("bt-menu", 20, 20, 
		function(){
		se.mlevel.loadScene(1);
		},
	wfull*0.15, wfull*0.15);	


	new MButton("bt-next", wfull * 0.85 - 20,20,  
		function(){
			if(currentChallenge < 100){
				currentChallenge++;
				startLevel();
			}
		},
	wfull*0.15, wfull*0.15);	
	
	anim = new Animation(["less10","less10","less10","less10","less10"], 5, [{y:hfull*0.05, a:1}, {y:hfull*0.05-5, a:0.7},{y:hfull*0.05-10, a:0.5},{y:hfull*0.05-15, a:0.2},{y:hfull*0.05-20, a:0}], false)
	
	spless10 = new Sprite([anim], wfull * 0.6, hfull*0.05 , wfull * 0.05, wfull * 0.05);
	spless10.hide();
}

function printTime(onlyprint){
	
	if(currenttime <= 0)  {
		
		setEnd();
		return;
	}
	
	if((se.mlevel.currentScene != 2) || (!starting))
		return;
	
	var objectstag = se.mlevel.getCurrentScene().getObjectsByTag('gui-time');
	for (var i = 0; i < objectstag.length; i++) {
		se.mlevel.removeObject(objectstag[i]);
	}
	
	
    var spname;
	var fcolor;	
	var conlocks = ["colock-6","colock-5","colock-4","colock-3","colock-2","colock-1"];
	var index = parseInt( currenttime/10 ); 
	
	if(currenttime < 10){
		spname = "bg-clock-2";
		fcolor = "#DD143B";
		
	}else{
		spname = "bg-clock";
		fcolor = "#3688D8";
	}
	
	sp = new Sprite(spname, wfull * 0.4, hfull*0.05 , wfull * 0.2, wfull * 0.2);
	sp.setTag("gui-time");
	
	
	if( currenttime > 0 ){
		sp = new Sprite(conlocks[index], wfull * 0.4, hfull*0.05 , wfull * 0.2, wfull * 0.2);
		sp.setTag("gui-time");
	}
	
	var txt = new Text(currenttime<10? "0" + currenttime: currenttime , wfull * 0.4 + 100, hfull*0.05 + 130, fcolor, 100, "Bauhaus93");
	txt.toCenter();
	txt.setTag("gui-time");
	
	
	if(onlyprint)
		return;
	
	
	if(starting)
		setTimeout( function(){ currenttime--; printTime(false) }, 1000) ;
	
		

}
function loadLevel(){
	datalevel = null;
	getDataLevel(currentChallenge, startLevel );
	
}
function startLevel(){
	
	currentlevel = datalevel.elems;
	correctanswere = datalevel.correctanswere;
	console.log(currentlevel, correctanswere);
	
	currenttime = 60;
	starting = true;
	se.mlevel.getCurrentScene().removeAllObjects();
	printSupmenu();
	printChallage();
	printConsole();
	printKeyboard();		
	printTime(false);

	
}


function verifyAnswer(){
	return correctanswere == value;
}


function setWin(){
	//add point if level is not open
	if(db.getItem("MathMlevel"+currentChallenge) == null){
		
		db.setNewItem("MathM_totalpoint", parseInt( db.getItem("MathM_totalpoint") ) + currenttime );
		
		db.setNewItem("MathMlevel"+currentChallenge, true);
	}
	
	starting = false;

	se.mlevel.getCurrentScene().removeAllObjects();
	
	new Rect(0, 0, hfull, wfull, "#95C1E5");
	new Rect(0, 0, hfull*0.13, wfull, "#3688D8");
	
	new MButton("bt-menu", 20, 20, 
		function(){
		se.mlevel.loadScene(1);
		},
	wfull*0.15, wfull*0.15);	
	
	sp = new Sprite("bg-clock", wfull * 0.3, hfull*0.3 , wfull * 0.4, wfull * 0.4);
	var txt = new Text( currenttime , wfull * 0.3 + 200 , hfull*0.3 + 270, "#FFF" , 250, "Bauhaus93");
	txt.toCenter();
	
	new MButton("bt-next-level", wfull*0.25, hfull*0.6, 
		function(){
			currentChallenge++;
			loadLevel( currentChallenge, startLevel);
		},
	wfull*0.25, wfull*0.5);	
}



function setEnd(){
	
	if(!starting)
	  return;
	  
	starting = false;
	
	//lost point
	if( parseInt( db.getItem("MathM_totalpoint")) > 10 ) 
		db.setNewItem("MathM_totalpoint", parseInt( db.getItem("MathM_totalpoint") ) - 10 );
	else
		db.setNewItem("MathM_totalpoint", 0);
	
	
	se.mlevel.getCurrentScene().removeAllObjects();
	
	new Rect(0, 0, hfull, wfull, "#E296AE");
	new Rect(0, 0, hfull*0.13, wfull, "#3688D8");
	
	new MButton("bt-menu", 20, 20, 
		function(){
		se.mlevel.loadScene(1);
		},
	wfull*0.15, wfull*0.15);	
	
	sp = new Sprite("bg-clock-2", wfull * 0.3, hfull*0.3 , wfull * 0.4, wfull * 0.4);
	var txt = new Text("00" , wfull * 0.3 + 200 , hfull*0.3 + 270, "#DD143B" , 250, "Bauhaus93");
	txt.toCenter();
	
	new MButton("bt-reload", wfull*0.25, hfull*0.6, 
		function(){
			startLevel();
		},
	wfull*0.25, wfull*0.5);	
	
}



function printChallage(){
	
		
	for(let i = 0; i < currentlevel.length; i++)
		for(let j = 0; j < currentlevel[i].length; j++){
			if( currentlevel[i][j] != ""){
				if( isNaN( currentlevel[i][j] ) ){
					
					new Sprite(currentlevel[i][j] , wfull * 0.05  + (wfull * 0.12 + 5) * j  , hfull * 0.2 + (wfull * 0.12 + 10) * i, wfull * 0.12, wfull * 0.12 );
				
				}else{					
					new Text( currentlevel[i][j].toString() ,  wfull * 0.05  + (wfull * 0.12 + 5) * j ,hfull * 0.2 + 100 + (wfull * 0.12 + 10) * i, "#000" , 100, "Bauhaus93");
				}
			}
			
		}
}

function printConsole(){
		value = "";
		txt = new Text("", wfull * 0.05 + 20, hfull * 0.55 + 125,  "#222", 150, "Bauhaus93");
		txt.setUpdateFunction(function(){
			this.text = value;
		});
		new Sprite("console", wfull * 0.05, hfull * 0.5 - 5, wfull * 0.92, hfull * 0.15 );
		
}


function printKeyboard(){
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
					if(value.length < 10)
						value += i;
				}, 200);
			
			}, wfull*0.15, wfull*0.17);
			
			fcolor = "#fff"
		
			txt = new Text( (i).toString() , posx + wfull*0.075, posy + wfull*0.12, fcolor , 130, "Bauhaus93");
			txt.toCenter();
			
			col++;
		}
		
		
		anim = [ new Animation("bt-clear"), new Animation("bt-clear-hover")];
		anim[1].setNextAnimation(0);
		new MButton(anim, wfull*0.05 , hfull*0.85,  

		function(){
			this.setAnimationByIndex(1);	
			setTimeout( function(){
				if(value.length > 0)
					value = value.substr(0, value.length-1);
			}, 200);

		}, wfull*0.2, wfull*0.2);
		
		anim = [ new Animation("bt-result"), new Animation("bt-result-hover")];
		anim[1].setNextAnimation(0);
		new MButton(anim, wfull*0.25 + 5  , hfull*0.85 ,  

		function(){
			this.setAnimationByIndex(1);	
			
			setTimeout( function(){
				 if ( verifyAnswer() ){
					 
					 setWin();
					 
				 }else if(value.length>0){
					 
					 spless10.show();
					 spless10.animation[0].setCurrentIndexSprite(0);
					 
					 currenttime -= 10;
					 printTime(true);
				 }
			}, 200);

		}, wfull*0.2, wfull*0.7+5);
		
}

function getDataLevel( level, callback ){
	
	//usage:
	readTextFile("assets/levels/level"+level+".json", function(text){
		
		datalevel = JSON.parse(text);
		callback();
		
	});


	/*json = { 'elems': 
				[
					["melon", "add","melon","", "", "equal", "10" ], 
					["melon", "add","banana","","","equal", "8" ] ,
					["banana2", "add","banana2","","","equal", "quest"]
				],	
			 'correctanswere': '4'		
			}
			

	return json;*/

}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}