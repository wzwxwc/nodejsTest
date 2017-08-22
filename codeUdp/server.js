/**
 * Created by zc on 2017/8/21.
 */
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('close', () => {
    console.log('socket已关闭');
});
server.on('error', (err) => {
    console.log(err);
});
server.on('listening', () => {
    console.log('socket正在监听中...');
});
server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    var msg16 = fnConvert8to16_2(msg);
    console.log("收到信息：" + msg16);
    if (msg16) {
        var dataOutput = "";
        if (msg16.length > 44) {
            //从机主动发送数据包
            dataOutput = responeToAutoSend(msg16);
        } else {
            //心跳包
            dataOutput = responseToHeartBeat(msg16);
        }
        console.log("向服务器发送：" + dataOutput);
        server.send(new Buffer(dataOutput), rinfo.port, rinfo.address);
    }
});
// server.bind('8089');
server.bind('9089');

function fnConvert8to16_2(buf) {
    var result = buf.toString('hex');
    return result;
}

/**
 * 对心跳包进行响应
 * @param msg16 已经翻译为16进制的原始响应
 * @returns {*}
 */
function responseToHeartBeat(msg16) {
    var result = "";
    //1、前面加上固定7B 81 00 10
    result += "7B810010";
    //2、加上DTU ID：截取第9位到30位的数据
    var dtuid = msg16.substring(8, 30);
    result += dtuid;
    //3、结尾加上7B
    result += "7B";
    return result;
}

/**
 * 对“从机主动发送数据的包”进行响应
 * @param msg16 已经翻译为16进制的数据包
 */
function responeToAutoSend(msg16) {
    var result = {};
    //进口压力：47位到54位(共8位)
    var jkyl = msg16.substr(46, 8);
    result.jkyl = jkyl;
    //出口压力：55位到62位（共8位）
    var ckyl = msg16.substr(54, 8);
    result.ckyl = ckyl;
    //机箱内温度：63位到70位（共8位）
    var jxnwd = msg16.substr(62, 8);
    result.jxnwd = jxnwd;
    //燃气温度：71位到78位（共8位）
    var rqwd = msg16.substr(70, 8);
    result.rqwd = rqwd;
    //泄露浓度：95位到102位（共8位）
    var xlnd = msg16.substr(94, 8);
    result.xlnd = xlnd;
    //电池电压:127位到134位（共8位）
    var dcdy = msg16.substr(126, 8);
    result.dcdy = dcdy;
    //经度：135位到142位（共8位）
    var jd = msg16.substr(134, 8);
    result.jd = jd;
    //纬度：143位到150位（共8位）
    var wd = msg16.substr(142, 8);
    result.wd = wd;
    //数据采集周期：151位到158位（共8位）
    var sjcjzq = msg16.substr(150, 7);
    result.sjcjzq = sjcjzq;
    //数据上传周期：159位到166位（共8位）
    var sjsczq = msg16.substr(158, 7);
    result.sjsczq = sjsczq;
    //手机1号码：167位到178位（共12位）
    var sj1hm = msg16.substr(166, 12);
    result.sj1hm = sj1hm;
    //手机2号码：179位到190位（共12位）
    var sj2hm = msg16.substr(178, 12);
    result.sj2hm = sj2hm;
    //甲烷一级报警限：463位到470位（共8位）
    var jwyjbjx = msg16.substr(462, 8);
    result.jwyjbjx = jwyjbjx;
    //甲烷二级报警限：471位到478位（共8位）
    var jwejbjx = msg16.substr(470, 8);
    result.jwejbjx = jwejbjx;
    //进口压力低报警限：479位到486位（共8位）
    var jkyldbjx = msg16.substr(478, 8);
    result.jkyldbjx = jkyldbjx;
    //进口压力高报警限：487位到494位（共8位）
    var jkylgbjx = msg16.substr(486, 8);
    result.jkylgbjx = jkylgbjx;
    return result;
}

function fnIEEE754(msg) {
    
}