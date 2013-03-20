$(function(){

//初始幻灯
var nav_index = 0;
//幻灯个数
var slide_length = $('#slide_pic .piclay').length;
//上一张幻灯片
var old_index = slide_length;
//幻灯宽度
//var slide_width = $('#slide_pic').width();
//幻灯高度
var slide_height = $('#slide_pic').height();

/*定义动画
var slide_cartoon = new Array(
	{'left':slide_width+'px','opacity':'0.2'},
	{'left':-slide_width+'px','opacity':'0.2'},
	{'top':slide_height+'px','opacity':'0.2'},
	{'top':-slide_height+'px','opacity':'0.2'},
	{'margin-top':slide_height/2+'px','margin-bottom':slide_height/2+'px','margin-left':slide_width/2+'px','width':'10px','height':'10px','opacity':'0.2'}
	);
*/
//开始自动加载
slide_auto();
//幻灯函数
function slide_auto(){
	
	//指示器
	slide_nav_cartoon(nav_index);
	//上一个幻灯索引
	old_index = old_index == slide_length ? 0 : nav_index -1;
	//随机获取动画
	//cartoon = Math.round(Math.random()*(slide_cartoon.length-1));
	//幻灯切换
	$('#slide_pic .piclay').eq(old_index).css('z-index','98').animate({'top':-slide_height+'px','opacity':'0.2'},function(){ $(this).removeAttr('style'); });
	$('#slide_pic .piclay').eq(nav_index).show();
	//重新给索引赋值
	nav_index = nav_index < slide_length - 1 ? nav_index + 1 : 0;
	tm_slide = setTimeout(slide_auto,3000);
}
/*幻灯指示器hover*/
$('#slide_nav li,#slide_pic .piclay').stop().hover(function(){
	clearTimeout(tm_slide);
	//当前指示器
	nav_index = $(this).index();
	time_tmp = setTimeout(function(){
		slide_nav_cartoon(nav_index);
		$('#slide_pic .piclay').eq(nav_index).fadeIn(200).siblings().fadeOut(200);
	},200);
	
},function(){
	clearTimeout(time_tmp);
	tm_slide = setTimeout(slide_auto,1000);
});
/*幻灯片左侧指示器*/
function slide_nav_cartoon(nav_now){
	$('#slide_nav li').each(function(i){
		i != nav_now ? 
		$(this).removeClass('n_0'+(i+1)+'_on').addClass('n_0'+(i+1)) : 
		$(this).removeClass('n_0'+(i+1)).addClass('n_0'+(i+1)+'_on');
	});
}
/*Tab切换*/
$('.tab ul li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$(this).parents('.content').children('.goods').hide();
$(this).parents('.content').children('.nav_'+($(this).index()+1)).show();
});


});