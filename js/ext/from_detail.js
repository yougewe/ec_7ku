;$(function(){
  $(".jqzoom").imagezoom();
  $("#thumblist li a").click(function(){
    $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
    $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
    $(".jqzoom").attr('rel',$(this).find("img").attr("big"));
  });
	$('#tab03 ul li').on('click',function(){
      $(this).addClass('selectedB').siblings().removeClass('selectedB');
      // var index = $tab03_li.index(this);
      $('div.tab_box03 > div').eq($(this).index()).show().siblings().hide();
    });
    //tips for group sale
 	$(".caigou a").hover(function(){
	 		$(this).find(".show_div").show();
	 	},function(){
	  		$(this).find(".show_div").hide();
 	});
 	//[+],add count event，15-3-22@youge
 	$('.add').on('click',function(){
 		var obj=$($(this).attr('val-container'));
 		if($(obj).length){
 			$(obj).val(Number($(obj).val())+1);
 		}
 	});
 	//[-],reduce count event，15-3-22@youge
 	$('.reduce').on('click',function(){
 		var obj=$($(this).attr('val-container'));
 		if($(obj).length){
 			var v=Number($(obj).val());
 			v<=1 ? alert('商品数量不能少于 1 ...') : $(obj).val(v-1);
 		}
 	});
 	//label style changer,15-3-22@youge
 	$('.real_spec_input').click('click',function(){
 		if(this.checked){
 			var node=$(this).parent().parent();
 			$(this).parent().parent().find('input').each(function(i){
 				if(this.checked){
 					$(this).parent().addClass('checked');
 				}else{
 					$(this).parent().removeClass('checked');
 				}
 			});
 		}else{
 			$(this).parent().removeClass('checked');
 		}
 	})
});

    