/**
 * Created by zcRescuer on 2017/5/12.
 */
//fs是file system的意思
var fs = require("fs");
var data = fs.readFileSync("./data/text.txt", "utf-8");
console.log(data);
console.log("end——————");
