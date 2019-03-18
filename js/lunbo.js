         var box = document.getElementById("box");
		 var ul1 = document.getElementById("ul1");
		 var ol1 = document.getElementById("ol1");
		 var ulLis = ul1.children;
		 var list = ol1.children;
         var mywidth = parseInt(getStyleAttr(box,"width"));
         console.log(mywidth);
		 var timer = null;
		 var ulIndex = IndicatorIndex = 0;
         //鼠标进入圆点
		 for(var j=0;j<list.length;j++)
		 {
		 	(function(j){

		 		var li = list[j];
		 	li.onmouseover = function(){
		 	
		 		for(var i=0;i<list.length;i++){
		 			list[i].className = "";
		 		}
		 		this.className = "selected";
		 		constant(ul1,-(mywidth*j),10);
		 		ulIndex = IndicatorIndex = j;
		 	};
		 	})(j);
		 	
		 }
        //图片滚动
        timer = setInterval(autoPlay,1000);

        box.onmouseover = function(){
        	clearInterval(timer);
        }
        box.onmouseout = function(){
        	timer = setInterval(autoPlay,1000);
        }




        function autoPlay(){
        	ulIndex++;
        	
        	if(ulIndex>4)
        	{
        		ul1.style.left = 0;
        		ulIndex = 1;
        	}
        	constant(ul1,-(mywidth*ulIndex),5);


        	//指示器滚动起来
        	IndicatorIndex++;
        	if(IndicatorIndex>3)
        	{
        		IndicatorIndex = 0;
        	}
        	for(var i=0;i<list.length;i++){
		 			list[i].className = "";
		 		}
		 		list[IndicatorIndex].className = "selected";
        }

		function constant(obj,target,speed){
			//(1)清除定时器
			clearInterval(obj.timer);
			//(2)判断方向
			var dir = obj.offsetLeft < target? speed : -speed;
			//(3)设置定时器
			obj.timer = setInterval(function(){
				obj.style.left = obj.offsetLeft + dir +"px";
				if(Math.abs(target - obj.offsetLeft)< Math.abs(dir))
				{
					clearInterval(obj.timer);

					obj.style.left = target + "px";
				}
			},20)
		}
        function getStyleAttr(obj,attr){
            if(window.getComputedStyle)
            {
                return window.getComputedStyle(obj)[attr];
            }
            else
            {
                return obj.currentStyle()[attr];//兼容IE8及以下浏览器
            }
        }