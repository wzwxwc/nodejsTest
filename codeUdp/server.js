/**
 * Created by zc on 2017/8/15.
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

    var txtFromUser = uint8arrayToStringMethod(msg);
    var idResult = fnGetId(txtFromUser);
    server.send(idResult, rinfo.port, rinfo.address);
});
server.bind('8060');

/**
 * 解析udp的编码为原始文本
 * @param myUint8Arr
 * @returns {*}
 */
function uint8arrayToStringMethod(myUint8Arr) {
    //下述存在中文乱码
    return String.fromCharCode.apply(null, myUint8Arr);
}

function fnDealWithDataFromUser(txtFromUser) {
    var arrFromUser = txtFromUser.split(" ");
    //忽略前4个
    //第5到第15位为DTU ID（16进制转换为10进制，再按照ascii编码解析）
    var dtuid = "";
    for (var i = 4; i < 15; i++) {
        var one = arrFromUser[i];
        dtuid += String.fromCharCode(parseInt(one, 16));
    }
    //第16到19位，为终端IP（16进制转换为10进制，之间已点号分割）
    var ip = "";
    for (var j = 15; j < 19; j++) {
        var oneIp = parseInt(arrFromUser[j], 16);
        ip += oneIp + ".";
    }
    ip = ip.substr(0, ip.length - 1);
    console.log(dtuid);
    console.log(ip);
    return dtuid;
}

function fnGetId(txtFromUser) {
    var arrFromUser = txtFromUser.split(" ");
    //第5到第15位为DTU ID（16进制转换为10进制，再按照ascii编码解析）
    var dataToDevice = "7B 81 00 10 ";
    for (var i = 4; i < 15; i++) {
        var one = arrFromUser[i];
        dataToDevice += one + " ";
    }
    dataToDevice += "7B";
    return dataToDevice;
}
