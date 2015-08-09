// JavaScript Document

    function words_deal() {
		var curLength=$(".brand_message .textarea").val().length;
		if(curLength>200) {
			var num=$(".brand_message .textarea").val().substr(0,200);
			$(".brand_message .textarea").val(num);
			alert("超过200个字符限制，多出的字符被截断！" );
		} else {
			//$(".brand_message .textarea").text(200-$(".brand_message .textarea").val().length);
		}
	}
	
     function baoming(actions_id){
                   var url="http://tg.jia.com/shanghai/popup/"+actions_id+"?sign_from=tg_brand";
				  
			       $.dialog({
					        zIndex: 1000000000,
							title: '免费预约', 
							lock:true,
							content: '<iframe src='+url+' frameborder="no" border="0" width="600" height="350"></iframe>'
							
					 });
		
	 }
	function pop_prod(parea,actid,proid){
		
		var parea=parea;
		var actid=actid;
		var proid=proid;
		
		var pop_prod_url = "http://tg.jia.com/"+parea+"/popup/"+actid+"/"+proid+"/new?sign_from=tg_brand";
		 $.dialog({
					zIndex: 1000000000,
					title: '团购活动报名', 
					lock:true,
					content: '<iframe src='+pop_prod_url+' frameborder="no" border="0" width="634" height="600"></iframe>'
		  });
	  }

