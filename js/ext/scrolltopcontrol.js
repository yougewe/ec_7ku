;$(function(){
//滚动到顶部的js代码，很难调，开发时先去掉吧,去年animate效果就好2015-3-26@youge
var scrolltotop={
	setting: {
		startline:100, 				//起始行
		scrollto:0, 				//滚动到指定位置
		scrollduration:400, 		//滚动过渡时间
		fadeduration:[500,100] 		//淡出淡现消失
	},
	controlHTML: '<img src="themes/default/images/topback.gif" style="width:54px; height:54px; border:0;" />', //返回顶部按钮
	controlattrs: {offsetx:30,offsety:80},//返回按钮固定位置
	anchorkeyword: "#top",
	state: {isvisible:false,shouldvisible:false},
	scrollup: function(){
		if(!this.cssfixedsupport){
			this._control.css({opacity:0});
		}
		var dest=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
		if(typeof dest=="string"&&jQuery("#"+dest).length==1){
			dest=jQuery("#"+dest).offset().top;
		}else{
			dest=0;
		}
		this._body.animate({scrollTop:dest},this.setting.scrollduration);
	},
	keepfixed: function(){
		var _window=jQuery(window);
		var controlx=_window.scrollLeft()+_window.width()-this._control.width()-this.controlattrs.offsetx;
		var controly=_window.scrollTop()+_window.height()-this._control.height()-this.controlattrs.offsety;
		this._control.css({left:controlx+"px",top:controly+"px"});
	},
	togglecontrol: function(){
		var scrolltop=jQuery(window).scrollTop();
		if(!this.cssfixedsupport){
			this.keepfixed();
		}
		this.state.shouldvisible=(scrolltop>=this.setting.startline)?true:false;
		if(this.state.shouldvisible&&!this.state.isvisible){
			this._control.stop().animate({opacity:1},this.setting.fadeduration[0]);
			// this._control.show(this.setting.fadeduration[0]);
			this.state.isvisible=true;
		}else{
			if(this.state.shouldvisible==false&&this.state.isvisible){
				this._control.stop().animate({opacity:0},this.setting.fadeduration[1]);
				// this._control.hide(this.setting.fadeduration[1]);
				this.state.isvisible=false;
			}
		}
	},
	init: function(){
		var mainobj=scrolltotop;
		var iebrws=document.all;
		mainobj.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
		mainobj._body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");
		mainobj._control=$('<div id="topcontrol">'+mainobj.controlHTML+"</div>")
			.css({position:mainobj.cssfixedsupport?"fixed":"absolute",'bottom':mainobj.controlattrs.offsety,'right':mainobj.controlattrs.offsetx,'display':'block','z-index':99,'cursor':"pointer"})
			.attr({'title':"返回顶部"})
			.click(function(){
				mainobj.scrollup();
			}).appendTo("body");
		if(document.all&&!window.XMLHttpRequest&&mainobj._control.text()!=""){
			mainobj._control.css({width:mainobj._control.width()});
		}
		mainobj.togglecontrol();
		$('a[href="'+mainobj.anchorkeyword+'"]').click(function(){
			mainobj.scrollup();
			return false;
			});
		$(window).bind("scroll resize",function(e){
			mainobj.togglecontrol();
		});
	}
};
scrolltotop.init();		//初始化滚到顶部初始化
});