/**
 * Created by zcRescuer on 2017/5/12.
 */
//fs是file system的意思
var fs = require("fs");
fs.readFile("../data/json.json", 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var jsonData = JSON.parse(data);
        console.log(jsonData);
    }
});
console.log("end");