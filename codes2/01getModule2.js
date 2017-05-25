/**
 * Created by zc on 2017/5/24.
 */
var module1 = require("./01module");
module1.setName("111");
var module2 = require("./01module");
module2.setName("222");
module1.sayHello();
module2.sayHello();
module1.setName("111again");
module1.sayHello();
module2.sayHello();