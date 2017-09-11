/**
 * Created by zc on 2017/8/1.
 */
var Shp = require('shp');
// var shpJson = Shp.readFileSync('path/to/shpfile_base_name');
// or
var path = __dirname + "\\data\\shape";
Shp.readFile(path, function (error, data) {
    var jsonResult = JSON.stringify(data);
    console.log(jsonResult);
});