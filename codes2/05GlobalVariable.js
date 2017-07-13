/**
 * nodejs中的全局对象：global，相当于前端js的window
 * “全局对象”的属性，是“全局变量”，可以被任意地方直接使用，比如console
 * Created by zc on 2017/5/28.
 */
// global.global = 123;
//上述这种做法是错误的，global的global属性是一个circular类型的属性
//也就是说是一个自循环的属性，对于自循环的属性，处理起来很麻烦
//1、不支持JSON.stringif
//2、不能对那个circular属性进行操作，因为会直接导致当前对象本身的值发生变化！
// console.log(JSON.stringify(global));


console.log("————————华丽的分割线——————————");
// console.dir(global);
for (var key in global) {
    if (key == "global") {
        continue;
    }
    console.log(key);
    console.log(":")
    console.log(global[key]);
}