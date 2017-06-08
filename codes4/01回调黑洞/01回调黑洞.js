/**
 * 依次读取完所有的文本，然后拼接出一个文本
 * 虽然不是必须依次读取，但是，需要他们都取到后才能执行下一步操作
 * （必须异步，不能变成同步的）
 * Created by zc on 2017/6/8.
 */
var fs = require("fs");
var result = "";
fs.readFile("./data/a.txt", "utf-8", function (err, dataA) {
    fs.readFile("./data/b.txt", "utf-8", function (err, dataB) {
        fs.readFile("./data/c.txt", "utf-8", function (err, dataC) {
            fs.readFile("./data/d.txt", "utf-8", function (err, dataD) {
                result = dataA + dataB + dataC + dataD;
                console.log(result);
            });
        });
    });
});
console.log("hehe");