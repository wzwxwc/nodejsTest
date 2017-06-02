/**
 * Created by zc on 2017/6/2.
 * 问题：
 * 1、这个程序进行web请求之后，为什么在标题栏一直是loading的图标？？
 * 2、返回结果是乱码的问题
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zctest'
});

var http = require("http");
var server = http.createServer(function (request, response) {
    connection.connect();
    console.log("mysql 数据库连接成功");

    response.writeHead(200, {"Content-Type": "text/html", "charset": "utf-8"});
    console.log("开始处理web请求")
    connection.query('SELECT * FROM people', function (error, results, fields) {
        console.log("完成数据库查询");
        if (error) throw error;
        var data = '';
        for (var i = 0; i < results.length; i++) {
            var firstResult = results[i];
            data += 'id: ' + firstResult['id'] + 'name: ' + firstResult['name'];
        }
        response.write(data);
        //如果没有下述这个语句，则浏览器的标题会一直旋转
        response.end();

        connection.end();
        console.log("关闭数据库连接");
    });
});
server.listen(9966);
// var sys = require("util");
// sys.puts("Server running at http://localhost:8080/");