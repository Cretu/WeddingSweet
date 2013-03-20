$(function(){

	/*顶部导航栏下拉事件*/
	$("#pro_cat,#header_side").hover(
		function(){
			$("#header_side").show();
		},
		function(){
			$("#header_side").hide();
		}
	);
	
	/*头部下拉框*/
	$('.top_right .item').hover(function(){
		$(this).children('span').addClass('up');
		$(this).removeClass('item').addClass('item_on').children('.mlist').show();
	}, function(){
		$(this).children('span').removeClass('up');
		$(this).removeClass('item_on').addClass('item').children('.mlist').hide();
	});

	/*搜索按钮表事件*/
	$('#search').focus(function(){
		if($(this).val() == this.defaultValue){
			$(this).val('').css('color','#000');
		}
	}).blur(function(){
		if($(this).val() == this.defalultValue || $(this).val() == ''){
			$(this).removeAttr('style').val(this.defaultValue);
		}
	});
	

	/*搜索表单提交事件*/
	$('#search_sub').click(function(){
		var key = $.trim($('#search').val());
		if(key == document.getElementById('search').defaultValue || key == ''){
			return false;
		}else{
			location.href="/search.php?key="+$('#search').val();
		}
	});
	
	/*购物车hover*/
	$('#cart_btn').hover(function(){
		$('#cart_list').show();
		$.get('/buy/cart_set.php?do=get',function(data){
			if(data){
				var team = data['team'];
				var content = '';
				for(var i in team){
					content += '<li id="'+i+'"><div class="pic"><a href="/'+team[i].id+'.html"><img src="'+team[i].image+'" /></a></div><div class="des"><p class="title"><a href="/'+team[i].id+'.html">'+team[i].child_name+'-'+team[i].product+'</a></p>'+team[i].title+'</div><div class="op"><p class="price"><span>¥'+team[i].team_price+'</span><label>x</label>'+team[i].quantity+'</p><p class="delete"><a href="'+team[i].id+'" id="cart_'+i+'" class="delete_cart">删除</a></p></div><div class="clear"></div></li>';
				}
				$('#cart_list ul').html(content);
				$('#cart_count').text(data['count']);
				$('#cart_origin').text('¥ '+data['origin']);
			}
		},'json');
	},function(){
		$('#cart_list').hide();
	});
	
	/*删除购物车某个商品*/
	$('#cart_list').delegate('.delete_cart','click',function(){
		var id = $(this).attr('href');
		var d_url = '/buy/cart_set.php?del='+id;
		var choose = $(this).attr('id').substring('5');	
		$.get(d_url,function(data){
			if(data != 'error' ){
				$('#cart_list li').eq(choose).attr('style','display:none');
				var val = parseInt($('#cart_quantity').text());
				val = val-1;
				$('#cart_quantity').text(val);
				$('#cart_count').text(val);
				$('#cart_origin').text('¥ '+data);
			}else{
				alert('删除失败！');
			}
		});
		return false;
	});		
	
});

url =  location.pathname;
url = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('\.'));
