var http = require("http");
//这里并不提供路由方法
http.createServer(fnDealHttp).listen("2342");
function fnDealHttp(request, response) {
    response.write("hello zc,good morning,zc is the best man");
    console.log("fnDealHttp is executed 222222222222");
    response.end();
}
console.log("server is running at port 2342");