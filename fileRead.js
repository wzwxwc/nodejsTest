/**
 * Created by zcRescuer on 2017/5/12.
 */
var fs = require("fs");
fs.readFile("./data/json.json", 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
console.log("end");