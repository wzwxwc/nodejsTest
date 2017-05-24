/**
 * Created by zc on 2017/5/22.
 */
var EventEmitter = require("events").EventEmitter;
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