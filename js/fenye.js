function Page(ele,json){
	this.target = document.querySelector(ele);
	this.pageIndex=1;
	this.option = {
			dataNum:100,//数据的总数
			showPage:5,//显示几个页码
			showNum:6,//每页显示的数据条数
			callBack:function(){

			}
		}
		this.extend(json);
		this.create();
		this.bindData();
	}

	Page.prototype.extend = function(json){
		Object.assign(this.option,json);
	}

	Page.prototype.bindEvent = function(){
		var that = this;
		this.pre_page.className = "";
		this.pre_page.onclick = function(){
			that.pageIndex--;
			that.bindData();
			
		}
		this.next_page.className = "";
		this.next_page.onclick = function(){
			that.pageIndex++;
			that.bindData();
		}
		if (this.option["callBack"]) {
			this.option["callBack"](this.pageIndex);
		}

	}


	Page.prototype.bindData = function(){
		var that = this;

		var middleNum = Math.floor(this.option["showPage"]/2);
		var MaxpageNum = Math.ceil(this.option["dataNum"]/this.option["showNum"]);//最大页码数
		var start = 1;
		var end = MaxpageNum<this.option["showPage"] ? MaxpageNum:this.option["showPage"] ;

		start = this.pageIndex>middleNum?this.pageIndex - middleNum:start;
		end = this.pageIndex>middleNum?this.pageIndex + middleNum :end;
		if (this.pageIndex > MaxpageNum - middleNum) {
            start = MaxpageNum - 2 * middleNum; //20-6
            end = MaxpageNum;
        }

        start = start < 1 ? 1 : start;//限制最小值


        this.content.innerHTML = "";
        for(var i=start;i<=end;i++)
        {
        	var li = document.createElement("li");
        	li.innerHTML = i;
        	if(this.pageIndex==i)
        	{
        		li.className = "selected";
        	}

        	this.content.appendChild(li);
        	li.onclick = function(){
        		that.pageIndex = this.innerHTML*1;
        		that.bindData();
        	}
        }
			this.bindEvent();//绑定事件

			if(this.pageIndex==1)
			{
				this.pre_page.onclick = null;
				this.pre_page.className = "disabled";
			}
			if(this.pageIndex==MaxpageNum)
			{
				this.next_page.onclick = null;
				this.next_page.className = "disabled";
			}



		}

		Page.prototype.create = function(){
			this.pre_page = document.createElement("span");
			this.pre_page.className = "page-prev";
			this.pre_page.innerHTML = this.option["pre"] ;
			this.target.appendChild(this.pre_page);


			this.content = document.createElement("ul");
			this.content.className = "page-content";
			this.target.appendChild(this.content);

			this.next_page = document.createElement("span");
			this.next_page.className = "page-next";
			this.next_page.innerHTML = this.option["next"] 
			this.target.appendChild(this.next_page);
		}





		getNum();
		// //从数据库获取数据总数
       
		

		$("#search").click(function(){
			var startPrice = $("#starPrice").val();
			var endPrice = $("#endPrice").val();
			//获取价格区间的数据数量
			getjiagequNum(startPrice,endPrice);
			getData2(startPrice,endPrice).then(function(data){
				new Page("#box",{
					dataNum:qujiannum,//数据的总数
					showPage:7,//显示几个页码
					showNum:20,//每页显示的数据条数
					pre:"pre",
					next:"next",
					callBack: function (pageIndex) {
						//ajax动态生成商品列表
					setData1(data);
					}
				});
			})

		})

		//获取数据库的数据总量
		function getNum(){
			var p = new Promise(function(resolve,reject){
				$.ajax({
					type:"get",
					url:"../php/getdatanum.php",
					dataType:"json",
					success:function(data){
						// resolve(data);
						var num = data["count"];
						initPage(num);
						
					}
				});	
			})
			return p;
		}

//获取价格区间数量总数
		function getjiagequNum(starPrice,endPrice){
			var p = new Promise(function(resolve,reject){
				$.ajax({
					type:"get",
					url:"../php/jiagequjianshuliang.php",
					data:{
						startPrice:starPrice,
						endPrice:endPrice
					},
					dataType:"json",
					success:function(data){
						resolve(data);
					 qujiannum = data["count"];
					 console.log(qujiannum);
					}
				});	
			})
			return p;
		}

		// //初始化分页
		function initPage(dataTotal){
			new Page("#box",{
			dataNum:dataTotal,//数据的总数
			showPage:7,//显示几个页码
			showNum:20,//每页显示的数据条数
			pre:"pre",
			next:"next",
			callBack: function (pageIndex) {
				//ajax动态生成商品列表
			getData1((pageIndex-1)*20,20).then(function(data){
			setData1(data);
			})
			}
		});
		}
		
			//总列表分页
			function getData1(skipNum,showNum){
				var p = new Promise(function(resolve,reject){
					$.ajax({
						type:"get",
						url:"../php/goodslist.php",
						data:{
							skipNum:skipNum,
							showNum:showNum
						},
						dataType:"json",
						success:function(data){
							resolve(data);
						}
					})
				})
				return p;
			}
			
		 //获取价格区间的数据
			function getData2(startPrice,endPrice){
				var p = new Promise(function(resolve,reject){
					$.ajax({
						type:"get",
						url:"../php/pricequjian.php",
						data:{
							startPrice:startPrice,
							endPrice:endPrice
						},
						dataType:"json",
						success:function(data){
							resolve(data);
						}
					})
				})
				return p;
			}
			//根据价格排序的数据
			function getData3(price){
				var p = new Promise(function(resolve,reject){
					$.ajax({
						type:"get",
						url:"../php/priceshunxu.php",
						data:{
							price:price
						},
						dataType:"json",
						success:function(data){
							resolve(data);
						}
					})
				})
				return p;
			}

			//销售数量排序
			function getData3(salenums){
				var p = new Promise(function(resolve,reject){
					$.ajax({
						type:"get",
						url:"../php/salenums.php",
						data:{
							salenums:salenums
						},
						dataType:"json",
						success:function(data){
							resolve(data);
						}
					})
				})
				return p;
			}




			
			function setData1(data){
				  var str = "";
				  data.forEach(function(item){
					var {id,goodsprice,salenums,goodsdescribe,goodsimg}=item;
					
					str+=` <li>
					<div class="shangpin">
					   <div class="line1" > <img src="${goodsimg}.jpg" alt=""></div>
					   <div class="line2">
						   <ul class="qiehuan">
						   <li> <img src="../images/chuang10.jpg" alt=""> </li>
						   <li><img src="../images/chuang11.jpg" alt=""> </li>
						   <li><img src="../images/chuang13.jpg" alt=""> </li>
						   <li><img src="../images/chuang14.jpg" alt=""> </li>
					   </ul>
					</div>
					<div class="line3">
						<span class="price">￥${goodsprice}</span>
						<span class="salenum">售出 <em>${salenums}</em>  件</span>
					</div>
					<div class="describe">
						<span>${goodsdescribe}</span> 
						<span>芭比城堡原点专卖店</span>
					</div>
					<div class="footer">
						<a href="javascript:;"> <i class="iconfont icon-shoucang1"></i> 收藏</a>
						<a href="javascript:;"> <i class="iconfont icon-gouwuche1"></i> 加入购物车</a>
					</div>
					</div>
				</li>`;
				
				})
				$("#list_wrap").html(str);
			}

		