/**
 * Created by zc on 2017/8/23.
 */
var MongoClient = require("mongodb").MongoClient;
var net = require('net');
const uuidV4 = require('uuid/v4');

//下述如果设置为127.0.0.1可能收不到数据
var HOST = '192.168.20.193';
// var HOST = '127.0.0.1';
var PORT = 8099;
//没启动服务，竟然也可以连接成功
var DB_URL = "mongodb://localhost:27017/zcuse";
var m_collName = "nd";
var dbMongo = null;
var oneTravelId = null;


MongoClient.connect(DB_URL, function (error, db) {
    console.log('mongo连接成功!');
    dbMongo = db;
    fnCreateTcpServer();
});

function fnCreateTcpServer() {
    net.createServer(function (sock) {
        if (!oneTravelId) {
            oneTravelId = uuidV4();
        }
        console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
        sock.on('data', function (data) {
            // console.log(data.toString());
            fnDealWithTcpData(data.toString());
        });
        sock.on('close', function (data) {
            console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
            oneTravelId = null;
        });
    }).listen(PORT, HOST);
    console.log('Server listening on ' + HOST + ':' + PORT);
}

/**
 * 处理tcp数据
 * @param dataTcp tcp数据
 */
function fnDealWithTcpData(strDataTcp) {
    var arrData = strDataTcp.split("\r\n");
    for (var i = 0; i < arrData.length; i++) {
        var strOneData = arrData[i];
        if (strOneData.indexOf("$GPRMC") > 0) {
            try {
                var oneDoc = {};
                oneDoc.tag = {};
                //空气中甲烷的浓度（单位ppm）
                oneDoc.tag.CONCENTRATION = strOneData.substring(0, strOneData.indexOf(";"));
                var arrItem = strOneData.split(",");
                //时分秒（改成了北京时间）
                oneDoc.tag.UTCTIME = arrItem[1];
                //有效性
                oneDoc.tag.VALIDITYSTATUS = arrItem[2];
                //纬度（需要转换）
                var LATITUDE = fnDealWithLatLng(arrItem[3]);
                oneDoc.tag.LATITUDE_ORIGINAL = arrItem[3];
                //纬度方向
                oneDoc.tag.NORTHORSOUTH = arrItem[4];
                //经度（需要转换）
                var LONGITUDE = fnDealWithLatLng(arrItem[5]);
                oneDoc.tag.LONGITUDE_ORIGINAL = arrItem[5];
                //存储地理字段
                oneDoc.geom = fnCreateGeojson(LATITUDE, LONGITUDE);
                //经度方向
                oneDoc.tag.EASTORWEST = arrItem[6];
                //地面速度
                oneDoc.tag.GROUNDSPEED = arrItem[7];
                //速度方向
                oneDoc.tag.SPEEDDIRECTION = arrItem[8];
                //月日年
                oneDoc.tag.DATE = arrItem[9];
                //处理后的日期时间格式
                oneDoc.tag.DATETIME = fnDealWithTime(oneDoc.tag.UTCTIME, oneDoc.tag.DATE);
                //磁偏角
                oneDoc.tag.DECLINATION = arrItem[10];
                //磁偏角方向
                oneDoc.tag.DECLINATIONDIRECTION = arrItem[11];
                //模式指示及校验和
                oneDoc.tag.MODEINDICATION = arrItem[12];
                //监测类型（如 甲烷CH4， 乙炔）
                oneDoc.tag.TYPE = "CH4";
                //数据来源公司
                oneDoc.tag.FIRMNAME = "大方数据";
                //一次轨迹的编号（序列编号）
                oneDoc.tag.LISTCODE = oneTravelId;
                insertData(oneDoc);
            } catch (e) {
                console.log("发生错误：" + e);
            }
        } else {
            //对于浓度值为null和空的信息，不入库
        }
    }
}

function fnDealWithLatLng(latOrLang) {
    var result = null;
    try {
        var beforPoint = latOrLang.substring(0, latOrLang.indexOf("."));
        while (beforPoint.length < 5) {
            beforPoint = "0" + beforPoint;
        }
        var afterPoint = latOrLang.substr(latOrLang.indexOf(".") + 1, 4);
        var abc = parseFloat(beforPoint.substr(0, 3));
        var de = parseFloat(beforPoint.substr(3, 2));
        var fghi = parseFloat(afterPoint);
        var result = abc + (de / 60) + (fghi / 600000);
    } catch (e) {
        console.log("经纬度转换发生错误：line117：" + e);
    }
    return result;
}

function insertData(oneDoc) {
    try {
        var colVip = dbMongo.collection(m_collName);
        colVip.insert(oneDoc, function (error, result) {
            try {
                if (error) {
                    console.log('mongo写入数据发生错误:' + error);
                } else {
                    console.log(result.result.n);
                }
            } catch (e) {
                console.log("发生错误：line133");
            }
        });
    } catch (e) {
        console.log("mongo存储发生错误：line128：" + e);
    }
}

function fnCreateGeojson(lat, lng) {
    var result = {};
    result.type = "Point";
    result.coordinates = [lng, lat];
    return result;
}

function fnDealWithTime(utc_hms, mdy) {
    //除了下述这种方式，有没有更好的方法来生成想要的时间格式？
    //是否可以不去处理原始的内容，而只是以yymmdd的形式来表示？
    var result = null;
    try {
        var year = parseInt(mdy.substr(4, 2)) + 2000;
        var month = parseInt(mdy.substr(2, 2)) - 1;
        var date = parseInt(mdy.substr(0, 2));
        var h = parseInt(utc_hms.substr(0, 2)) + 8;
        var m = parseInt(utc_hms.substr(2, 2));
        var s = parseInt(utc_hms.substr(4, 2));
        var ms = parseInt(utc_hms.substring(utc_hms.indexOf(".") + 1));
        result = new Date(year, month, date, h, m, s, ms);
    } catch (e) {
        console.log("时间转换发生错误：line147：" + e);
    }
    return result;
}