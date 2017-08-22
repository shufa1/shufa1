function getByClass(oParent,cclass){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var temp=[];
	for(var i=0;i<aEle.length;i++){
		temp.push(aEle[i].className.split(' '));
	}							 
	for(var i=0;i<temp.length;i++){
		for(var j=0;j<temp[i].length;j++){
			if(temp[i][j]==cclass){
				aResult.push(aEle[i]);
			}
		}
		
	}
	return aResult;
}

function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle(attr,false);
	else
		return getComputedStyle(obj,false)[attr];
}