/**
 * 用process.stdin的方法来实现一个“问答记录”的系统
 * 机器自动提问问题，用户作答，机器把结果记录下来
 * Created by zc on 2017/7/13.
 */

var name = "";
var age = "";
var sex = "";
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write("你的名字是什么？");
process.stdin.on("data", function (data) {
    if (name == "") {
        name = data;
        process.stdout.write("name被赋值");
        process.stdout.write("你的年龄是多大？");
    } else if (age == "") {
        age = data;
        process.stdout.write("age被赋值");
        process.stdout.write("你的性别是什么？男？女？");
    } else if (sex == "") {
        sex = data;
        process.stdout.write("sex被赋值");
    } else {
        process.stdout.write("赋值完毕");
        process.stdout.write(name + "is " + age + " years old,is a " + sex);
    }
});