$(function(){
	$(".brand_index .comment a").click(function(){
			
			$(this).addClass("clicked");
	});
	 var lw =- $('.about_brands .outside .inside ul li').outerWidth(true);
	 var Marqueeleft,Marqueeright;
	 var lg = $('.about_brands .outside .inside ul li').length;//总个数
	 var j=1;
	function AutoCommentMarqueeright(obj) {
			$(obj).find("ul").stop().animate({marginLeft:lw},500, function() {
				
				j++;
				if(j==lg+1){j=1};
				$(this).css({ marginLeft: "0px" }).find("li:first").appendTo(this);
			});
	}
	function AutoCommentMarqueeleft(obj) {
				$(obj).find("ul").stop().animate({marginLeft:-lw},500, function() {
					
					j--;
					if(j==0){i=lg};
	
					$(this).css({ marginLeft: "0px" }).find("li:last").prependTo(this);
				});
	}
	$(".about_brands .outside .next").click(function(){
             AutoCommentMarqueeright(".about_brands .outside .inside");
    });
	$(".about_brands .outside .prev").click(function(){
			  AutoCommentMarqueeleft(".about_brands .outside .inside");
	 
	});	
	$(".ranking_list dl").eq(0).addClass("hover");
	/*$(".list_box .shop").eq(0).addClass("hover");*/
	$(".pro_list dl:last").addClass("border_none");
	$(".ranking_list dl").hover(function(){
			 
			 $(this).addClass("hover").siblings("dl").removeClass("hover");
			 
	});
	/*$(".list_box .shop").hover(function(){
			 
			 $(this).addClass("hover").siblings(".shop").removeClass("hover");
			 
	});*/
	$(".ranking_list dl").eq(0).addClass("hover");
	$(".ranking_list dl").hover(function(){
			 
			 $(this).addClass("hover").siblings("dl").removeClass("hover");
			 
	});
	
	    var len=$(".cate_list ul li").length;
		
		if(len>3){
			    $(".attention .outer .btn_r").css("display","block");
			}
	   else{
				$(".attention .outer .btn_r").css("display","none");
			}
	var outwidth=-$(".cate_list ul li").outerWidth(true);
	var length=$(".cate_list ul li").length;
	 var change_border=0;
	  $(".attention .outer .btn_r").click(function(){
		  $(".attention .outer .btn_l").css("display","block");	
		  change_border++;
		  if(change_border==length-3) {i=0;$(this).css("display","none");}
		  $(".cate_list ul").stop().animate({left:outwidth*change_border},1000);	
		  var next=$(".cate_list ul li.selected").index();
		  $(".cate_list ul li").eq(next+1).addClass("selected").siblings().removeClass("selected");
		  //$(".cate_list ul li").eq(change_border).addClass("selected").siblings().removeClass("selected");
		  //$(".attention .outer strong").eq(change_border).css("display","block").siblings("strong").css("display","none");
		  $(".attention .outer strong").eq(next+1).css("display","block").siblings("strong").css("display","none");
		  if(window.cate_list_li_select) {
			  window.cate_list_li_select(next+1);
		  }
	   });
	   $(".attention .outer .btn_l").click(function() {
			
			change_border--;
			$(".attention .outer .btn_r").css("display","block");	
			if(change_border==0) {$(this).css("display","none");}
			$(".cate_list ul").stop().animate({left:outwidth*change_border},1000);	
			var prev=$(".cate_list ul li.selected").index();
			
		    $(".cate_list ul li").eq(prev-1).addClass("selected").siblings().removeClass("selected");
		   // $(".cate_list ul li").eq(change_border).addClass("selected").siblings().removeClass("selected");
		    //$(".attention .outer strong").eq(change_border).css("display","block").siblings("strong").css("display","none");
			$(".attention .outer strong").eq(prev-1).css("display","block").siblings("strong").css("display","none");
			if(window.cate_list_li_select) {
				  window.cate_list_li_select(prev+1);
			  }
		});
		$(".cate_list ul li").click(function(){
			$(this).addClass("selected").siblings().removeClass("selected");
			var index=$(this).index();
			 $(".attention .outer strong").eq(index).css("display","block").siblings("strong").css("display","none");
			 if(window.cate_list_li_select) {
				  window.cate_list_li_select(index);
			  }
		 });
		
		var limitself = $(".brand_attr dl dd.history em");  
		limitself.each(function(){  
			var objString = $(this).text();  
			var objLength = $(this).text().length;  
			var num = $(this).attr("limit");  
			
			if(objLength > num){  
			    var upwords=objString.substring(0,num) + "......";
				$(this).attr({"allwords":objString,"upwords":upwords}); 
				
				$(this).text(upwords);  
			} else {
				$(".brand_attr dl dd.history a").hide();
			}
		})   
		$(".brand_attr dl dd.history a").click(function(){
			$(this).toggleClass("down"); 
			if($(this).hasClass("down")){
				
				var new_objString = $(this).prev("em").attr("allwords"); 
			    $(this).prev("em").text(new_objString);
				$(this).parents(".history").css({overflow:"scroll",overflowX:"hidden",height:"120px"});
			}else{
				var old_objString = $(this).prev("em").attr("upwords"); 
			    $(this).prev("em").text(old_objString);
				$(this).parents(".history").css({overflow:"inherit",overflowX:"inherit",height:"auto"});
			}
			
			
			
		});
		$(".brand_attr dl dd.history a").toggle(function(){
		       $(this).text("【收起】");
	    },function(){
		      $(this).text("【展开】");
	    });
		
		for(var i=0; i<$(".slide-content li").size(); i++)
						{
							$(".slide-ctls").append("<li></li>");
						}
		$(".slide-ctls li:first").addClass("cur");
	   
		$(".proup_buying .pro_yuyue").eq(0).show();
		$('.proup_buying .banner_img img').eq(0).show();
		$("#slideBanner").tgSlider({
			containerCls: '.slide-content',
			direction: 'horizon',
			pageCls: '.slide-ctls li',
			autoPlay: true,
			duration: 6000,
			fxDuration: 1000,
			perItem: 1,
			onShow:function(){
					var ind = $(".slide-ctls .cur").index();
					var proyuyue = $(".proup_buying .pro_yuyue");
					proyuyue.eq(ind).show();
					$('.proup_buying .banner_img img').eq(ind).show();
					if(proyuyue.size() > 1) {
						proyuyue.eq(ind).siblings(".pro_yuyue").hide();	
						$('.proup_buying .banner_img img').eq(ind).parents("a").siblings("a").find("img").hide();
					}
					
				}
		 });
		$(".main-tab-box .main-tab-r").click(function(){
				$(".main-tab-box .main-tab").animate({"left":-$(".main-tabli").outerWidth()*10+$(".main-tab-box .main-tab-l").width()});
				$(this).hide();
		    	$(".main-tab-box .main-tab-l").show();
		});
		$(".main-tab-box .main-tab-l").click(function(){
			$(".main-tab-box .main-tab").animate({"left":0});
			$(this).hide();
			$(".main-tab-box .main-tab-r").show();
		});
		
		var sel_index=$(".main-tabli.selected").index(),time,n_index,cate_index=0;
		$(".main-tabli").click(function(){
			$(this).addClass("selected").siblings(".main-tabli").removeClass("selected");
			sel_index=$(this).index();
			
			$(".choose_area").eq(sel_index).css("display","block").siblings(".choose_area").css("display","none");
			clearTimeout(time);
			
		});
		$(".main-tabli").hover(function(){
			    $(this).addClass("cur");
				cate_index=$(this).index();
				$(".main-tab-box .main-tabli").removeClass("selected");
			   $(".choose_area").eq(cate_index).css("display","block").siblings(".choose_area").css("display","none");
				$(".choose_area").each(function(){
			
						if($(this).find("p").height()>66){
							
								$(this).find("dd").show();
						}else{
								$(this).find("dd").hide();
						}
                 });
				 clearTimeout(time);
				 if(sel_index==cate_index){
				
					$(".main-tab-box .main-tabli").eq(sel_index).addClass("selected");
					$(".choose_area").eq(sel_index).css("display","block").siblings(".choose_area").css("display","none");
			    }
		},function(){
			  $(this).removeClass("cur")
				time=setTimeout(function(){
					$(".main-tab-box .main-tabli").eq(sel_index).addClass("selected");
					$(".choose_area").eq(sel_index).css("display","block").siblings(".choose_area").css("display","none");
				}, 200 );
			
			$(".choose_area").each(function(){
			
						if($(this).find("p").height()>66){
							
								$(this).find("dd").show();
						}else{
								$(this).find("dd").hide();
						}
               });
			
		});
		
		
		$(".choose_area").hover(function(){
			n_index=$(this).index()-1;
			
			$(".main-tab-box .main-tabli").eq(n_index).addClass("cur");
			clearTimeout(time);
			
		},function(){
			$(".main-tab-box .main-tabli").eq(n_index).removeClass("cur");
			
			time=setTimeout(function(){
				$(".main-tab-box .main-tabli").eq(sel_index).addClass("selected");
				$(".choose_area").eq(sel_index).css("display","block").siblings(".choose_area").css("display","none")
				}, 200 );
			
			});
		
		$(".tab_four li").click(function(){ 
			var index=$(this).index(); 
			if(index==1){ 
			$(this).addClass("selected").siblings("li").removeClass("selected"); 
			} 
			else{ 
			$(".tab_four li").eq(0).addClass("selected").siblings("li").removeClass("selected"); 

			} 
			});
		
		$(".choose_area dt p a").click(function(){
			$(this).addClass("selected").siblings("a").removeClass("selected");
		});
		$(".case_sort .sort_sel li a").click(function(){
			
			$(".case_sort .sort_sel li a").removeClass("selected");
			$(this).addClass("selected");
		});
		$(".choose_area dd a").click(function (){	
		       $(this).toggleClass('cc');
				var ulh = $(this).parents("dl").find('p').height();
				if($(this).hasClass('cc')){
					$(this).find('em').addClass('up');
					$(this).find('span').text('收起');			
					$(this).parents("dl").find('dt').animate({'height':ulh},500);
					
				}else{
					$(this).find('em').removeClass('up');
					$(this).find('span').text('展开');			
					$(this).parents("dl").find('dt').animate({'height':'66px'},500);		
					
		       }
			
	     });
		 $('.jdtbox_li').each(function() {
				$(this).hover(function(){
					$(this).animate({height:'175px'},{queue:false,duration:50});
				}, function(){
					$(this).animate({height:'60px'},{queue:false,duration:50});
				});
         });
		 $(".jdtbox_btn").click(function(){
			 var index=$(this).parents(".pingfen_jdtbox li").index();
			 
			 var val=$(this).parent(".jdtbox_li").find("input:checked").attr("value");
			 $(".pingfen_jdtul li").eq(index).find("strong em").text(val);
			 $(".pingfen_jdtul li").eq(index).find("strong").fadeIn(1000);
			 setTimeout($('.pingfen_jdtul li').eq(index).find('strong').fadeOut(1000), 1000);
			
		 });
		 $(".area_select,.year_select,.month_select").hover(function(){
			 $(this).addClass("hover"); 
		  },function(){
		 	 $(this).removeClass("hover"); 
		 });
		 $(".area_select dd").click(function(){
			 $(this).addClass("selected").siblings("dd").removeClass("selected");
		 });
		 $(".area_select dd").hover(function(){
			$(".area_select dd").removeClass("selected");
		 });
		 $(".area_select dd>a").click(function(){
			var txt=$(this).text();
			$(".area_select .control_box span").attr("val",txt).text("").text(txt);
			if(window.changecity) window.changecity($(this).attr('pinyin'));
		 });
		 $(".year_select ul li").click(function(){
			var txt=$(this).text();
			$(this).parents(".fr").find("span").attr("val",txt).text("").text(txt);
			if(window.changeyear) window.changeyear($(this).attr('value'));
		 });
		 $(".month_select ul li").click(function(){
				var txt=$(this).text();
				$(this).parents(".fr").find("span").attr("val",txt).text("").text(txt);
				if(window.changemonth) window.changemonth($(this).attr('value'));
			 });
		  $('.brand_lists li p.logo img').each(function(){
				var th = $(this).height(), tw = $(this).width();
				if(th>110){
					$(this).height('110');
				}
				if(th>tw||th==tw){
					th>110&&$(this).height('110');
					//th=th>110?110:th大于110的话就把值赋给它的高了
				}else{
					tw>200&&$(this).width('200');			
				}	
		     $(this).show();			
	    })
		 $('.about_brands .outside .inside ul li img').each(function(){
				var th = $(this).height(), tw = $(this).width();
				if(th>tw||th==tw){
					th>108&&$(this).height('108');
				}else{
					tw>108&&$(this).width('108');			
				}	
		     $(this).show();			
	    })

	var oDiv = document.getElementById('v_pager');
	if(oDiv) {
	    var oUl = oDiv.getElementsByTagName('ul')[0];
	    var oLi = oUl.getElementsByTagName('li');
	    var speed = -2;
	    oUl.innerHTML += oUl.innerHTML;
	    oUl.style.width = oLi[0].offsetWidth * oLi.length + 'px';
	    function move(){
	        if(oUl.offsetLeft < -oUl.offsetWidth/2){
	            oUl.style.left = '0';
	        }
	        if(oUl.offsetLeft > 0)
	        {
	            oUl.style.left = -oUl.offsetWidth/2+'px';
	        }
	        oUl.style.left = oUl.offsetLeft+speed+'px';
	    }
	    setInterval(move,100);
	}
    
    $('.middle_auto img').each(function(){ 
    	var th = $(this).height(), tw = $(this).width(); 
    	if(th>tw||th==tw){ 
    		th>140&&$(this).height('140'); 
    	}else{ 
    		tw>200&&$(this).width('200'); 
    	} 
    	$(this).show(); 
	});
	
	var area_l_h=$(".brand_index .comment").outerHeight(true); 
	var area_r_h=$("#attrs .brand_attr").outerHeight(true); 
	if(area_l_h>area_r_h){ 
		$(".brand_index .comment").css({borderRight:"1px dotted #000",width:"269px"}); 
		$(".brand_attr").css("border-left","none"); 
	}else{ 
		$(".brand_attr").css("border-left","1px dotted #000"); 
		$(".brand_index .comment").css({borderRight:"none",width:"270px"}); 
	}
})