<?php

class FrameAction extends Action {
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        $this->display();
    }
    public function welcome(){
        $this->showTemplate("./Tpl/Frame/welcome.html");
    }

//    public function template(){
//        $this->assign("sub_template","./Tpl/Frame/welcome.html");
//        $this->display();
//    }
} 