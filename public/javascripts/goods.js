$(function($){

     if(url == 'order'){
    	 flag = false;
    	 /*优惠券事件*/
         if($("#card")){
        	origin = parseInt($("#total_money").val());
	     	money = $("#card") ? $("#card").find("option:selected").attr('val') : 0;
	     	/*优惠卷切换*/
	     	$("#card").change(function(){
	            var money = $(this).find("option:selected").attr('val');
	            money = money ? money : 0;
	            $("#card_money").text(money);
	            $("#order_origin").text('￥'+(origin-money));
	        });
		    /*金额实时显示*/
		    if(money){
		        $("#card_money").text(money);
		        $("#order_origin").text('￥'+(origin-money));
		    }
         }

         /*修改按钮事件*/
         $('#edit').click(function(){
	        if($(this).text() == '[修改]'){
		        $(this).text('[取消]');
		        $('#sure').show();
		        $('#user_info input').removeAttr('readonly').css('border','1px solid #BFBFBF');
		        ed_name = $('#true_name').val();
		        ed_mobie = $('#mobile').val();
		        ed_qq = $('#qq').val();
	        }else{
	        	$(this).text('[修改]');
	        	$('#user_info img').remove();
	        	$('#sure').hide();
	        	$('#user_info input').attr('readonly','readonly').css('border','none');
	        	$('#true_name').val(ed_name);
	        	$('#mobile').val(ed_mobie);
	        	$('#qq').val(ed_qq);
	        	check();
	        }

        });


    	 /*表单验证*/
    	 function regCheck(obj){
    		 id = '#'+$(obj).attr('id');
			 var reg = null;
			 if(id== '#qq'){
				 reg = /^\d{5,11}$|^$/;
			 }else if(id == '#mobile'){
				 reg = /^(?:1|01)[3|5|6|8][0-9]{9}$/;
			 }else if(id == '#true_name'){
				 reg = /^([\u4e00-\u9fa5]+|\w+){1,6}$/;
    		 }
			 if(reg.test(obj.val())){
				 return true;
			 }
			 return false;
    	 }

         /*验证表单*/
         function check(){
        	 var flag = true;
        	 $('#user_info input').each(function(){
        		 if(!regCheck($(this))){
        			 icoImg($(this));
        			 flag = false;
        			 return false;
        		 }else{
        			 icoImg($(this),true);
        		 }
        	 });
        	 return flag;
         }

         /*ico图提示*/
         function icoImg(obj,flag){
        	 obj.next('img').remove();
        	 flag = flag == true ? true : false;
        	 if(flag){
        		 obj.css('background','#FFF');
        		 $('<img src="../images/user/account_yes.gif"/*tpa=http://www.360hun.com/static/images/user/account_yes.gif*/ class="account_ico" />').insertAfter(obj);
        	 }else{
        		 obj.css('background','#FFEFD5');
        		 $('<img src="../images/user/account_no.gif"/*tpa=http://www.360hun.com/static/images/user/account_no.gif*/ class="account_ico" />').insertAfter(obj);
        		 obj.next('img').animate({'margin-left':'20px'},200,function(){$(this).removeAttr('style');})
        		 .animate({'margin-left':'20px'},200,function(){$(this).removeAttr('style');});
        	 }
         }

    	 /*输入框失去焦点事件*/
         $('#user_info input').blur(function(){
        	 $(this).next('img').remove();
        	 if(!regCheck($(this))){
        		$('#user_info input').removeAttr('readonly').css({'background':'#FFF','border':'1px solid #BFBFBF'});
        			icoImg($(this));
        	 	}else{
        	 		icoImg($(this),true);
        	 	}
         });

         /*加载事件*/
         $('#user_info input').each(function(){
        	 if(!regCheck($(this))){
        		 $('#edit').trigger('click');
        		 $('#edit').hide();
        		 icoImg($(this));
        		 return false;
        	 }else{
        		 icoImg($(this),true);
        	 }
         });

         /*更新按钮事件*/
         $('#sure').click(function(){
        	 if(check()){
        		 updateUser();
        	 }
         });

         /*更新用户信息*/
         function updateUser(){
        	 var uid = parseInt($('#uid').val());
        	 var true_name = $('#true_name').val();
        	 var mobile = $('#mobile').val();
        	 var qq = $('#qq').val();
        	 $('#sure').next('label').remove();
        	 $.post('http://www.360hun.com/user/ajx.php',{id:uid,name:true_name,mobile:mobile,qq:qq},function(msg){

        		 if(msg == 0){
        			 $('<label>更新成功</label>').insertAfter($('#sure'));
        			 $('#edit').show().trigger('click');
        			 $('#true_name').val(true_name);
        			 $('#mobile').val(mobile);
        			 $('#qq').val(qq);
        			 $('#user_info input').each(function(){
        	        		 icoImg($(this),true);
        	         });

        		 }else{
        			 $('<label>'+msg+'</label>').insertAfter($('#sure'));
        		 }
        		 //2秒后消失
        		 setTimeout(function(){
    				 $('#sure').next('label').remove();
    			 },2000);
        	 }); 
         }

         /*订单提交判断是否有输入备注信息*/
         $('#order_form').submit(function(){
        	  if(!check() || $('#sure').is(':visible')){
        		  return false;
        	 }
         });

     }else if(url == 'pay'){
    	 //确认支付页面
    	 $('#pay_bank li').click(function(){
    		 $('#pay_bank span').removeClass('on');
    		 $(this).children('span').addClass('on');
    		 $(this).children('input').attr('checked','checked');
    	 });

     }else{
    		/*幻灯片鼠标事件*/
    	    $('#slide_img li').mouseover(function(){
    	        $(this).addClass('on').siblings().removeClass('on');
    	        $("#slide_pic").attr('src',$(this).children('img').attr('src'));
    	        } );

    	    /*数量点击事件*/
    	    var quantity = parseInt($('#quantity').val());
    	    $('#_add,#_cut').click(function(){
    	    	quantity = $(this).attr('id') == '_add' ? quantity + 1 : quantity -1;
    	        quantity = quantity <= 0 ? 1 : quantity <= 99 ? quantity : 99 ;
    	    	$('#quantity').val(quantity);
    	        });

    	    /*数量输入事件*/
    	    $('#quantity').blur(function(){
    	    	quantity = parseInt($(this).val());
    	        if(isNaN($(this).val())){
    	            alert('请输入正确的数值');
    	            $(this).val(1);
    	            return;
    	            }
    	        if(quantity <= 0){
    	            $(this).val(1);
    	            }else if(quantity > 99){
    	          	$(this).val(99);
    	             }
    	        
    	        });

    	    /*购买跳转事件*/
    	     $('#go_cart').click(function(){
    	    	 var option = null;   	    	 
    	    	 /*针对旅游，其他商品有属性的也要在这加*/   
    	    	 var type = $('#goods_type').val();
    	    	 if(type == 'travel'){
    	    		 var month = $("#date_con>li[class='date_hover']").text();
    	    		 var day = $(".date_class>li[class='date_hover']").text();
    	    		 if(day == ''){
    	    			 alert('请选择哪一天');
    	    			 return false;
    	    		 }else if(month == ''){
    	    			 alert('请选择哪一月');
    	    			 return false;
    	    		 }
    	    		 option = month+day;
    	    		 //因部分浏览器不识别json对象（JSON.stringify将json对象转为字符串）,手动转为JSON字符串
    	    		 option = '{\"'+'travel'+'\":\"'+option+'\"}';
    	    		 $('#option').val(encodeURI(option));
    	    	 }
    	 	    $('#toBuyFrom').submit();
    	        });
    	     /*添加购物车*/
    	     $('#pay_cart').click(function(){
    	    	 var team_id = Math.abs($(this).attr('team_id'));
    	    	 var team_quantity = Math.abs($('#quantity').val());
    	    	 var option_info = {};
    	    	 var type = $('#goods_type').val();
    	    	 /*针对旅游，其他商品有属性的也要在这加*/   	    	 
    	    	 if(type == 'travel'){    	    		 
    	    		 option_info['travel'] = $("#date_con>li[class='date_hover']").text()+$(".date_class>li[class='date_hover']").text();
    	    	 }
    	    	 $.get('http://www.360hun.com/buy/cart_set.php',{id:team_id,quantity:team_quantity,option:option_info},function(data){
    	    		 if(data != '0'){
    	    			 alert('添加成功');
    	    			 $('#cart_quantity').text(data);
    	    		 }else{
    	    			 alert('网络繁忙，请重新添加');
    	    		 }
    	    	 },'text');
    	     });

     }

});
