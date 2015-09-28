<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-2-11
 * Time: 上午10:39
 */

class HelpAction extends Action {
    public function __construct(){
        parent::__construct();
    }

    public function Index(){
        echo "help me!";
    }

    public function SiteMap(){
        echo "site maps";
    }
} 