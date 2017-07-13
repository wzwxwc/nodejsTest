/**
 * Created by zc on 2017/7/11.
 */
var fs = require("fs");

function readFile(url) {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(url, 'utf-8', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

readFile("./codePromise/data/a.txt").then(function (data) {
    console.log(data);
}).then(function (data2) {
    //promise不是可以接受2个then方法吗？
    //为什么这个then方法里的data2是undefined呢？
    //我的promise没有写好吗？
    console.log(data2);
});

/*
* 怎么解决多个文件读取的回调问题？
* 一口气读10个文件，promise可以解决吗？
*
* */