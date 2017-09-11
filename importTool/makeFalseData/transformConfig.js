/**
 * Created by 1 on 2017/6/14.
 * 转换服务配置
 */
var config={
    //百度坐标转换
    "baiduTransform":{
        //控制点表
        "controlPtTable":"baidu_control_pts",
        //百度在线转换服
        "online":{
            // "url":"http://api.map.baidu.com/geoconv/v1/",
            "url":"http://172.17.10.180:11000/geoconv/v1/",
            //开发者key
            "ak":"2fp5otGLumHmMuwTqWdGRCZ09EN4uo6G",
            "sk":"VKpOwoRtmgQXbGTkl4RrdBRnKgQSwW8W"
        },
        //控制点覆盖区域
        "coverage":{
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        116.162049,
                        33.275082
                    ],
                    [
                        116.162049,
                        34.654217
                    ],
                    [
                        118.185727,
                        34.654217
                    ],
                    [
                        118.185727,
                        33.275082
                    ],
                    [
                        116.162049,
                        33.275082
                    ]
                ]
            ]
        },
        //导入数据配置
        "import":{
            //本地 csv文件路径
            "filePath":"F:/temp/baidu_control_pts.csv",
            "coverage":{//导入的数据范围
                "minx":116.162049,
                "maxx":118.185727,
                "miny":33.275082,
                "maxy":34.654217
            }
        },
    }
}

module.exports=config;