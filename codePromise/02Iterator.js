/**
 * Created by zc on 2017/7/12.
 */
var lang = {name: 'JavaScript', birthYear: 1995};
var it =Symbol.iterator(lang);
var pair = it.next();
console.log(pair); // ["name", "JavaScript"]
pair = it.next();
console.log(pair); // ["birthYear", 1995]
pair = it.next(); // A StopIteration exception is thrown