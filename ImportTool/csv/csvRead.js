/**
 * cvs文件读取
 * Created by zc on 2017/6/13.
 */
var fs = require("fs");
var csv_parse = require("csv-parse");
// var path=require("path");

var csv_filePath = __dirname + "/data/csv.csv";

fs.readFile(csv_filePath, function (err, data) {
    if (err) {
        throw err;
    }
    csv_parse(data, {columns: true, trim: true}, function (err2, rows) {
        // Your CSV data is in an array of arrys passed to this callback as rows.
        if (err2) {
            throw err2;
        }
        console.log(rows);
        console.log("————————————");
    })
});