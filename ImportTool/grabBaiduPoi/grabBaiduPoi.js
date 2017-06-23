/**
 * Created by zc on 2017/6/22.
 */
var urlTemp = "http://api.map.baidu.com/place/v2/search?q=@@poiType&region=%E5%AE%BF%E5%B7%9E%E5%B8%82&page_num=@@pageNum&page_size=20&output=json&coord_type=@@coorType&ak=w8GtDS0ZcgcAh6FaGyM49nel";
//http://api.map.baidu.com/geoconv/v1/?coords=116.9949,33.628714&from=5&to=6&ak=w8GtDS0ZcgcAh6FaGyM49nel
var urlTempConvert = "http://api.map.baidu.com/geoconv/v1/?coords=@@coords&from=5&to=6&ak=w8GtDS0ZcgcAh6FaGyM49nel";
var request = require('request');


var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017/zcuse";


MongoClient.connect(DB_URL, function (error, db) {
    console.log('连接成功!');
    fnGrabBaiduPoi(db);
});

function fnGrabBaiduPoi(db) {
    var arrColNameAndType = [
        {
            colName: "HOSPITAL",
            poiType: "%E5%8C%BB%E9%99%A2"
        },
        {
            colName: "POLICESTATION",
            poiType: "%E6%B4%BE%E5%87%BA%E6%89%80"
        }];
    // var arrCoorType = ["3", "4"];
    //其实无论下述给什么值，返回来的都只是“百度经纬度坐标系”
    var arrCoorType = ["3"];
    /*for (var i = 0; i < arrColNameAndType.length; i++) {
     var objColNameAndType = arrColNameAndType[i];
     var colName = objColNameAndType.colName;
     var poiType = objColNameAndType.poiType;
     for (var j = 0; j < arrCoorType.length; j++) {
     fnGrabBaiduPoiCell(db, colName, poiType, arrCoorType[j]);
     }
     }*/
    // fnGrabBaiduPoiCell(db, "hospital", "%E5%8C%BB%E9%99%A2", "3");
    // fnGrabBaiduPoiCell(db, "hospital", "%E5%8C%BB%E9%99%A2", "4");
    fnGrabBaiduPoiCell(db, "POLICESTATION", "%E6%B4%BE%E5%87%BA%E6%89%80", "3");
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
                //todo  这里是写死的地方
                /*if (coorType == "3") {
                 fnInsetUrlTodbInsert(db, colName, coorType, url);
                 } else {
                 fnInsetUrlTodbUpdate(db, colName, coorType, url);
                 }*/
                fnInsetUrlTodbNew(db, colName, coorType, url);
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
                            console.log(docs.length);
                            //存在同名id
                            var oneDoc = docs[0];
                            if (oneDoc.geom && !data.geom) {
                                data.geom = oneDoc.geom;
                            }
                            if (oneDoc.geom2d && !data.geom2d) {
                                data.geom2d = oneDoc.geom2d;
                            }
                            coll.update({_id: data._id}, {
                                $set: {
                                    "hha": 123
                                }
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
                    fnDealWithDataFromBaiduConvert(data, coorType, coll);
                    //不存储location字段，因为2种不同的坐标系下，location不一样
                }
            }
        }
    })
}

//对来自百度的坐标系进行转换
function fnDealWithDataFromBaiduConvert(data, coorType, coll) {
    var newData = {};
    newData.tag = {};
    newData._id = data.uid;
    newData.tag.ID = data.uid ? data.uid : "";
    newData.tag.NAME = data.name ? data.name : "";
    newData.tag.ADDRESS = data.address ? data.address : "";
    //下述实际上是没有的
    newData.tag.GRIDE = data.grid ? data.grid : "";
    newData.tag.TEL = data.telephone ? data.telephone : "";
    //下述实际上是没有的
    newData.tag.INTRODUCTION = data.introduction ? data.introduction : "";
    //下述实际上是没有的
    newData.tag.IMAGE = data.image ? data.image : "";
    var location = data.location;
    newData.tag.LONGITUDE = location.lng ? location.lng : "";
    newData.tag.LATITUDE = location.lat ? location.lat : "";
    newData.geom = fnCreatePointGeojson(location.lng, location.lat);
    var newUrlConvert = urlTempConvert.replace("@@coords", location.lng + "," + location.lat);

    request(newUrlConvert, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonResult = JSON.parse(body);
            var arrPoiResult = jsonResult.result;
            if (arrPoiResult.length == 0) {
                console.log("出现错误");
                //do nothing
            } else {
                var xys = arrPoiResult[0];
                newData.geom2d = fnCreatePointGeojson(xys.x, xys.y);
                coll.update(
                    {_id: newData._id},
                    {$set: newData},
                    {upsert: true}
                )
            }
        } else {
            console.log("出现错误");
            console.log(error);
        }
    });

}

//对来自百度的坐标系进行转换（包含坐标转换）
function fnDealWithDataFromBaidu(data, coorType) {
    var newData = {};
    newData.tag = {};
    newData._id = data.uid;
    newData.tag.ID = data.uid ? data.uid : "";
    newData.tag.NAME = data.name ? data.name : "";
    newData.tag.ADDRESS = data.address ? data.address : "";
    //下述实际上是没有的
    newData.tag.GRIDE = data.grid ? data.grid : "";
    newData.tag.TEL = data.telephone ? data.telephone : "";
    //下述实际上是没有的
    newData.tag.INTRODUCTION = data.introduction ? data.introduction : "";
    //下述实际上是没有的
    newData.tag.IMAGE = data.image ? data.image : "";
    var location = data.location;
    newData.tag.LONGITUDE = location.lng ? location.lng : "";
    newData.tag.LATITUDE = location.lat ? location.lat : "";

    if (coorType == "3") {
        //3：（bd09ll即百度经纬度坐标）
        //geom
        newData.geom = fnCreatePointGeojson(location.lng, location.lat);
    }
    if (coorType == "4") {
        //4：（bd09mc即百度米制坐标）
        //geom2d
        newData.geom2d = fnCreatePointGeojson(location.lng, location.lat);
    }

    coll.update(
        {_id: newData._id},
        {$set: newData},
        {upsert: true}
    );
}

function fnInsetUrlTodbUpdate(db, colName, coorType, url) {
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
                    //暂定是先3后4
                    coll.update({_id: data._id}, {
                        $set: {
                            "geom2d": data.geom2d
                        }
                    });
                }
            }
        }
    })
}

function fnInsetUrlTodbInsert(db, colName, coorType, url) {
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