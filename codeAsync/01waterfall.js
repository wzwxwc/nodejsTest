/**
 * 依次执行,前一个函数的输出为后一个函数的输入
 * Created by zc on 2017/6/8.
 */
var async = require("async");
var task1 = function (callback) {
    console.log("task1");
    callback(null, "11")
};

var task2 = function (q, callback) {
    console.log("task2");
    console.log("task1函数传入的值: " + q);
    callback(null, "22")
};

var task3 = function (q, callback) {
    console.log("task3");
    console.log("task2函数传入的值: " + q);
    callback(null, "33")
};

console.time("waterfall方法");

async.waterfall([task1, task2, task3], function (err, result) {
    console.log("waterfall");
    if (err) {
        console.log(err);
    }
    console.log("result : " + result);
    console.timeEnd("waterfall方法");
});