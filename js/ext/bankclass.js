;$(function(){
    $('.fold-or-not').on('click',function(){      //不科学
        $(this).attr('maxh')==undefined && $(this).attr('maxh',$(this).parents('.spec-filter').css('height'));
        //$(this).attr('normalh')==undefined && $(this).attr('normalh',$(this).parents('.spec-filter').outerHeight());
        if($(this).attr('unfold')!=1){
            $(this).attr('unfold',1);
            // $(this).parents('.spec-filter').css({'max-height':'none'});
            $(this).parents('.spec-filter').animate({'height':'auto'},500);
        }else{
            $(this).attr('unfold',0);
            $(this).parents('.spec-filter').animate({'height':$(this).attr('maxh')},500);
        }
        // Scroll('bankclass');
    });

/*
 *@function: Scroll,Just for colspan or fold or open,so easy
 *@param:obj/object,id/object,h/height,s/speed
 */
function Scroll(obj, h, s){
    if(obj == undefined){return false;}
    var h = h || 0;
    var s = s || 1.2;
    var obj = typeof(obj)=="string"?document.getElementById(obj):obj;
    var status = obj.getAttribute("status")==null;
    var oh = parseInt(obj.offsetHeight);
    obj.style.height = oh;
    obj.style.display = "block";
    obj.style.overflow = "hidden";
    if(obj.getAttribute("oldHeight") == null){
        obj.setAttribute("oldHeight", oh);
    }else{
        var oldH = Math.ceil(obj.getAttribute("oldHeight"));
    }
    var reSet = function(){
        if(status){
            if(oh < h){
                oh = Math.ceil(h-(h-oh)/s);
                obj.style.height = oh+"px";
            }else{
                obj.setAttribute("status",false);
                window.clearInterval(IntervalId);
            }
        }else{
            obj.style.height = oldH+"px";
            obj.removeAttribute("status");
            window.clearInterval(IntervalId);
        }
    }
    var IntervalId = window.setInterval(reSet,10);
 return status;
}
});
    