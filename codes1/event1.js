/**
 * Created by zc on 2017/5/22.
 */
var EventEmitter = require("events");
//下述写法是老版本的的写法，新版本也同样兼容下述写法
// var EventEmitter = require("events").EventEmitter;
var emitter = new EventEmitter();
emitter.on("haha", function () {
    console.log("haha is executed");
});
function f() {
    console.log("start");
    emitter.emit("haha");
    console.log("end");
}
f();