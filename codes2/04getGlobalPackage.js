/**
 * 测试require全局的package，我已经通过npm install zc/ -g的方式安装了全局的包
 * 想验证，是否可以通过require的方式获得
 * 已经发布的zc包是packageTest
 * Created by zc on 2017/5/28.
 */
var a=require("zc");
a.say();
