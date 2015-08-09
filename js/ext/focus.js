;$(function() {
	var sWidth = $("#focus").width(); 		//获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; 	//获取焦点图个数
	var index = 0, picTimer,move_time=500;
	var myTime,myNum=1,step=20;				//系统animate函数无用，自己写setinterval

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",0.5);
	
	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").on('mouseenter',function() {
		index = $(this).index();
		showPics(index);
	});

	//上一页、下一页按钮透明度处理
	$("#focus .preNext").css("opacity",0.2).hover(function() {
		$(this).stop('fx',true,false).animate({"opacity":"1"},300);
	},function() {
		$(this).stop('fx',true,false).animate({"opacity":"0.2"},300);
	});
	

	//上一页按钮
	$("#focus .pre").click(function() {
		index -= 1;
		if(index <= -1) {index = len - 1;}
		showPics(index);
	});

	//下一页按钮
	$("#focus .next").click(function() {
		index += 1;
		if(index >= len) {index = 0;}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len + 1));
	
	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focus ul li div").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#focus ul li div").css("opacity",1);
	});
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function(){
		picTimer = setInterval(function() {
			if(index >= len) { 	//如果索引值等于li元素个数，说明最后一张图播放完毕，接下来要显示第一张图，即调用showFirPic()，然后将索引值清零
				index = 0;
				showFirPic();				
			}else{ 				//如果索引值不等于li元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},move_time*(len+0)); 	//此3000代表自动播放的间隔，单位：毫秒,使用变量方便
	}).trigger('mouseleave');
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(i) { //普通切换
		var nowLeft = -i*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").animate({"left":nowLeft},move_time); //通过animate()调整ul元素滚动到计算出的position
		/*myTime=setInterval(function(){
			$("#focus ul").css({'left':-(myNum++)*i*sWidth/step});
			if(myNum>step){
				myNum=1;
				clearInterval(myTime);
			}
		},move_time/step);*/
		$("#focus .btn span").removeClass("on").eq(i).addClass("on"); //为当前的按钮切换到选中的效果
	}

	//最后一张图自动切换到第一张图时专用
	function showFirPic() { 
		var ul=$('#focus ul');
		ul.append($("#focus ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		ul.stop("fx",true,false).animate({"left":nowLeft+'px'},move_time,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focus ul").css("left","0");
			$("#focus ul li:last").remove();
		}); 
		// alert('return back:'+myNum)
		/*myTime=setInterval(function(){
			ul.css({'left':ul.offset().left-(myNum++)*sWidth/step});
			if(myNum>step){
				myNum=1;
				ul.css("left","0");
				$("#focus ul li:last").remove();
				clearInterval(myTime);
			}
		},move_time/step);*/
		$("#focus .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});
