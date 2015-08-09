<?php

/**
 * 合作伙伴前台首页
 * 2015-3-23@youge
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require_once(dirname(__FILE__).'/includes/lib_specialpro.php');
error_reporting ( E_ALL  ^  E_NOTICE );		//不报告Notice错误
/*------------------------------------------------------ */
//-- 如果用没有指定活动id，将页面重定向到即将结束的活动
/*------------------------------------------------------ */

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

if (empty($_REQUEST['type']))
{
    ecs_header('Location: index.php');
}

if (empty($_REQUEST['act']))
{
    //默认显示页面
    $_REQUEST['act'] = 'main';
}
/* 初始化分页信息 */
$page = isset($_REQUEST['page'])   && intval($_REQUEST['page'])  > 0 ? intval($_REQUEST['page'])  : 1;
$size = 4;                                                      //页面要求单独显示4，不从数据库读取配置

// $position = assign_ur_here($cat_id, $brand_name);
// $smarty->assign('page_title',       $position['title']);    // 页面标题
// $smarty->assign('ur_here',          $position['ur_here']);  // 当前位置

assign_template();

if($_REQUEST['type']=='cheaper'){			//特惠活动	
	$smarty->display('activity_cheaper.dwt');
}else if($_REQUEST['type']=='package'){		//产品超值包
	$smarty->display('activity_package.dwt');
}else if($_REQUEST['type']=='exchange'){	//换购专区

	/* 如果页面没有被缓存则重新获取页面的内容 */
	$cat_id=21;
	$sort='goods_id';
	$order='DESC';

    $children = get_children($cat_id);
    $record_count=get_specialpro_count($children);
    $goodslist = get_specialpro_lists($children, $size, $page, $sort, $order);

    $smarty->assign('goodslist',$goodslist);
    // p($goodslist);

    $smarty->assign('page',page_set($record_count,$size));
	$smarty->display('activity_exchange.dwt');
}

