/**
 * 读取excel
 * 这个库感觉还是很强大的，但是没找到api！！
 * Created by zc on 2017/6/15.
 */
var XLSX = require('xlsx');
var workbook = XLSX.readFile(__dirname + '/data/test.xlsx');
var arrRows = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);
var result = {};
for (var i = 0; i < arrRows.length; i++) {
    var oneRow = arrRows[i];
    if (oneRow.dd) {
        result[oneRow.dd] = oneRow.cc;
    }
    if (oneRow.ee) {
        result[oneRow.ee] = oneRow.cc;
    }
}
console.log(JSON.stringify(result));