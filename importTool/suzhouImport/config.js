/**
 * excel配置文件
 * Created by zc on 2017/6/14.
 */
var config = {
    //要导入的所有excel的信息，在这里进行配置
    arrExcels: [
        /*{
         //导入数据库后的名称
         name: "user_safety_BRIGADE",
         //excel文件的路径
         excelFilePath: "F:\\data\\01.xls",
         //_id使用excel中的对应字段
         _id: "ID",
         //字段匹配对象————todo：下述这个字段匹配信息最好从excel或csv文件(从powerdesigner中得到)读取
         /!*objFieldMatchList: {
         "编号": "ID",
         "所属行政区": "DISTRICT",
         "维护联系人": "LINKMAN",
         "联系人联系方式": "TEL",
         "联系人所属部门": "ORGANIZATION",
         "监控点名称": "NAME",
         "使用部门": "CONSUMER",
         "摄像机类型": "CAMERATYPE",
         "应用场所": "APPLICABLEPLACE",
         "分辨率": "RESOLUTION",
         "监控点方向": "DIRECTION",
         "安装位置": "POSITION",
         "是否启用": "ISUSABLE",
         "监控点描述": "DESCRIBTION",
         "制造商": "MANUFACTURER",
         "监控点IP": "IP",
         "位置类型": "LOCATIONTYPE",
         "监控点所属设备名称": "DEVICENAME",
         "32位编码": "CODE_32",
         "经度": "LONGITUDE",
         "纬度": "LATITUDE"
         },*!/
         //对地理数据进行配置（没有地理数据，可以不对此项进行配置）
         gisData: {
         //地理数据的类型，可选（区分大小写）：
         //Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、GeometryCollection
         type: "Point",  //暂时只支持点类型
         //经度——以字段匹配后的为准
         fieldLng: "LONGITUDE",
         //纬度——以字段匹配后的为准
         fieldLat: "LATITUDE"
         }
         },*/
        {
            //导入数据库后的名称
            name: "user_safety_SQUADRON",
            //excel文件的路径
            excelFilePath: "./ImportTool/suzhouImport/data/01消防中队_SQUADRON.xls",
            //_id使用excel中的对应字段
            _id: "id",
            //字段匹配对象————todo：下述这个字段匹配信息最好从excel或csv文件(从powerdesigner中得到)读取
            /*objFieldMatchList: {
             "编号": "ID",
             "所属行政区": "DISTRICT",
             "维护联系人": "LINKMAN",
             "联系人联系方式": "TEL",
             "联系人所属部门": "ORGANIZATION",
             "监控点名称": "NAME",
             "使用部门": "CONSUMER",
             "摄像机类型": "CAMERATYPE",
             "应用场所": "APPLICABLEPLACE",
             "分辨率": "RESOLUTION",
             "监控点方向": "DIRECTION",
             "安装位置": "POSITION",
             "是否启用": "ISUSABLE",
             "监控点描述": "DESCRIBTION",
             "制造商": "MANUFACTURER",
             "监控点IP": "IP",
             "位置类型": "LOCATIONTYPE",
             "监控点所属设备名称": "DEVICENAME",
             "32位编码": "CODE_32",
             "经度": "LONGITUDE",
             "纬度": "LATITUDE"
             },*/

            //对地理数据进行配置（没有地理数据，可以不对此项进行配置）
            //wgs84坐标系
            geom_gps: {
                //地理数据的类型，可选（区分大小写）：
                //Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、GeometryCollection
                type: "Point",  //暂时只支持点类型
                //经度——以字段匹配后的为准
                fieldLng: "LONGITUDE",
                //纬度——以字段匹配后的为准
                fieldLat: "LATITUDE"
            },
            //百度投影坐标系，单位米
            geom2d: {
                //地理数据的类型，可选（区分大小写）：
                //Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、GeometryCollection
                type: "Point",  //暂时只支持点类型
                //经度——以字段匹配后的为准
                fieldLng: "LONGITUDE",
                //纬度——以字段匹配后的为准
                fieldLat: "LATITUDE"
            },
            //百度经纬度坐标系
            geom: {
                //地理数据的类型，可选（区分大小写）：
                //Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、GeometryCollection
                type: "Point",  //暂时只支持点类型
                //经度——以字段匹配后的为准
                fieldLng: "LONGITUDE",
                //纬度——以字段匹配后的为准
                fieldLat: "LATITUDE"
            }
        }
        /*,
         {
         //导入数据库后的名称
         name: "user_safety_SQUADRON",
         //excel文件的路径
         excelFilePath: "./ImportTool/suzhouImport/data/01消防中队_SQUADRON.xls",
         //_id使用excel中的对应字段
         _id: "id"
         }*/
    ],
    //mongodb的连接字符串
    // mongodbUrl: "mongodb://localhost:27017/zc",
    mongodbUrl: "mongodb://admin:safety123@172.17.10.238:27017/mapEditor",
    //导入之前是否先清空表里的数据
    bRemoveBefor: true
};
module.exports = config;
