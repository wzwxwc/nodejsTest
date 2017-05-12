var http = require("http");
http.createServer(fnDealHttp).listen("9999");
function fnDealHttp(request, response) {
    response.write("hello zc,good morning");
    console.log("fnDealHttp is executed");
    response.end();
}
console.log("server is running at port 9999");