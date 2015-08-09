//首页页面js迁移至此2015-3-19@youge
;$(function(){
  // alert('from_index1.js')    //for test if the scripts arrived here
  //tab02 mouse event
  $('.top3 .allsort .mc').css('display','block');
  $('#tab02 ul li').hover(function(){
    $(this).addClass('selectedB').siblings().removeClass('selectedB');
    $('div.tab_box02 > div').eq($(this).index()).show().siblings().hide();
  }); 
  //tab03 mouse event
  $('#tab03 ul li').hover(function(){
    $(this).addClass('selectedB').siblings().removeClass('selectedB');
    $('div.tab_box03 > div').eq($(this).index()).show().siblings().hide();
  }); 
  //tab04 mouse event
  $('#tab04 .tamain ul li').hover(function(){
    $(this).addClass('selectedB').siblings().removeClass('selectedB');
    $('#tab04 div.tab_box04  > div').eq($(this).index()).show().siblings().hide();
  }); 
  //tab05 mouse event
  $('#tab05 .tamain ul li').hover(function(){
    $(this).addClass('selectedB').siblings().removeClass('selectedB');
    $('#tab05 div.tab_box05 > div').eq($(this).index()).show().siblings().hide();
  }); 
  //I don't know what's meaning of this ,so comment it...
  // DY_scroll('.img-scroll0','.prev0','.next0','.img-list0',1,false);// true为自动播放，不加此参数或false就默认不自动
  // DY_scroll('.img-scroll1','.prev1','.next1','.img-list1',1,false);// true为自动播放，不加此参数或false就默认不自动
  // DY_scroll('.img-scroll2','.prev2','.next2','.img-list2',1,false);// true为自动播放，不加此参数或false就默认不自动
  // DY_scroll('.img-scroll3','.prev3','.next3','.img-list3',1,false);// true为自动播放，不加此参数或false就默认不自动
  // DY_scroll('.img-scroll4','.prev4','.next4','.img-list4',1,false);// true为自动播放，不加此参数或false就默认不自动
  
  set('list_list','list_nav','5','1');      //首页舒适套餐tab滚动效果,初始设置第一个为效果
});
//整体滚动置顶效果
 function DY_scroll(wraper,prev,next,img,speed,or){ 
    var wraper = $(wraper);
    var prev = $(prev);
    var next = $(next);
    var img = $(img).find('ul');
    var w = img.find('li').outerWidth(true);
    var s = speed;
    next.click(function(){
          img.animate({'margin-left':-w},function(){
                     img.find('li').eq(0).appendTo(img);
                     img.css({'margin-left':0});
                     });
          });
    prev.click(function(){
          img.find('li:last').prependTo(img);
          img.css({'margin-left':-w});
          img.animate({'margin-left':0});
          });
    if (or == true){
     ad = setInterval(function() { next.click();},s*1500);
     wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*1000);});
    }
 }

function set(objTar,objSrc,Total,CurNum){
  for(var k=1;k<=Total;k++){
    if(k==CurNum){
      document.getElementById(objTar+CurNum).className="itm";
      document.getElementById(objSrc+CurNum).style.display="block";
    }else{
      document.getElementById(objTar+k).className="ito";
      document.getElementById(objSrc+k).style.display="none";
    }
  }
}
