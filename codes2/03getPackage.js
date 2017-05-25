/**
 * Created by zc on 2017/5/24.
 */
//下述会报错，只是因为没有以点开头
//没有点的话，就看做是模块，但是找不到模块！
// var packageTest=require("packageTest");
var packageTest = require("./packageTest");
packageTest.say();
var package2=require("./package2");
package2.say();