/**
 * Created by zc on 2017/6/22.
 */
var mongoClient = require("mongodb").MongoClient;
var mongodbUrl = "mongodb://localhost/zc";
mongoClient.connect(mongodbUrl, function (error, dbMongo) {
    // var result = dbMongo.collection("user_safety_FLOORPLAN").find({});
    // console.log(result);
    //上述得到的result是一个cursor对象！
    fnTest4(dbMongo);

});

//测试toArray是否是异步
function fnTest1(dbMongo) {
    console.log("toArray之前");
    dbMongo.collection("user_safety_FLOORPLAN").find({
        "_id": "1"
    }).toArray(function (err, docs) {
        console.log(docs.length);
        console.log("toArray中，证明是异步");
    });
    console.log("toArray之后");
}

function fnTest2(dbMongo) {
    console.log("cursor前");
    var cursor = dbMongo.collection("user_safety_FLOORPLAN").find({
        "_id": "1"
    });
    //下述的docArray是一个Promise类型
    //这个是什么类型？
    var docArray = cursor.toArray();
    console.log(docArray.length);
    console.log("cursor后");
}

function fnTest3(dbMongo) {
    console.log("cursor前");
    var cursor = dbMongo.collection("user_safety_FLOORPLAN").find({
        "_id": "1"
    });
    console.log("cursor while前");
    while (cursor.hasNext()) {
        var next = cursor.next();
        console.log(next);
    }
    console.log("cursor while后");
}

function fnTest4(dbMongo) {
    console.log("cursor前");
    var cursor = dbMongo.collection("user_safety_FLOORPLAN").find({
        "_id": "1"
    });
    //下述的docArray是一个Promise类型
    //这个是什么类型？
    var docArray = cursor.toArray();
    docArray.then(function (docs) {
        console.log(docs);
    });
    console.log("cursor后");
}