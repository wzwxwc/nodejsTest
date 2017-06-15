/**
 * Created by zc on 2017/5/24.
 */
//模块的识别符，通常是带有绝对路径的模块文件名。
console.log("module.id is " + module.id);
//模块的文件名，带有绝对路径。
console.log("module.filename is " + module.filename);
//返回一个布尔值，表示模块是否已经完成加载。
console.log("module.loaded is " + module.loaded);
//返回一个对象，表示调用该模块的模块。
console.log("module.parent is " + module.parent);
//返回一个数组，表示该模块要用到的其他模块。
console.log("module.children is " + module.children);
//表示模块对外输出的值。
console.log("module.exports is " + module.exports);
//
console.log("module.paths is" + module.paths);