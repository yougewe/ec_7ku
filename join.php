<?php

/**
 * 招商加盟前台首页
 * 2015-3-24@youge
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

/*------------------------------------------------------ */
//-- 如果用没有指定活动id，将页面重定向到即将结束的活动
/*------------------------------------------------------ */

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

if (empty($_REQUEST['act']))
{
    //默认显示页面
    $_REQUEST['act'] = 'main';
}
/* 初始化分页信息 */
$page = isset($_REQUEST['page'])   && intval($_REQUEST['page'])  > 0 ? intval($_REQUEST['page'])  : 1;
$size = isset($_CFG['page_size'])  && intval($_CFG['page_size']) > 0 ? intval($_CFG['page_size']) : 10;

// $position = assign_ur_here($cat_id, $brand_name);
// $smarty->assign('page_title',       $position['title']);    // 页面标题
// $smarty->assign('ur_here',          $position['ur_here']);  // 当前位置

assign_template();
if($_REQUEST['act'] == 'main'){
	$smarty->display('join.dwt');
}

