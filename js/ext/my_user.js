;$(function(){

	//registerForm events
	if($('#registerForm').length){
		$('#username').on('keyup blur',function(){
			v=$(this).val(),max=$(this).attr('maxlength');
			if(v==''){
				$('#username_notice').html('- 请填写邮箱/用户名/已验证手机');
				// $('#submit').attr('disabled','disabled');
				$(this).data('valid',0);
			}else if(v.length<=max){
				if(my_validate.nospecialchars(v)){
					$('#username_notice').html('');
					$(this).data('valid',1);
				}else{
					$('#username_notice').html(msg_un_format);
					$(this).data('valid',0);
				}
			}else{
				$('#username_notice').html('- 最多只能输入'+max+'个字符');
				$(this).data('valid',0);
			}
		});
		$('#username').on('blur',function(){
			if($(this).val()==''){$('#username_notice').html('- 请填写邮箱/用户名/已验证手机');return false;}
			Ajax.call('user.php?act=is_registered', 'username=' + $(this).val(), function(status){
				if(status=="true"){
					$('#username_notice').html(msg_can_rg);
					$(this).data('valid',1);
				}else{
					$('#username_notice').html(msg_un_registered);
					$(this).data('valid',0);
				}
			} , 'GET', 'TEXT', true, true );
		});
		$('#confirm_password').on('blur keyup',function(){
			pwd=$('#password').val(),confirm_pwd=$(this).val();
			if(pwd!=confirm_pwd){
				$('#confirm_password_notice').html(confirm_password_invalid);
				$(this).data('valid',0);
			}else{
				$('#confirm_password_notice').html('');
				$(this).data('valid',1);
			}
		});
		// $('#registerForm').Validform();		//Cannot work in ecshop
	}
	//Login form events
	if($('#loginForm').length){
		$('#username').on('blur keyup',function(){
			if($(this).val()==''){$('#username_notice').html('- 请填写邮箱/用户名/已验证手机');return false;}else{$('#username_notice').html('');}
			/*Ajax.call('user.php?act=is_registered', 'username=' + $(this).val(), function(status){
				if(status=="true"){
					$('#username_notice').html('');
					$(this).data('valid',1);
				}else{
					$('#username_notice').html('- ');
					$(this).data('valid',0);
				}
			} , 'GET', 'TEXT', true, true );*/		//Time is limited, improve it later.
		});
	}
	//password for public
	$('#password').on('keyup blur',function(){
		var v=$(this).val();
		if(v==''){
			$('#password_notice').html('- 密码不能为空');
			$(this).data('valid',0);
		}else if(v.length<6){
			$('#password_notice').html(password_shorter);
			$(this).data('valid',0);
		}else{
			$('#password_notice').html('');
			$(this).data('valid',1);
		}
	});
	//captcha for public
	$('.new-captcha').on('click',function(){
		$('#captcha_img_id').attr('src','captcha.php?'+Math.random());
	});
	$('#captcha').on('keyup blur',function(){
		var v=$(this).val();
		if(v==''){
			$('#captcha_notice').html('&nbsp;&nbsp;验证码码不能为空');
			$(this).data('valid',0);
		}else{
			$('#captcha_notice').html('');
			$(this).data('valid',1);
		}
	});
	
});
var my_validate = {
	nospecialchars: function(value){
		return /^[\w(^\u4e00-\u9fa5)-_]+$/.test(value);
	},
	go: function(action){
		var item_ids;
		switch(action){
			case 'login':
				item_ids = ['username','password'] ;
				break;
			case 'register':
				item_ids = ['username','password','confirm_pwd','captcha'];
				break;
		}
		for(var i=0;i<item_ids.length;i++){
			var obj = $('#'+item_ids[i]);
			if(obj.data('valid')==undefined){
				obj.trigger('blur');
				if(obj.data('valid')==0){
					obj.focus();
					return false;
				}
			}else if(obj.data('valid')==0){
				obj.focus();
				return false;
			}
		}
		return true;
	}
}