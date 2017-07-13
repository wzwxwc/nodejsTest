/**
 * Created by zc on 2017/7/12.
 */
var a = {
    x: 10,
    y: 20,
};
var iter = Iterator(a);
console.log(iter.next()); // ["x", 10]
console.log(iter.next()); // ["y", 20]
console.log(iter.next()); // throws StopIteration