/**
 * Created by zc on 2017/5/24.
 */
var name = "";
exports.setName = function (argsName) {
    //能够引入this吗？
    name = argsName;
};
exports.sayHello = function () {
    console.log("你好：" + name);
    console.log(module);
};
//当其他模块调用这个模块的时候，返回exports这个对象！