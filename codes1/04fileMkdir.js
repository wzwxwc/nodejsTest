/**
 * 创建目录文件夹
 * Created by zc on 2017/6/9.
 */
var fs = require("fs");
//下述这个的\是转义符，需要特殊处理
// var folderPath = "E:\jsCodes\nodejsTest\codes1\hehe";
//可以采取下述方式来解决转义问题
var folderPath = "E:/jsCodes/nodejsTest/codes1/hehe/aa/bb/cc";
// var folderPath = "E:\\jsCodes\\nodejsTest\\codes1\\hehe";
console.log(folderPath);
//这个只能建立最后一层的目录，如果有多个没有建立的目录，则会报错
fs.mkdirSync(folderPath);