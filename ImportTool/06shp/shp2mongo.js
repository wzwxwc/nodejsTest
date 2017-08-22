/**
 * Created by zc on 2017/8/1.
 */
var MongoClient = require("mongodb").MongoClient;
var Shp = require('shp');
// var DB_URL = "mongodb://admin:safety123@172.17.10.171:27017/mapEditor";
var DB_URL = "mongodb://localhost/zcuse";
var shpPath = __dirname + "\\road\\road";

function insertData(db, arrNewRow) {
    var colVip = db.collection('user_safety_ROAD');
    // var arrNewRow = {"name": "node", "age": 22, "addr": "nb", "addTime": new Date()};
    colVip.insert(arrNewRow, function (error, result) {
        if (error) {
            console.log('Error:' + error);
        } else {
            console.log(result.result.n);
        }
        db.close();
    });
}

MongoClient.connect(DB_URL, function (error, db) {
    console.log('mongo连接成功!');
    Shp.readFile(shpPath, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var arrNewRow = fnDealWithJson(data);
            insertData(db, arrNewRow);
        }
    });
});

function fnDealWithJson(oldJson) {
    var arrNewRow = [];
    var arrFeatures = oldJson.features;
    for (var i = 0; i < arrFeatures.length; i++) {
        var oneFeature = arrFeatures[i];
        var newRow = {};
        //暂时设置为i
        newRow._id = i;
        newRow.tag = oneFeature.properties;
        newRow.geom = oneFeature.geometry;
        // fnCheckGeom(i, newRow.geom);
        arrNewRow.push(newRow);
    }
    return arrNewRow;
}

function fnCheckGeom(rownum, geom) {
    var arr = geom.coordinates[0];
    for (var i = 0; i < arr.length; i++) {
        var one = arr[i];
        var lng = one[0];
        var lat = one[1];
        if (lng >= 0 && lng <= 180) {

        } else {
            console.log("出现错误");
        }
        if (lat >= 0 && lat <= 90) {

        } else {
            console.log("出现错误");
        }
    }
}

