/**
 * 数据导入的主文件
 * Created by zc on 2017/6/5.
 */
var fs = require("fs");
var mysql = require('mysql');
var MongoClient = require("mongodb").MongoClient;

//1、读取配置文件config.json
fs.readFile("./config.json", "utf-8", function (err, strConfig) {
    if (err) {
        console.log(err);
        return;
    }
    if (strConfig) {
        var jsonConfig = JSON.parse(strConfig);
        fnExportDataToMongo(jsonConfig);
    }
});

//导出到mongo数据库
function fnExportDataToMongo(jsonConfig) {
    if (!jsonConfig.mongo) {
        console.error("没有配置mongo参数和");
        return;
    }
    fnInitMongo();
    if (jsonConfig.mysql) {
        fnExportDataFromMysql(jsonConfig.mysql)
    }
    if (jsonConfig.postgresql) {
        fnExportDataFromPostgresql(jsonConfig.postgresql);
    }
    if (jsonConfig.oracle) {
        fnExportDataFromOracle(jsonConfig.oracle);
    }
}

//初始化mongodb的数据库对象
function fnInitMongo(jsonConfig) {
    var jsonConfigMongo = jsonConfig.mongo;
    //a、拼装
    var dbUrlDefault = "mongodb://" + jsonConfigMongo.ip + ":" + jsonConfigMongo.port + "/" + jsonConfigMongo.collection;
}

//从mysql中导入数据
function fnExportDataFromMysql(jsonConfigMysql) {
    var connMysql = mysql.createConnection({
        host: jsonConfigMysql.host,
        user: jsonConfigMysql.user,
        password: jsonConfigMysql.password,
        database: jsonConfigMysql.database
    });
    connMysql.connect();
    var arrTables = jsonConfigMysql.tables;
    for (var i = 0; i < arrTables.length; i++) {
        var tableName = arrTables[0];
        var strSqlQuery = "select * from " + tableName;
        connMysql.query(strSqlQuery, function (err, objResults, fields) {
            if (err) {
                console.error("在对mysql的" + tableName + "表进行查询的时候出错！")
                console.error(err);
                //因为是异步的，所以continue并不对for起作用
                //continue;
            }
            //写入mongo

        })
    }

    //在什么时候执行下述的语句比较合适？
    // connMysql.end();
}

//从postgresql导入数据
function fnExportDataFromPostgresql() {

}

//从oracle导入数据
function fnExportDataFromOracle() {

}


