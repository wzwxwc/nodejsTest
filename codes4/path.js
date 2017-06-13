/**
 * 相对路径并没有我想象的那样，会随着js被执行的文件夹路径的变化而变化！
 * 参考链接
 * http://blog.csdn.net/u012193330/article/details/51323586
 * Created by zc on 2017/6/13.
 */
//下述变量可以直接使用！this is cool!

//总是返回被执行的 js 所在文件夹的绝对路径
console.log(__dirname);
// 总是返回被执行的 js 的绝对路径
console.log(__filename);


/*
 * 下面写一个读取文件的例子，然后在不同的
 * 路径环境下去执行
 * 可以看到,如果使用./或../等相对路径，
 * 他们相对的base路径是不一样的！
 *
 * */