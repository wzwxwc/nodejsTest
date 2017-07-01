/**
 * Created by zc on 2017/7/1.
 */
var http = require("http");
var fs = require("fs");
http.createServer(fnDealHttp).listen("2345");
function fnDealHttp(request, response) {
    fs.readFile("./imgOutput/img/test.pdf", 'binary', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.setHeader("Content-Type", "application/pdf");
            response.writeHead(200, "Ok");
            response.write(data,"binary");
            response.end();
        }
    });
}
console.log("server is running at port 2345");