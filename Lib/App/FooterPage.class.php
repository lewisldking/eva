<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-2-12
 * Time: 上午10:23
 */
import("ORG.Util.Page");
class FooterPage extends Page{
    public function ajaxShow($sFunc,$sExpend="")
    {
        if($this->totalRows <= 0) {
            return '';
        }else {
            $iFrom = ($this->nowPage - 1) * $this->listRows + 1;
            $iEnd = $this->nowPage * $this->listRows;
            $iEnd = $iEnd > $this->totalRows?$this->totalRows:$iEnd;
            $sHtml = '<div class="results"><span>显示 '.$iFrom.'-'.$iEnd.' 条  共 '.$this->totalRows.' 条</span></div>';
            $sHtml .= '<ul class="pager">';
            $iNowRollPageStart = floor($this->nowPage / $this->rollPage) * $this->rollPage;
            $iNowRollPageStart = $iNowRollPageStart <= 0?1:$iNowRollPageStart;
            $iNowRolePageEnd = $iNowRollPageStart + $this->rollPage;
            $iNowRolePageEnd = $iNowRolePageEnd > $this->totalPages?$this->totalPages:$iNowRolePageEnd;
            if($this->nowPage <= 1) {
                $sHtml .= '<li class="disabled">&laquo; 首页</li>';
            }else {
                $sHtml .= '<li><a href="javascript:void(0);" onclick=\''.$sFunc.'(1,"'.$sExpend.'")\'>&laquo; 首页</a></li>';
                $iPrevRollPage = $iNowRollPageStart - $this->rollPage;
                $iPrevRollPage = $iPrevRollPage > 1?$iPrevRollPage:1;
                $sHtml .= '<li><a href="javascript:void(0);" onclick=\''.$sFunc.'('.$iPrevRollPage.',"'.$sExpend.'")\'>&laquo; 前'.$this->rollPage.'页</a></li>';
            }

            for($i = $iNowRollPageStart; $i <= $iNowRolePageEnd; $i ++) {
                if($i == $this->nowPage) {
                    $sHtml .= '<li class="current">'.$i.'</li>';
                }else {
                    $sHtml .= '<li><a href="javascript:void(0);" onclick=\''.$sFunc.'('.$i.',"'.$sExpend.'")\'>'.$i.'</a></li>';
                }
            }
            if($this->nowPage >= $this->totalPages) {
                $sHtml .= '<li class="disabled">尾页 &raquo;</li>';
            }else {
                $iNextRollPage = $iNowRolePageEnd + $this->rollPage;
                $iNextRollPage = $iNextRollPage > $this->totalPages?$this->totalPages:$iNextRollPage;
                $sHtml .= '<li><a href="javascript:void(0);" onclick=\''.$sFunc.'('.$iNextRollPage.',"'.$sExpend.'")\'>后'.$this->rollPage.'页  &raquo;</a></li>';
                $sHtml .= '<li><a href="javascript:void(0);" onclick=\''.$sFunc.'('.$this->totalPages.',"'.$sExpend.'")\'>尾页  &raquo;</a></li>';
            }
            $sHtml .= '</ul>';
            return $sHtml;
        }
    }
} 