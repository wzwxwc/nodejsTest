/**
 * Created by zc on 2017/6/13.
 */
var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017/mapEditor";

var arrTables = [
    {
        name: "user_safety_SQUADRON",
        comment: "消防中队"
    },
    {
        name: "user_safety_BRIGADE",
        comment: "消防大队"
    },
    {
        name: "user_safety_DETACHMENT",
        comment: "消防支队"
    }
];

MongoClient.connect(DB_URL, function (error, db) {
    console.log('连接成功!');
    fnChangeIdToCode(db);
});

function fnChangeIdToCode(db) {
    for (var i = 0; i < arrTables.length; i++) {
        var colName = arrTables[i].name;
        var col = db.collection(colName);
        col.find({}).forEach(function (doc) {
            //这里的doc本身就只是从数据库读取出来的“对象副本”
            //修改这个doc，并不会影响“数据库里的”、“真实的”数据
            var oldId = doc._id;
            doc._id = doc.tag.CODE;
            //问题：
            //执行到下述语句的时候，col已经不是之前想要的col了，而是一个统一的col！
            col.remove({_id: oldId});
            col.insert(doc);
        })
    }
}

