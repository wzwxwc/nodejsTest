/**
 * Created by zc on 2017/6/13.
 */
console.log("start");
//下述的setInterval是可以访问到的
setInterval(function () {
    console.log("hehe");
}, 6000);
console.log("end");