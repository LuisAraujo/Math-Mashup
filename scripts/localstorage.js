function DB(){
	this.mystorage = localStorage;
}



DB.prototype.clearAllItems = function(){
	this.mystorage.clear();	
}

DB.prototype.setNewItem= function(id, content){
	
	var cid = 0;
	if(id == undefined){
		while(getItem(cid) != null){
			 cid++;
		}
	}else
	  cid = id; 
	  
	var name = cid;
	this.mystorage.setItem(name, content);	
	
	return name;
}

DB.prototype.saveItem= function(name, content){
	this.mystorage.setItem(name, content);	
}

DB.prototype.getListItems= function(){
	var a = [];
	for( key in this.mystorage){
		a.push(key);
	}
	return a;
}

DB.prototype.getListItemsPrefix = function(pref){
	var a = [];
	for( key in this.mystorage){
		if( key.indexOf( pref ) == 0 ) 
			a.push(this.mystorage.getItem(key) );
	}
	return a;
}


DB.prototype.getItem= function(item){
	return this.mystorage.getItem(item);
}

DB.prototype.getNameItem= function(id){
	return getProject(id).split("_")[0]
}

DB.prototype.deleteItem = function(item){
	console.log(item);
	this.mystorage.removeItem(item);
}


var db = new DB();