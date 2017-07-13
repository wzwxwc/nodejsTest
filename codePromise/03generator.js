/**
 * Created by zc on 2017/7/12.
 */
function *gen() {
    console.log("yield hello之前");
    yield "hello";
    console.log("yield world之前");
    yield "world";
    console.log("return true之前");
    return true;
}

var iter = gen();
var a = iter.next();
console.log("a is ");
console.log(a);

var b = iter.next();
console.log("b is ");
console.log(b);

var c = iter.next();
console.log("c is ");
console.log(c);
