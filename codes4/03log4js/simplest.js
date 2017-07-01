/**
 * Created by zc on 2017/7/1.
 */
var log4js = require("log4js");
var logger = log4js.getLogger("zchehe");
//下述3个不同级别的信息，在控制台中显示不同的颜色
logger.debug("Time:", new Date());
logger.info("Time:", new Date());
logger.error("Time:", new Date());
//new Date返回的是
//2017-07-01T05:49:28.060Z
//上述是国际0时区，不是我当前的北京东八时区
//怎么解决
console.log("Time:", new Date());