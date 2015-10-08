<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-6-18
 * Time: 下午3:05
 */
class AutoJobModel extends Model
{
    public function __construct()
    {
        $this->db(1, "mysql://root:root@192.168.1.61:3306/test");
        $this->trueTableName = "tbl_autojob";
    }
//InsertJobResult($_POST['taskid'],$_POST['tv'],$_POST['tr'],$fileName);
	public function InsertJobResult($taskid, $testversion, $testresult, $fileName, $comment)
    {
        $dataNewJob = array(
            'f_atid' => $taskid, // task id primary key
            'ajpcmgrver' => $testversion, // pcmgr version
            'ajresult' => $testresult, // 0: passs, 1: fail
            'ajlogpath' => $fileName, // logpath 
			'ajcomment' => $comment
        );
        return $this->add($dataNewJob);
    }

    public function getStatusList($datetime){
        $aQuery = <<<EOM
SELECT * FROM `test`.`tbl_autotasks` WHERE substring_index(`atstarttime`, '_', 1) = {$datetime} ORDER BY atid DESC
EOM;
		//echo $aQuery;
        return $this->db(1)->query($aQuery);
    }
} 