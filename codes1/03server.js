var http = require('http');
//var express=require("express");
//全局中不是已经下载了一个express模块吗？
//为什么无法引入？

function start() {
    http.createServer(function (request, response) {
        console.log("request received");
        // 发送 HTTP 头部
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {'Content-Type': 'text/plain'});
        // 发送响应数据 "Hello World"
        response.end('Hello World zc\n');
        // response.end();
    }).listen(2458);

    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
}
start();
exports.start = start;
