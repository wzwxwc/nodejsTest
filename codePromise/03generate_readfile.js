/**
 * Created by zc on 2017/7/12.
 */
var fs = require("fs");

function *gen() {
    try {
        var a = yield "codePromise/data/a.txt";
        var b = yield "codePromise/data/b.txt";
        var c = yield "codePromise/data/c.txt";
        var result = a + b + c;
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
    }
}

var gen = gen();
var a = gen.next();
//下述这个并没有解决嵌套循环的问题
readFile(a.value, function (data) {
    var b = gen.next(data);
    readFile(b.value, function (data) {
        var c = gen.next(data);
        readFile(c.value, function (data) {
            var d = gen.next(data)
            console.log("执行完成了");
            console.log(d.value);
        })
    })
});

function readFile(url, fnCallback) {
    fs.readFile(url, 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            fnCallback(data);
        }
    });
}