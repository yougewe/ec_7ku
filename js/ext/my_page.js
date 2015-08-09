;$(function(){
	//分页处跳转功能2015-3-21@youge(注：需添加jumpto、pagejump此两个class)
	$('.pagejump').on('click',function(e){
        var p=$('.jumpto').val().trim();
        if(p=='' || /\D/.test(p) || p>Number($('.endval').attr('maxp')) || p<=0){
        	$('.jumpto').val(p);
            $('.jumpto').focus();
            $('.jumpto').css('border-color','red');
            return false;
        }
        p=Number(p);															//divide the fronted 0
        var pageVar='page';                 //page var name here
        var curl=window.location.href;		//current url
        if(curl.match('/(\W)('+pageVar+'=)(\d*)/')){
            curl=curl.replace('/(\W'+pageVar+'=)(\d*)/g','$1'+p);    			//other way to deal the url
        }else{
            curl=curl.match(/\?/) ? curl+'&'+pageVar+'='+p : curl+'?'+pageVar+'='+p;
        }
        window.location.href=curl;
    });
    //在分页输入框中点击enter事件2015-1-6@youge
    $('.jumpto').on('keydown',function(e){
    	var e = e || event;
    	if(e.keyCode === 13){
            $('.pagejump').trigger('click');
        }
    });
});