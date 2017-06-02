/**
 * Created by zc on 2017/6/2.
 */
var mysql=require("mysql");
var Client = mysql.Client;
var client = new Client();
client.user = 'root';
client.password = 'root';
console.log('Connecting to MySQL...');
//使用数据库zctest
client.query('USE zctest');
http = require("http");
var server = http.createServer(function (request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});
    client.query('SELECT * FROM people', function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }
        var data = '';
        for (var i = 0; i < results.length; i++) {
            var firstResult = results[i];
            data += 'id: ' + firstResult['id'] + 'tag: ' + firstResult['tag'];
        }
        response.write(data);
        response.end();
    });
});

server.listen(8080);
var sys = require("util");
sys.puts("Server running at http://localhost:8080/");