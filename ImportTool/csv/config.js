/**
 * csv配置文件
 * Created by zc on 2017/6/14.
 */
var config = {
    //要导入的所有csv的信息，在这里进行配置
    arrCsvs: [
        {
            //导入数据库后的名称
            name: "csvMonitor",
            //csv文件的路径
            csvFilePath: "E:\\nodeCodes\\nodejsTest\\ImportTool\\csv\\data\\监控点信息.csv",
            //字段匹配对象
            objFieldMatchList: {
                "经度": "longitude",
                "纬度": "latitude",
                "监控点名称": "monitorpoint"
            },
            //对地理数据进行配置（没有地理数据，可以不对此项进行配置）
            gisData: {
                //地理数据的类型，可选（区分大小写）：
                //Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、GeometryCollection
                type: "Point",  //暂时只支持点类型
                //经度——以字段匹配后的为准
                fieldLng: "longitude",
                //纬度——以字段匹配后的为准
                fieldLat: "latitude"
            }
        }
        /*{
         name: "csvChinese",
         csvFilePath: "E:\nodeCodes\nodejsTest\ImportTool\csv\data\csv中文.csv",
         objFieldMatchList: {
         "字段1": "name",
         "字段2": "verb",
         "字段3": "adj"
         },
         gisData: {
         type: "point",
         long: "",
         lat: ""
         }
         }*/
    ],
    //mongodb的连接字符串
    mongodbUrl: "mongodb://localhost:27017/zc"
};
module.exports = config;
