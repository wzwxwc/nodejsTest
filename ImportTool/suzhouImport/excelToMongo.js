/**
 * csv导入mongo数据库
 * Created by zc on 2017/6/14.
 */

var config = require(__dirname + "/config.js");
var arrExcels = config.arrExcels;
var mongodbUrl = config.mongodbUrl;
var fs = require("fs");
var mongoClient = require("mongodb").MongoClient;
const uuidV4 = require('uuid/v4');
var XLSX = require('xlsx');


//开始执行的入口
function fnRun() {
    for (var i = 0; i < arrExcels.length; i++) {
        var oneExcel = arrExcels[i];
        var excelFilePath = oneExcel.excelFilePath;
        var excelName = oneExcel.name;
        var objFieldMatchList = oneExcel.objFieldMatchList;
        var excelGisData = oneExcel.gisData;

        var workbook = XLSX.readFile(excelFilePath);
        var arrCsvRows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        var arrDocuments = fnDealWithArrCsvRows(arrCsvRows, objFieldMatchList, excelGisData);
        fnInsetToMongo(excelName, arrDocuments);
    }
}

/**
 * 按照mapEditor以及其他业务的需要，对csvRow的数组进行处理
 * a、属性字段都存储在tag属性下
 * b、gis数据存储在geom_gps属性下
 * c、geom_gps下存储的是geojson的格式
 * @param arrCsvRows
 * @param objFieldMatchList
 * @param configCsvGisData
 */
function fnDealWithArrCsvRows(arrCsvRows, objFieldMatchList, configCsvGisData) {
    //下述进行了2次循环，如果合并，应该会提高效率
    //当时，如果把2种操作混合来处理，会导致可读性下降
    if (objFieldMatchList) {
        arrCsvRows = fnMatchList(arrCsvRows, objFieldMatchList);
    }
    var newArrDocuments = [];
    for (var i = 0; i < arrCsvRows.length; i++) {
        var oneCsvRow = arrCsvRows[i];
        var newDocument = {};
        //mongo中可以使用手动的方式来给_id字段进行赋值吗？
        newDocument._id = uuidV4();
        newDocument.tag = oneCsvRow;
        if (configCsvGisData) {
            newDocument.geom_gps = fnGenerateGeoJson(configCsvGisData, oneCsvRow);
        }
        newArrDocuments.push(newDocument);
    }
    return newArrDocuments;
}


//字段匹配处理
function fnMatchList(arrRows, objFieldMatchList) {
    var arrNewRows = [];
    for (var i = 0; i < arrRows.length; i++) {
        var oneRow = arrRows[i];
        var newRow = {};
        for (var key in oneRow) {
            if (objFieldMatchList && objFieldMatchList[key]) {
                newRow[objFieldMatchList[key]] = oneRow[key];
            } else {
                newRow[key] = oneRow[key];
            }
        }
        arrNewRows.push(newRow);
    }
    return arrNewRows;
}

/**
 * 生成geojson
 * point————{ "type": "Point", "coordinates": [100.0, 0.0] }
 * LineString———— { "type": "LineString","coordinates": [ [100.0, 0.0], [101.0, 1.0] ]}
 * @param configCsvGisData
 * @param oneCsvRow
 * @returns {*}
 */
function fnGenerateGeoJson(configCsvGisData, oneCsvRow) {
    var objGeoJson = {};
    if (configCsvGisData) {
        var gisType = configCsvGisData.type;
        objGeoJson.type = gisType;
        objGeoJson.coordinates = [];
        //从csv中拿到的都是字符串吧？
        var valueLng = oneCsvRow[configCsvGisData.fieldLng];
        if (isNaN(valueLng) || valueLng.trim() == "") {
            //不可以转换为数字
            valueLng = 0;
        } else {
            valueLng = parseFloat(valueLng);
        }
        objGeoJson.coordinates.push(valueLng);

        var valueLat = oneCsvRow[configCsvGisData.fieldLat];
        if (isNaN(valueLat) || valueLat.trim() == "") {
            //不可以转换为数字
            valueLat = 0;
        } else {
            valueLat = parseFloat(valueLat);
        }
        objGeoJson.coordinates.push(valueLat)
    }
    return objGeoJson;
}

function fnInsetToMongo(collectionName, arrDocuments) {
    mongoClient.connect(mongodbUrl, function (error, dbMongo) {
        console.log('mongodb连接成功!');
        insertData(dbMongo, collectionName, arrDocuments);
    });
}

function insertData(dbMongo, collectionName, arrDocuments) {
    //collection如果没有的话，是否可以被创建
    var collection = dbMongo.collection(collectionName);
    for (var i = 0; i < arrDocuments.length; i++) {
        var oneDocument = arrDocuments[i];
        collection.insert(oneDocument, function (error, result) {
            if (error) {
                console.log('Error:' + error);
            } else {
                console.log("成功插入一条数据");
            }
        });
    }

}

fnRun();