var http = require("http");
http.createServer(fnDealHttp).listen("2342");
function fnDealHttp(request, response) {
    response.write("hello zc,good morning,zc is the best man");
    console.log("fnDealHttp is executed 222222222222");
    response.end();
}
console.log("server is running at port 2342");