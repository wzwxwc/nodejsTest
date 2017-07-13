/**
 * Created by zc on 2017/7/12.
 */
function *gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
var a = g.next();
console.log(a);
var b = g.next();
console.log(b);