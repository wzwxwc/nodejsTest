/**
 * 造假数据（安徽宿州项目）
 * Created by zc on 2017/6/15.
 */
var fs = require("fs");
var XLSX = require('xlsx');
const uuidV4 = require('uuid/v4');
var MongoClient = require("mongodb").MongoClient;

var DB_URL = "mongodb://localhost:27017/zc";
// var DB_URL = "mongodb://admin:safety123@172.17.10.238:27017/mapEditor";
var dirPath = __dirname + "\\data2\\";
var dbMongo = null;
var bRemoveBefor = true;  //是否删除collection中之前已经有的所有数据

function fnRun() {
    MongoClient.connect(DB_URL, function (error, db) {
        console.log('连接成功!');
        dbMongo = db;
        var arrExcelNames = fnGetArrFileNamesFromDir(dirPath);
        for (var i = 0; i < arrExcelNames.length; i++) {
            var oneExcelName = arrExcelNames[i];
            var tableName = oneExcelName.substring(oneExcelName.indexOf("_") + 1, oneExcelName.indexOf("."));
            var collectionName = "user_safety_" + tableName;
            var oneExcelPathAndNmae = dirPath + oneExcelName;
            var arrFieldInfos = fnExcelToJson(oneExcelPathAndNmae);
            fnCreateFalsData(arrFieldInfos, collectionName);
        }
        setTimeout(function () {
            console.log("——————————华丽的分隔符————————");
            console.log(JSON.stringify(gisTbsJson.result));
        }, "5000");
    });
}

//得到一个目录下的所有文件名
function fnGetArrFileNamesFromDir(dirPath) {
    var arrFileNames = fs.readdirSync(dirPath);
    return arrFileNames;
}


function fnExcelToJson(strExcelPathAndName) {
    var workbook = XLSX.readFile(strExcelPathAndName);
    var arrFieldInfos = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);
    return arrFieldInfos;
}

function fnCreateFalsData(arrFieldInfos, collectionName) {
    var arrDocuments = [];
    //每个collection制造6条假文档
    var numFalseData = 6;
    var col = dbMongo.collection(collectionName);
    //先清空collectionName下的所有的文档！
    if (bRemoveBefor) {
        col.remove({}, function (err, numRemoved) {
            if (err) {
                console.log("从" + collectionName + "中清空数据时出错");
            }
            console.log("从" + collectionName + "中移除了" + numRemoved + "条数据");
            for (var i = 0; i < numFalseData; i++) {
                var oneDocument = fnCreateOneDocument(arrFieldInfos, i);
                fnCreateGisTablesJson(collectionName, oneDocument);
                //写入数据库
                col.insert(oneDocument, function (error, result) {
                    if (error) {
                        console.log("往" + collectionName + "插入一条数据出错");
                    } else {
                        console.log("往" + collectionName + "成功插入一条数据");
                    }
                });
            }
        });
    } else {
        for (var i = 0; i < numFalseData; i++) {
            var oneDocument = fnCreateOneDocument(arrFieldInfos, i);
            //写入数据库
            col.insert(oneDocument, function (error, result) {
                if (error) {
                    console.log("往" + collectionName + "插入一条数据出错");
                } else {
                    console.log("往" + collectionName + "成功插入一条数据");
                }
            });
        }
    }
}

/**
 * 生成一条假文档
 * @param arrFieldInfos
 * @param rowIndex  制造第几条假数据
 */
function fnCreateOneDocument(arrFieldInfos, rowIndex) {
    var oneDocument = {};
    var tagOfDocument = {};
    for (var i = 0; i < arrFieldInfos.length; i++) {
        var oneFieldInfo = arrFieldInfos[i];
        //主键默认从1计数
        oneDocument._id = rowIndex;
        if (oneFieldInfo.P) {
            //是主键，不处理，默认都使用_id来作为主键
            // oneDocument[oneFieldInfo.Code] = rowIndex;
            continue;
        }
        if (oneFieldInfo.F && oneFieldInfo.Fcode) {
            //是外键
            var fkTableName = "user_safety_" + oneFieldInfo.F;
            //我暂时没法解决这个异步的问题，所以，我只能用1、2、3的形式给外键赋值了
            // dbMongo
            // dbMongo.collection('weatherinfo').count(function (err,count) {
            //     console.log(count);
            // });
            tagOfDocument[oneFieldInfo.Code] = Math.floor(Math.random() * 6);
            continue;
        }
        if (oneFieldInfo["Code"] == "LONGITUDE") {
            //经度
            tagOfDocument[oneFieldInfo.Code] = fnRandomLng();
            continue;
        }
        if (oneFieldInfo["Code"] == "LATITUDE") {
            //纬度
            tagOfDocument[oneFieldInfo.Code] = fnRandomLat();
            continue;
        }
        if (oneFieldInfo["Data Type"] == "DATE") {
            var curr_date = new Date();
            tagOfDocument[oneFieldInfo.Code] = curr_date;
            continue;
        }
        if (oneFieldInfo["Data Type"] == "NUMBER") {
            //对于数字类型的，随便给了一个100以内的数字
            tagOfDocument[oneFieldInfo.Code] = Math.random() * 100;
            continue;
        }
        tagOfDocument[oneFieldInfo.Code] = oneFieldInfo.Name + rowIndex;
    }
    //有经纬度，就都给它转换成geojson的形式
    if (tagOfDocument.LONGITUDE && tagOfDocument.LATITUDE) {
        var geojson = fnCreatePointGeojson(tagOfDocument.LONGITUDE, tagOfDocument.LATITUDE);
        oneDocument.geom_gps = geojson;
    }
    oneDocument.tag = tagOfDocument;
    return oneDocument;
}


var gisTbsJson = {
    handled: {},
    result: []
};
//坐标系转换为百度坐标系需要
function fnCreateGisTablesJson(collectionName, oneDocument) {
    if (!gisTbsJson.handled[collectionName]) {
        if (oneDocument.geom_gps) {
            gisTbsJson.handled[collectionName] = "ok";
            var name = collectionName.substring(12, collectionName.length);
            var oneResult = {};
            oneResult.name = name;
            oneResult.gpsGeom = "geom_gps";
            oneResult.geometryType = "Point";
            gisTbsJson.result.push(oneResult);
        } else {
            gisTbsJson.handled[collectionName] = "bad";
        }
    }
}

function fnRandomLat() {
    var miny = 33.275082;
    var maxy = 34.654217;
    var random = Math.random();
    var latRandom = miny + random * (maxy - miny);
    return latRandom;
}
function fnRandomLng() {
    var minx = 116.162049;
    var maxx = 118.185727;
    var ranom = Math.random();
    var lngRandom = minx + ranom * (maxx - minx);
    return lngRandom;
}

function fnCreatePointGeojson(lng, lat) {
    var objGeoJson = {};
    objGeoJson.type = "Point";
    objGeoJson.coordinates = [];
    objGeoJson.coordinates.push(lng);
    objGeoJson.coordinates.push(lat);
    return objGeoJson;
}

fnRun();