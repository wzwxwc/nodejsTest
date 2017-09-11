/**
 * Created by zc on 2017/6/13.
 */
var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017/weather";


function findData(db) {
    var colWeatherinfo = db.collection('weatherinfo');
    colWeatherinfo.find()
}

function findDataResult(db) {
    /*var data = db.collection('weatherinfo').find({city: "101220702"}).sort({"timeupdate": -1}).limit(1).then(function (docs) {
     var data = docs[0];
     console.log("hehe");
     });*/
    var data = db.collection('weatherinfo').find({city: "101220702"}).sort({"timeupdate": -1}).limit(1).toArray(function (err, result) {
        console.log(result[0]);
    });
    var count=db.collection('weatherinfo').count(function (err,count) {
        console.log(count);
    });
}

MongoClient.connect(DB_URL, function (error, db) {
    console.log('连接成功!');
    findDataResult(db);
});