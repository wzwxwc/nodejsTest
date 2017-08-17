/**
 * Created by zc on 2017/8/4.
 */
var base64Img = require('base64-img');
var imgFolderPath = __dirname + "/imgs";



var imgPath = __dirname + "/imgs/test.jpg";

base64Img.base64(imgPath, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});