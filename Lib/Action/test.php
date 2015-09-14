<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-2-13
 * Time: 上午11:10
 */
//echo "test";
//$buildPath = 'E:\apc\Builds\\';
//$tempPath ='E:\apc\Builds\temp\\';
//$all = '20';
//
//echo sprintf('exe %s %s %s', $tempPath, $buildPath, $all);
//exit;
$xmlFilePath = 'E:\\result_final.xml';
$handle = fopen($xmlFilePath, 'r');
$content = fread($handle, filesize($xmlFilePath)); // 读取文件内容到 content
$xml = simplexml_load_string($content);

//(double)$xml->AvgValue
//(double)$xml->DeviValue
//$detailsNode = $xml->Details;
$detailsValue = array();
foreach ($xml->Details->Value as $detail_value) {
    $detailsValue[] = (double)$detail_value;
}
var_dump($detailsValue);
echo "<br/>";
$details = "";
if (count($detailsValue) > 0) {
    $details = implode(',', $detailsValue);
    echo $details."<br/>";
}
$dataPCMarkResult = array(
    'f_jid' => 111,
    'pcavgvalue' => (double)$xml->AvgValue,
    'pcdevivalue' => (double)$xml->DeviValue,
    'pcdetailvalues' => $details
);
var_dump($dataPCMarkResult);
exit;

$string = 'PCMgr_Setup_10_4_25696_501_avc_oem_bd.exe';
ereg("PCMgr_Setup_", $string, $res);
echo $res[1];
exit;

$temp_array = array();
$temp_array["openfile"]['label'] = 'openfile';
$temp_array["openfile"]['data'][] = array('pcmgr_aa', '123');
$temp_array["openfile"]['data'][]= array('pcmgr_bb', '456');
//var_dump($temp_array);
echo json_encode($temp_array);
exit;

foreach (glob('E:\apc\test\*.xml') as $rar) {
    unlink($rar);
}
exit;

$string = <<<XML
<?xml version='1.0'?>
<document>
<Category name="DownloadFiles" totalValue="33.3838669714286">
<TestCase name="AdbeRdr11006_en_US.exe">
<AvgValue>4.73397117142857</AvgValue>
<DeviValue>0.011498514525763</DeviValue>
</TestCase>
<TestCase name="Firefox Setup 26.0.exe">
<AvgValue>2.07465305714286</AvgValue>
<DeviValue>0.0041256913716221</DeviValue>
</TestCase>
<TestCase name="LibreOffice_4.2.0_Win_x86.msi">
<AvgValue>18.8157651571429</AvgValue>
<DeviValue>0.0148602108349637</DeviValue>
</TestCase>
<TestCase name="gimp-2.8.10-setup.exe">
<AvgValue>7.75947758571429</AvgValue>
<DeviValue>0.00913613466523034</DeviValue>
</TestCase>
</Category>
<Category name="LoadWebsites" totalValue="17.2033754857143">
<TestCase name="http://www.qq.com/">
<AvgValue>7.16722985714286</AvgValue>
<DeviValue>0.354917905712844</DeviValue>
</TestCase>
<TestCase name="http://www.baidu.com/">
<AvgValue>1.37326835714286</AvgValue>
<DeviValue>0.221305831413808</DeviValue>
</TestCase>
<TestCase name="http://www.youku.com/">
<AvgValue>3.99379818571429</AvgValue>
<DeviValue>0.111393850946443</DeviValue>
</TestCase>
<TestCase name="http://www.jd.com/">
<AvgValue>1.67258238571429</AvgValue>
<DeviValue>0.21670154459614</DeviValue>
</TestCase>
<TestCase name="http://www.amazon.cn/">
<AvgValue>2.46505375714286</AvgValue>
<DeviValue>0.0888576740984281</DeviValue>
</TestCase>
<TestCase name="http://www.tmall.com/">
<AvgValue>0.531442942857143</AvgValue>
<DeviValue>0.0318184588244379</DeviValue>
</TestCase>
</Category>
</document>
XML;

$handle = fopen('E:\apc\test\Win81_clean_150309-153301_final.xml', 'r');

$content = fread($handle, filesize('E:\apc\test\Win81_clean_150309-153301_final.xml'));

$xml = simplexml_load_string($content);
foreach($xml->Category as $cate){
//    var_dump($cate);
    echo $cate['name'];
    echo "<br/>";
    echo $cate['totalValue'];
    echo "<br/>";
    echo $cate['name']."__".$cate['totalValue'];
    echo "<br/>";
    foreach($cate->TestCase as $tc){
        echo $tc['name']."__".$tc->AvgValue."__".$tc->DeviValue;
        echo "<br/>";
        print_r((double)$tc->AvgValue);
        echo "<br/>";
    }

    echo "<br/><br/>";
}
exit;
print_r($xml->cmd[0]['name']);

print_r($xml);
$login = $xml->login;//这里返回的依然是个SimpleXMLElement对象
print_r($login);
$login = (string) $xml->login;//在做数据比较时，注意要先强制转换
print_r($login);
exit;

$a = filemtime('E:\apc\Builds\VB_OEM\PCMgr_Setup_10_4_25460_501.exe');
date_default_timezone_set('PRC');
echo date("Y-m-d H:i:s", $a);
exit;
$build_id= "1234";
echo $str = "INSERT INTO `evalpt`.`task_info` (`f_bid`) VALUES ('{$build_id}');";
exit;

function test12($inWord,&$outWord=null)
{
    $outWord = "outWord123";
    return 'inword:'.$inWord;
}

$w1 = 'abc';
$w2;
echo test12($w1, $w2);
echo"<br/>";
echo $w2;

exit;
exec('E:\apc\PFMaster\PFUploadCheck.exe E:\apc\Builds\temp\AVT_SelfPower E:\apc\Builds\AVT_SelfPower 2', $output);
var_dump($output);
exit;
var_dump($output);
if(count($output) == 5)
{
    echo $output[0];
}

exit;
$all = '15';
if($all){
    echo "true";
}
else{
    echo "false";
}

echo  'E:\apc\Builds\\';
exit;
$name = 'AVC_OEM-PCMgr_Setup_10_4_25417_501.part10.rar';

var_dump(explode('-', $name, 2));
$nameArray = explode('-', $name, 2);
if(!empty($nameArray) && count($nameArray) == 2){
    echo $buildType= $nameArray[0];
    echo "<br/>";
    $buildNameArray = explode('.',$nameArray[1]);
//    var_dump($BuildInfoArray);
    if(!empty($buildNameArray) && count($buildNameArray) ==3 ){
        echo $buildNameArray[0];
//        echo "<br/>";
//
//         if(preg_match("/[1-9]\\d?/",$buildNameArray[1],$tempArray ))
//         {
////             var_dump($tempArray);
//             echo  $tempArray[0];
//         }

    }
}