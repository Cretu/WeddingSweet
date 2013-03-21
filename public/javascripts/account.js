$(function(){	
	subEnter();
	//注册页面
		var flag = false;
		$('#province').change(function(){
			var pid = $(this).val();
			$.get('../../general/getOption.php.htm',{pid:pid},function(data){
				if(data){
					$('#city').html(data);
					//$('#city option:first').remove();
					flag = true;
				}else{
					flag = false;
					$('#city').html('<option value="">请选择省份</option>');
				}
			});
		});

		/*验证邮箱*/
		$('#user_email').blur(function(){
			if(is_mail($(this).val())){
				var action = $(this).attr('class');
				if(action == 'userRegister'){
					var name = $(this).attr('name');
					var ajx_url = "/user/register.php?key="+name+"&value="+$(this).val();
					$.ajaxSetup({ async : false });
					$.get(ajx_url,function(msg){
						if(msg == 'have'){
							flag = false;
							$('#user_email').parent().siblings('.list_tips').html('<font color="red">Email帐号已存在！</font>');
						}else{
							$('#user_email').parent().siblings('.list_tips').html('<font color="red">正确</font>');
							$('#user_email').parents('.login_list').children('.login_list_xc').html('<img src="../images/user/account_yes.gif" />');
							flag = true;
						}		
					});
				}else{
					check_input($(this));
				}				
			}else{
				check_input($(this),'Email格式不正确，请重新输入！');
			}
		});
		
		/*验证昵称*/
		$('#realname').blur(function(){
			var reg = /^[a-zA-Z0-9_\u4E00-\u9FA5]{5,26}$/;  
			if($(this).val().length < 5){
				check_input($(this),'昵称至少5个字符！');
			}else if(reg.test($(this).val()) == false){
				check_input($(this),'昵称格式不正确，不能有特殊符号！');
			}else{
				check_input($(this));
			}
		});
		
		/*验证密码1*/
		$('#password').blur(function(){
			if($(this).val().length < 6){
				check_input($(this),'密码长度不能少于6位！');
			}else{
				check_input($(this));
			}
		});
		
		/*验证密码1*/
		$('#password1').blur(function(){
			if($(this).val().length < 6 || $(this).val() != $('#password').val()){
				check_input($(this),'两次密码输入不一致！');
			}else{
				check_input($(this));
			}
		});
		
		/*验证手机号*/
		$('#mobile').blur(function(){
			var reg = /^(?:1|01)[3|5|6|8][0-9]{9}$/;
			if(reg.test($(this).val()) == false){
				check_input($(this),'手机号码格式不正确！');
			}else{
				check_input($(this));
			}
		});
		
		
		$('#sub').click(function(){
			if(url == 'register'){
				if($('#read').attr('checked') == null){
					error_shake('#readme');
					return false;
				}
			}
			$('#sub_form input').each(function(){
				$(this).trigger('blur');
				if(flag === false){
					return false;
				}
			});
			
			if(flag === true){
				$('#sub_form').submit();
			}else{
				return false;
			}
		});
		
		function check_input(form,msg){
			if(msg == null){
				$(form).parent().siblings('.list_tips').html('<font color="red">正确</font>');
				$(form).parents('.login_list').children('.login_list_xc').html('<img src="../images/user/account_yes.gif" />');
				flag = true;
			}else{
				flag = false;
				//$(form).parents('.login_list').children('.account_error').remove();
				//$(form).parents('.login_list').children('.login_list_xc').html('<img src="../images/user/account_no.gif" />');
				$(form).parent().siblings('.list_tips').html('<font color="red">'+msg+'</font>');
				//$(form).parents('.login_list').append('<div class="account_error">'+msg+'</div>');
			}
		}
		
});
function subEnter(){
	//捕获键盘事件
	$(document).keydown( function (e) {
	    if (e.keyCode == 13) {
	        $("#sub_form").submit();
	    }
	});
}


function is_mail(mail){
	var reg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;
	if(reg.test(mail) == false){
		return false;
	}
	return true;
}


function error_shake(id){
	$(id).stop().animate({'margin-left':'10px'},100)
	.animate({'margin-left':'-10px'},100)
	.animate({'margin-left':'10px'},100)
	.animate({'margin-left':'-10px'},100,function(){$(id).removeAttr('style');});	
}

