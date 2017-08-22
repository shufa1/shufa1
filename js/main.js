window.onload=function(){
	var oContainer=document.getElementsByTagName('div')[0];
	var oHeader=getByClass(oContainer,'header')[0];
	var oContent=getByClass(oContainer,'content')[0];
	var oList=getByClass(oContent,'list')[0];
	var aListItem=getByClass(oList,'list-item');
	var iContentHeight=document.body.clientHeight-oHeader.offsetHeight;
	var iNow=0; 
	
	window.onresize=function(){
		Header.contentAuto();
	}

	function init(){
		Header.init();
		Home.init();
		About.init();
	}

	var Header=(function(){
		var oArrow=getByClass(oHeader,'arrow')[0];
		var oNav=getByClass(oHeader,'nav')[0];
		var aNavItem=getByClass(oNav,'nav-item');
		var aUp=getByClass(oNav,'up');

		var oMenu=getByClass(oContent,'menu')[0];
		var aMenuDot=getByClass(oMenu,'menuDot');

		function init(){
			contentAuto();
			bind();
		};

		function contentAuto(){
			oContent.style.height=iContentHeight+'px';
			for(var i=0;i<aListItem.length;i++){
				aListItem[i].style.height = iContentHeight+'px';
			}
		}

		function bindNav(){
			for(var i=0;i<aNavItem.length;i++){
				aNavItem[i].index=i;
				aNavItem[i].onclick=function(){
					oArrow.style.left=aNavItem[this.index].offsetLeft+aNavItem[this.index].offsetWidth/2-oArrow.offsetWidth/2+'px';

					for(var i=0;i<aUp.length;i++){
						aUp[i].className='up';
						aMenuDot[i].className='menuDot';
					}
					aUp[this.index].className+=' active';
					aMenuDot[this.index].className+=' active';
					iNow=this.index;
					oList.style.top=-iContentHeight*this.index+'px';
				}
			}
			oArrow.style.left=aNavItem[0].offsetLeft+aNavItem[0].offsetWidth/2-oArrow.offsetWidth/2+'px';


			for(var i=0;i<aMenuDot.length;i++){
				aMenuDot[i].index=i;

				aMenuDot[i].onclick=function(){
					for(var i=0;i<aMenuDot.length;i++){
						aUp[i].className='up';
						aMenuDot[i].className='menuDot';
					}
					aUp[this.index].className+=' active';
					this.className+=' active';
					iNow=this.index;
					oArrow.style.left=aNavItem[this.index].offsetLeft+aNavItem[this.index].offsetWidth/2-oArrow.offsetWidth/2+'px';
					oList.style.top=-iContentHeight*this.index+'px';
				}
			}
		}

		function bind(){
			mouseWheel();
			bindNav();
		}

		function mouseWheel(){
			var bBtn=true;
			var timer=null;

			if(oContent.addEventListener){	//ff down3 up-3
				oContent.addEventListener('DOMMouseScroll',function(e){
					var ev=e||event;
					clearTimeout(timer);
					timer = setTimeout(function(){
						navChange(ev);
					},200);
				})
			}

			oContent.onmousewheel=function(e){//chrome down-120 up 120
				var ev=e||event;
				clearTimeout(timer);
				timer=setTimeout(function(){
					navChange(ev);
				},200);
			}

			function navChange(ev){
				if(ev.detail){
					bBtn=ev.detail>0?true:false;
				}else{
					bBtn=ev.wheelDelta<0?true:false;
				}
				
				if(bBtn){
					if(iNow!=aListItem.length-1){
						iNow++;
					}
				}else{
					if(iNow!=0){
						iNow--
					}
				}
				for(var i=0;i<aUp.length;i++){
					aUp[i].className='up';
					aMenuDot[i].className='menuDot';
				}
				aUp[iNow].className+=' active';
				aMenuDot[iNow].className+=' active';
				oArrow.style.left=aNavItem[iNow].offsetLeft+aNavItem[iNow].offsetWidth/2-oArrow.offsetWidth/2+'px';
				oList.style.top=-iContentHeight*iNow+'px';
			}
		}

		return{
			init:init,
			contentAuto:contentAuto
		};
	})();

	var Home=(function(){
		var oHomeContent=document.getElementById('home-content');
		var oListItemContentList=getByClass(oHomeContent,'list-item-content-list')[0];
		var aLayer=getByClass(oListItemContentList,'layer');
		var oDotList=getByClass(oHomeContent,'dot-list')[0];
		var aDot=getByClass(oDotList,'dot');

		function init(){
			bind();
		};

		function bind(){
			var oldIndex=0;

			for(var i=0;i<aDot.length;i++){
				aDot[i].index=i;
				aDot[i].onclick=function(){
					for(var i=0;i<aDot.length;i++){
						aDot[i].className='dot';
						aLayer[i].className='layer';
					}
					this.className+=' active';

					if(this.index<oldIndex){	//从右向左
						aLayer[oldIndex].className+=' right-hide';
						aLayer[this.index].className+=' left-show';
					}else if(this.index>oldIndex){ //从左向右
						aLayer[oldIndex].className+=' left-hide';
						aLayer[this.index].className+=' right-show';
					}else{
						aLayer[this.index].className+=' active';
					}
					oldIndex=this.index;
				}
			}
		}

		return{
			init:init
		}
	})();

	var About=(function(){
		var oAbout=document.getElementById('about');
		var oAboutContent=document.getElementById('about-content');
		var oAboutImg=getByClass(oAboutContent,'about-img')[0];

		function init(){
			bind();
		}

		function bind(){
			var aBigImg=getByClass(oAboutImg,'big-img');
			var aSmallImg=getByClass(oAboutImg,'small-img');
			var aSpan=oAboutImg.getElementsByTagName('span');
			var iHeight=aBigImg[0].offsetHeight/2;
			var iWidth=aBigImg[0].offsetWidth/2;

			for(var i=0;i<aBigImg.length;i++){
				aBigImg[i].index=i;
				change(aBigImg[i],aSpan[i]);
			}

			function change(bigImg,span){
				var src='img/'+bigImg.dataset.src;
				for(var i=0;i<4;i++){
					var oLi=document.createElement('li');
					var oImg=document.createElement('img');
					oLi.style.width=iWidth+'px';
					oLi.style.height=iHeight+'px';
					oImg.src=src;
					oImg.style.left=-i%2*iWidth+'px';
					oImg.oldleft=-i%2*iWidth;
					oImg.style.top=-Math.floor(i/2)*iHeight+'px';
					oImg.oldtop=-Math.floor(i/2)*iHeight
					oLi.appendChild(oImg);
					bigImg.appendChild(oLi);
				}
				var data = [
					{ name : 'top' , value : iHeight },
					{ name : 'left' , value : - iWidth*2 },
					{ name : 'left' , value : iWidth },
					{ name : 'top' , value : - iHeight*2 },
				];
				var aImg = bigImg.getElementsByTagName('img');
				
				bigImg.onmouseover = function(){
					for(var i=0;i<aImg.length;i++){
						aImg[i].style[ data[i].name ] = data[i].value + 'px';
					}
					span.style.transform='scale(1)';
				};
				bigImg.onmouseout = function(){
					for(var i=0;i<aImg.length;i++){
						aImg[i].style[ data[i].name ] = aImg[i]['old'+data[i].name] + 'px';
					}
					span.style.transform='scale(1.5)';
				};	
			}
		}
		return{
			init:init
		}
	})();

	init();
}