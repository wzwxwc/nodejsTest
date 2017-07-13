/**
 * 继承的练习
 * Created by zc on 2017/7/13.
 */

var util = require("util");
function Base() {
    this.name = "base";
    this.base = 2012;
    //下述方法没法被继承！！！！！！
    this.sayHello = function () {
        console.log("hello " + this.name + ", the year is " + this.base);
    }
}
//下述方法可以被继承
Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = "sub";
}
util.inherits(Sub, Base);

//父对象输出
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

//继承后的子对象输出
var objSub = new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);