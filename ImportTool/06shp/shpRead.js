/**
 * Created by zc on 2017/7/3.
 */
var toJSON = require('shp2json');
var s = toJSON.fromShpFile('./data/shape.shp');
console.log(s);

