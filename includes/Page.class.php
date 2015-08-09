<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------
// namespace Manager\Plugin;

class Page{
    public $firstRow;               // 起始行数
    public $listRows;               // 列表每页显示行数
    // public $parameter;           // 分页跳转时要带的参数
    public $totalRows;              // 总行数
    public $totalPages;             // 分页总页面数
    public $rollPage   = 9;         // 分页栏每页显示的页数

    private $p       = 'page';      //分页参数名
    private $url     = '';          //当前链接URL
    private $nowPage = 1;
    private $param   = array();
    private $isAjax  = false;       //是否为ajax分页
    // private $lastpageShownum =true;

	// 分页显示定制
    private $config  = array(
        // 'header' => '<span class="rows">共%TOTAL_ROW%条记录&nbsp;|&nbsp;每页%LIST_ROWS%条</span>',
        'prev'   => '上一页',
        'next'   => '下一页',
        'first'  => '1',
        'last'   => '%TOTAL_PAGE%',
        'theme'  => '%HEADER% %UP_PAGE% %FIRST% %LINK_PAGE% %END% %DOWN_PAGE%',
    );

    /**
     * 架构函数
     * @param array $totalRows  总的记录数
     * @param array $listRows  每页显示记录数
     * @param array $parameter  分页跳转的参数
     */
    public function __construct($totalRows, $listRows=20,$isAjax=false,$p='',$url='') {
        /* 基础设置 */
        $this->totalRows  = $totalRows;             //设置总记录数
        $this->listRows   = $listRows;              //设置每页显示行数
        if($p){
            $this->nowPage= intval($p);
        }else{
            $this->nowPage= empty($_GET[$this->p]) ? 1 : intval($_GET[$this->p]);
        }
        $this->isAjax     = $isAjax==true ? true : false;
        $this->nowPage    = $this->nowPage>0 ? $this->nowPage : 1;
        $this->firstRow   = $this->listRows * ($this->nowPage - 1);
        $this->url = $url=='' ? 'http://'.$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"] : $url;
    }

    /**
     * 定制分页链接设置
     * @param string $name  设置名称
     * @param string $value 设置值
     */
    public function setConfig($name,$value) {
        if(isset($this->config[$name])) {
            $this->config[$name] = $value;
        }
    }

    /**
     * 生成链接URL
     * @param  integer $page 页码
     * @return string
     * 2015-1-02@youge
     */
    private function url($page){
        $this->param[$this->p]=$page;
        $purl=$this->url;
        if(preg_match('/(\W'.$this->p.')=(\d*)/',$this->url)){
            $purl=preg_replace('/(\W'.$this->p.'=)(\d*)/','${1}'.$page,$this->url);
        }else{
            $purl=preg_match('/\?/',$this->url)?$this->url.'&'.$this->p.'='.$page:$this->url.'?'.$this->p.'='.$page;
        }
        return $purl;
    }

    /**
     * 组装分页链接
     * @return string
     */
    public function show() {
        if(0 == $this->totalRows) return '';
        /* 计算分页信息 */
        $this->totalPages = ceil($this->totalRows / $this->listRows); //总页数
        if(!empty($this->totalPages) && $this->nowPage > $this->totalPages) {
            $this->nowPage = $this->totalPages;
        }

        /* 计算分页零时变量 */
		$now_cool_page_ceil = intval($this->rollPage/2);

        //上一页
        $up_row  = $this->nowPage - 1;
        $up_page = $up_row > 0 ? '<a class="next" href="' . $this->url($up_row) . '">' . $this->config['prev'] . '</a>' : '';

        //下一页
        $down_row  = $this->nowPage + 1;
        $down_page = ($down_row <= $this->totalPages) ? '<a class="next" href="' . $this->url($down_row) . '">' . $this->config['next'] . '</a>' : '';

        //第一页
        $the_first = '';
        if($this->totalPages > $this->rollPage && ($this->nowPage - $now_cool_page_ceil) >= 1){
            $the_first = '<a class="num" title="第一页" href="' . $this->url(1) . '">' . $this->config['first'] . '</a>';
            if(($this->nowPage - $now_cool_page_ceil) >= 2){            //输出省略号
                $this->rollPage -= 2;
                $the_first .= '<a href="javascript:;">...</a>';
            }else{
                $this->rollPage -= 1;
            }
        }
        //最后一页
        $the_end = '';
        if($this->totalPages > $this->rollPage && ($this->nowPage + $now_cool_page_ceil-1) < $this->totalPages){
            if(($this->nowPage + $now_cool_page_ceil-1) < $this->totalPages){
                $this->rollPage -= 2;
                $the_end = '<a href="javascript:;">...</a>';
            }else{
                $this->rollPage -= 1;
            }
            $the_end .= '<a class="num" v="'.$this->totalPages.'" title="最后一页" href="' . $this->url($this->totalPages) . '">' . $this->config['last'] . '</a>';

        }
        $the_end .= '<input type="hidden" class="endval" maxp="'.$this->totalPages.'" />';
        //数字连接
        $link_page = "";
        for($i = 1; $i <= $this->rollPage; $i++){
			if(($this->nowPage - $now_cool_page_ceil) <= 0 ){
				$page = $i;
			}elseif(($this->nowPage + $now_cool_page_ceil - 1) >= $this->totalPages){
				$page = $this->totalPages - $this->rollPage + $i;
			}else{
				$page = $this->nowPage - $now_cool_page_ceil + $i;
                if($this->nowPage - $now_cool_page_ceil>1){             //让数字居中
                    $page ++ ;
                }
			}
            if($page > 0 && $page != $this->nowPage){
                if($page <= $this->totalPages){
                    $link_page .= '<a class="num" href="' . $this->url($page) . '">' . $page . '</a>';
                }else{
                    break;
                }
            }else{
                if($page > 0){
                    $link_page .= '<a class="dq_page">' . $page . '</a>';
                }
            }
        }
        if($this->isAjax == true){
            $link_page  = preg_replace('/(href=)("[^"]+")/','${1}"javascript:;" onclick="ajaxPageJump(this)" url=${2}',$link_page);
            $up_page    = preg_replace('/(href=)("[^"]+")/','${1}"javascript:;" onclick="ajaxPageJump(this)" url=${2}',$up_page);
            $down_page  = preg_replace('/(href=)("[^"]+")/','${1}"javascript:;" onclick="ajaxPageJump(this)"  url=${2}',$down_page);
            $the_first  = preg_replace('/(href=)("[^"]+")/','${1}"javascript:;" onclick="ajaxPageJump(this)"  url=${2}',$the_first);
            $the_end    = preg_replace('/(class="endval")/','${1} isajax="1" url="'.$this->url($this->totalPages).'"',$the_end);
            $the_end    = preg_replace('/(href=)("[^"]+")/','${1}"javascript:;" onclick="ajaxPageJump(this)" url=${2}',$the_end);
        }
        
        // 替换分页内容
        $page_str = str_replace(
            array('%HEADER%', '%NOW_PAGE%', '%UP_PAGE%', '%DOWN_PAGE%', '%FIRST%', '%LINK_PAGE%', '%END%', '%TOTAL_ROW%', '%TOTAL_PAGE%','%LIST_ROWS%'),
            array($this->config['header'], $this->nowPage, $up_page, $down_page, $the_first, $link_page, $the_end, $this->totalRows, $this->totalPages,$this->listRows),
            $this->config['theme']);
        // p($page_str);
        return "{$page_str}";
    }
}
