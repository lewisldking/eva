<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-6-18
 * Time: 下午3:05
 */
class AutoTaskModel extends Model
{
    public function __construct()
    {
        $this->db(1, "mysql://root:root@192.168.1.61:3306/test");
        $this->trueTableName = "tbl_autotasks";
    }

    public function AddTask($starttime, $testname)
    {
        $dataNewTask = array(
            'atstarttime' => $starttime, // 表示job
            'tname' => $testname,
            'status' => 0,
            'tresult' => ''
        );
        return $newTaskID = $this->add($dataNewTask);
        //return 1;
    }

    public function UpdateTaskStatus($taskid, $endtime,$testversion, $testresult, $testcomment)
    {
        $updateData = array(
            'atendtime' => $endtime,
            'tresult' => $testresult,
			'tversion' => $testversion,
			'tcomment' => $testcomment,
            'status' => 1
        );
        //return 1;
        return $this->db(1)->where("atid = {$taskid}")->save($updateData);
    }

    public function getDateList()
    {
        $aQuery = <<<EOM
SELECT distinct(substring_index(`atstarttime`, '_', 1)) as date FROM `test`.`tbl_autotasks` order by date DESC limit 30;
EOM;
		//echo $aQuery;
        return $this->db(1)->query($aQuery);
    }
    public function getStatusList($datetime){
        $aQuery = <<<EOM
SELECT * FROM `test`.`tbl_autotasks` LEFT JOIN `tbl_autojob` on `f_atid` = atid WHERE substring_index(`atstarttime`, '_', 1) = {$datetime} ORDER BY atid DESC
EOM;
		//echo $aQuery;
        return $this->db(1)->query($aQuery);
    }
	
	public function getReportDatabyDays($days)
	{
		if((int)$days == 0)
		{
			$where =  "1";
		}else{
			$where = "substring_index(`atstarttime`, '_', 1) >".date('Ymd',strtotime('-'.$days.' day'));
		}
		$aQuery = <<<EOM
		SELECT  ajresult as label, count(*) as data FROM `test`.`tbl_autotasks` LEFT JOIN `tbl_autojob` on `f_atid` = atid WHERE {$where} GROUP BY ajresult ORDER BY atid DESC 
EOM;
		return $this->db(1)->query($aQuery);
	}
} 