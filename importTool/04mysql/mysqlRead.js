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

connection.connect();
console.log("mysql 数据库连接成功");

connection.query('SELECT * FROM people', function (error, objResults, fields) {
    console.log("完成数据库查询");
    if (error) throw error;
    var data = '';
    for (var i = 0; i < objResults.length; i++) {
        var firstResult = objResults[i];
        data += 'id: ' + firstResult['id'] + ' name: ' + firstResult['name'] + "</br>";
    }
    console.log(data);
    connection.end();
    console.log("关闭数据库连接");
});