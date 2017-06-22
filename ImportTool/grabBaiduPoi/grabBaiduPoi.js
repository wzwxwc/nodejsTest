/**
 * Created by zc on 2017/6/22.
 */
var urlTemp = "http://api.map.baidu.com/place/v2/search?q=@@poiType&region=%E5%AE%BF%E5%B7%9E%E5%B8%82&page_num=@@pageNum&page_size=20&output=json&coord_type=@@coorType&ak=w8GtDS0ZcgcAh6FaGyM49nel";
var request = require('request');


var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017/zcuse";


MongoClient.connect(DB_URL, function (error, db) {
    console.log('连接成功!');
    fnGrabBaiduPoi(db);
});

function fnGrabBaiduPoi(db) {
    var arrColName = ["HOSPITAL", "POLICESTATION"];
    var arrCoorType = ["3", "4"];
    for (var i = 0; i < arrColName.length; i++) {
        var colName = arrColName[i];
        for (var j = 0; j < arrCoorType.length; j++) {

        }
    }
    // fnGrabBaiduPoiCell(db, "hospital", "%E5%8C%BB%E9%99%A2", "4");
    fnGrabBaiduPoiCell(db, "hospital", "%E5%8C%BB%E9%99%A2", "3");
}


/**
 * 抓取百度兴趣点信息（基本处理单元）
 * @param colName   集合名称
 * @param poiType   医院 %E5%8C%BB%E9%99%A2
 * @param coorType  3：（bd09ll即百度经纬度坐标），4：（bd09mc即百度米制坐标）
 */
function fnGrabBaiduPoiCell(db, colName, poiType, coorType) {
    var urlBase = urlTemp.replace("@@poiType", poiType).replace("@@coorType", coorType);
    var url0 = urlBase.replace("@@pageNum", "0");
    request(url0, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonResult = JSON.parse(body);
            var total = jsonResult.total;
            var numPageSum = Math.ceil(total / 20);
            for (var i = 0; i < numPageSum; i++) {
                var url = urlBase.replace("@@pageNum", i);
                fnInsetUrlTodb(db, colName, coorType, url);
            }
        }
    })
}

//这个会出现重复插入的问题！到底是怎么回事？
function fnInsetUrlTodb(db, colName, coorType, url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonResult = JSON.parse(body);
            var arrPoiResult = jsonResult.results;
            if (arrPoiResult.length == 0) {
                //do nothing
            } else {
                var coll = db.collection(colName);
                for (var i = 0; i < arrPoiResult.length; i++) {
                    var data = arrPoiResult[i];
                    data._id = data.uid;
                    delete data.uid;
                    var location = data.location;
                    if (coorType == "3") {
                        //3：（bd09ll即百度经纬度坐标）
                        //geom
                        data.geom = fnCreatePointGeojson(location.lng, location.lat);
                    }
                    if (coorType == "4") {
                        //4：（bd09mc即百度米制坐标）
                        //geom2d
                        data.geom2d = fnCreatePointGeojson(location.lng, location.lat);
                    }
                    delete data.location;
                    //不存储location字段，因为2种不同的坐标系下，location不一样

                    //需要在这里判断是否已经有同名id了！！
                    coll.find({
                        _id: data._id
                    }).toArray().then(function (docs) {
                        if (docs.length > 0) {
                            //存在同名id
                            var oneDoc = docs[0];
                            if (oneDoc.geom && !data.geom) {
                                data.geom = oneDoc.geom;
                            }
                            if (oneDoc.geom2d && !data.geom2d) {
                                data.geom2d = oneDoc.geom2d;
                            }
                            coll.update({_id: data._id}, {
                                $set: data
                            });
                            console.log("成功更新一条数据" + data._id);
                        } else {
                            //新建
                            coll.insert(data, function (error, result) {
                                if (error) {
                                    console.log(data);
                                    console.log("插入数据出现错误");
                                } else {
                                    //这里因为异步的原因，得到的i是不正确的！！
                                    console.log("成功插入第" + (i + 1) + "条数据");
                                }
                            });
                        }
                    });
                }
            }
        }
    })
}

function fnInsetUrlTodbNew(db, colName, coorType, url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonResult = JSON.parse(body);
            var arrPoiResult = jsonResult.results;
            if (arrPoiResult.length == 0) {
                //do nothing
            } else {
                var coll = db.collection(colName);
                for (var i = 0; i < arrPoiResult.length; i++) {
                    var data = arrPoiResult[i];
                    data._id = data.uid;
                    delete data.uid;
                    var location = data.location;
                    if (coorType == "3") {
                        //3：（bd09ll即百度经纬度坐标）
                        //geom
                        data.geom = fnCreatePointGeojson(location.lng, location.lat);
                    }
                    if (coorType == "4") {
                        //4：（bd09mc即百度米制坐标）
                        //geom2d
                        data.geom2d = fnCreatePointGeojson(location.lng, location.lat);
                    }
                    delete data.location;
                    //不存储location字段，因为2种不同的坐标系下，location不一样

                    //新建
                    coll.insert(data, function (error, result) {
                        if (error) {
                            console.log(data);
                            console.log("插入数据出现错误");
                        } else {
                            //这里因为异步的原因，得到的i是不正确的！！
                            console.log("成功插入第" + (i + 1) + "条数据");
                        }
                    });
                }
            }
        }
    })
}

//这个方经常被使用，看来到了抽取公共方法的时候了！！
function fnCreatePointGeojson(lng, lat) {
    var objGeoJson = {};
    objGeoJson.type = "Point";
    objGeoJson.coordinates = [];
    objGeoJson.coordinates.push(lng);
    objGeoJson.coordinates.push(lat);
    return objGeoJson;
}