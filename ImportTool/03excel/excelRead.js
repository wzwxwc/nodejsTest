/**
 * 读取excel
 * 这个库感觉还是很强大的，但是没找到api！！
 * Created by zc on 2017/6/15.
 */
var XLSX = require('xlsx');
var workbook = XLSX.readFile(__dirname + '/data/报警记录.xls');
var arrFieldInfos = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);
console.log(arrFieldInfos);