/**
 * Created by zc on 2017/5/24.
 */
//也没有js的后缀
//下述的模块也要加上点，否则出不来
var module = require("./01module");
// console.log(module);
// console.log(require);
module.setName("张超");
module.sayHello();
//下述变量是在01module中定义的全局变量？？
console.log(nameglobal);