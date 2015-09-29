<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-6-18
 * Time: 下午2:45
 */

class AutoTaskAction extends Action {
    public function __construct()
    {
        parent::__construct();
    }
    public function Index()
    {
       $this->showTemplate('./Tpl/AutoTask/index.html');
    }
	public function Report()
    {
        $this->show('./Tpl/AutoTask/report.html');
    }
	
    public function StartTaskApi()
    {
        if(isset($_POST['ts']) && !empty($_POST['ts']) &&
            isset($_POST['tn']) && !empty($_POST['tn']) )
        {
            $timeStampe = $_POST['ts'];
            $testName = $_POST['tn'];
            $oAutoTaskModel = new AutoTaskModel();
            $aNewTaskID = $oAutoTaskModel->AddTask($timeStampe,$testName);
            if($aNewTaskID){
                $this->ajaxReturn($aNewTaskID, "add success,starttime:{$timeStampe}, testname:{$testName}", 0);
            }else{
                $this->ajaxReturn($aNewTaskID, "return value is wrong,starttime:{$timeStampe}, testname:{$testName}", -2);
            }
        }
        else{
            $this->ajaxReturn("-1", "input args are wrong, need: ts,tn", -1);
        }
    }
	public function EndJobApi()
    {
		//var_dump($_FILES);
		//var_dump($_POST);
        if(isset($_FILES['fillog']) && !empty($_FILES['fillog']) &&
            isset($_POST['taskid']) && !empty($_POST['taskid']) &&
            isset($_POST['tv']) && !empty($_POST['tv']) &&
            isset($_POST['tr']))
        {
			$comment = isset($_POST['jcomment']) && !empty($_POST['jcomment'])? $_POST['jcomment']:"";
			
			$logPath = 'E:\dabu\wamp\www\eva\upload\autojobs\\';
			$fileName = $_FILES['fillog']['name'];
			if(move_uploaded_file($_FILES['fillog']['tmp_name'], $logPath.$fileName)){
				$oAutoJobModel = new AutoJobModel();
				$aJobId = $oAutoJobModel->InsertJobResult($_POST['taskid'],$_POST['tv'],$_POST['tr'],$fileName, $comment);
				if($aJobId){
                $this->ajaxReturn($aJobId, "add job result success:", 0);
				}else{
					$this->ajaxReturn("", "return value is wrong,value is:".$aJobId, -2);
				}
			}			
        }
        else{
            $this->ajaxReturn("", "input args are wrong, need: fillog,taskid,tv,tr(0:pass, 1:fail), [option:jcomment]", -1);
        }
    }
	
    public function EndTaskApi()
    {
        if(isset($_POST['taskid']) && !empty($_POST['taskid']) &&
            isset($_POST['ets']) && !empty($_POST['ets']) &&
            isset($_POST['tr']) && !empty($_POST['tr']))
        {
            $testtaskid = $_POST['taskid'];
            $endTimeStamp = $_POST['ets'];
            $testResult = $_POST['tr'];
			
			$testVersion = isset($_POST['tv']) && !empty($_POST['tv'])? $_POST['tv']:"";
			$testTaskComment = isset($_POST['tcomment']) && !empty($_POST['tcomment'])? $_POST['tcomment']:"";
			
            $oAutoTaskModel = new AutoTaskModel();
            $aUpdateResults = $oAutoTaskModel->UpdateTaskStatus($testtaskid,$endTimeStamp,$testVersion,$testResult,$testTaskComment);
            if($aUpdateResults){
                $this->ajaxReturn("", "update success: taskid:{$testtaskid},endtime:{$endTimeStamp}, testversion: {$testVersion}, result:{$testResult} ", 0);
            }else{
                $this->ajaxReturn($aUpdateResults, "return value is wrong,taskid:{$testtaskid}, endtime:{$endTimeStamp}, testversion: {$testVersion}, result:{$testResult} ", -2);
            }
        }
        else{
            $this->ajaxReturn("", "input args are wrong, need: taskid,ets,tr,[option:tv, tcomment]", -1);
        }
    }

    public function getDateList(){
        $oAutoTaskModel = new AutoTaskModel();
        $dateList = $oAutoTaskModel->getDateList();
		
        if($dateList){
            $this->ajaxReturn($dateList, "", 1);
        }else{
            $this->ajaxReturn("", "getDateList return value is wrong".$dateList, -1);
        }
    }

    public function getStatusList()
    {
        if(isset($_GET['dt']) && !empty($_GET['dt']))
        {
            $DateTime = $_GET['dt'];

            $oAutoTaskModel = new AutoTaskModel();

            $aDateResults = $oAutoTaskModel->getStatusList($DateTime);


           if($aDateResults){
                $this->ajaxReturn($aDateResults, "", 1);
            }else{
                $this->ajaxReturn($aDateResults, "return value is wrong,date:{DateTime}", -2);
            }
        }
        else{
            $this->ajaxReturn("", "input args are wrong, need: sts,ets,tr,tv", -1);
        }
    }

    public function getFailList()
    {
        if(isset($_GET['dt']) && !empty($_GET['dt']))
        {
            $DateTime = $_GET['dt'];

            $oAutoTaskModel = new AutoTaskModel();

            $aDateResults = $oAutoTaskModel->getFailList($DateTime);

            if($aDateResults){
                $this->ajaxReturn($aDateResults, "", 1);
            }else{
                $this->ajaxReturn($aDateResults, "return value is wrong,date:{DateTime}", -2);
            }
        }
        else{
            $this->ajaxReturn("", "input args are wrong, need: sts,ets,tr,tv", -1);
        }
    }

	public function getReportDataByDays()
	{
		if(isset($_GET['days']) &&  is_numeric($_GET['days'])){
			$days = $_GET['days'];
			$oAutoTaskModel = new AutoTaskModel();
			$data = $oAutoTaskModel->getReportDatabyDays($days);
			
			if($data){
				$this->ajaxReturn($data, "", 1);
			}else{
				$this->ajaxReturn($data, "return value is wrong,date:{DateTime}", -2);
			}
		}else{
			$this->ajaxReturn("", "input args are wrong, need: days", -1);
		}
	}
} 