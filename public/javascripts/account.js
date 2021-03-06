/*
*账户相关验证
*适用于用户登录和注册页面的信息校验
*
* */

$(function(){
	subEnter();
	//注册页面
    /*验证标志位*/
        var flag = false;
		var pwd_flag = false;
		var pwd_confirm_flag = false;
        var email_flag = false;
        var verify_flag = false;

    /*验证邮箱*/
		$('#user_email').blur(function(){
            var email = $(this).val();
			if(is_mail(email)){
               if($('#sub_form').attr('name')=='register'){
                   var ajx_url = "/checkEmailExist?email="+$(this).val();
                   $.ajaxSetup({ async : true });
                   $.get(ajx_url,function(msg){
                       if(msg == 'true'){
                           $('#user_email').parent().siblings('.list_tips').html('<font color="red">Email帐号已存在！</font>');
                       }else{
                           $('#user_email').parent().siblings('.list_tips').html('<font color="green">正确</font>');
                           email_flag = true;
                       }
                   });
               }else{
                   $('#user_email').parent().siblings('.list_tips').html('<font color="green">正确</font>');
                   email_flag = true;
               }
			}else{
				check_input($(this),'Email格式不正确，请重新输入！');
			}
		});

    /*验证Captcha*/
    $('#verify').blur(function(){
        var verify = $(this).val();
        var ajx_url = "/checkCaptcha?captcha="+$(this).val();
        $.ajaxSetup({ async : true });
        $.get(ajx_url,function(msg){
            if(msg == 'false'){
                $('#verify').parent().siblings('.list_tips').html('<font color="red">验证码不正确！</font>');
            }else{
                verify_flag = true;
                $('#verify').parent().siblings('.list_tips').html('<font color="green">正确</font>');
            }
        });
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
            pwd_flag = true;
            check_input($(this));
        }
    });

    /*验证密码2*/
    $('#password1').blur(function(){
        if($(this).val().length < 6 || $(this).val() != $('#password').val()){
            check_input($(this),'两次密码输入不一致！');
        }else{
            pwd_confirm_flag = true;
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

    /*提交注册*/
    $('#reg_sub').click(function(){
        $('#sub_form input').each(function(){
            $(this).trigger('blur');

        });
        if(!email_flag){
            error_shake('#email');
        }
        if(!verify_flag){
            error_shake('#captcha');
        }
        if(!pwd_flag){
            error_shake('#pwd');
        }
        if(!pwd_confirm_flag){
            error_shake('#pwd1');
        }
        if($('#read').attr('checked') == null){
            error_shake('#readme');
            return false;
        }
        flag = flag&&pwd_flag&&email_flag&&pwd_confirm_flag&&verify_flag;
        if(flag === false){
            return false;
        }else{
           $('#sub_form').submit();
        }
    });

    /*提交登陆*/
    $('#login_sub').click(function(){
        $('#sub_form input').each(function(){
            $(this).trigger('blur');
        });
        if(!email_flag){
            error_shake('#email');
        }
        if(!pwd_flag){
            error_shake('#pwd');
        }
        flag = flag&&pwd_flag&&email_flag;
        if(flag === false){
            return false;
        }
        if(flag === true){
            $('#sub_form').submit();
        }else{
            return false;
        }
    });

    function check_input(form,msg){
        if(msg == null){
            $(form).parent().siblings('.list_tips').html('<font color="green">正确</font>');
            flag = true;
        }else{
            flag = false;
            //$(form).parents('.login_list').children('.account_error').remove();
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
	var reg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //reg =  /^[0-9a-zA-Z_\-\.]+@[0-9a-zA-Z_\-]+(\.[0-9a-zA-Z_\-]+)*+(\.[a-zA-Z_\-]+){2,3}$/;
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

