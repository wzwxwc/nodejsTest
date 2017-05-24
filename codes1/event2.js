/**
 * Created by zc on 2017/5/23.
 */
var EventEmitter = require("events").EventEmitter;
var event = new EventEmitter();
event.on("some_event", function () {
    console.log("我是一个自定义事件");
});
setTimeout(function () {
    event.emit("some_event");
}, 2000);