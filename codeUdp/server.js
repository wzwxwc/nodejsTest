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
    var i = 0;
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    var msg16 = fnConvert8to16_2(msg);
    console.log("收到信息：" + msg16);
    if (msg16) {
        var dataOutput = getDataResponseToHeartBeat(msg16);
        var ip = fnGetIp(msg16);
        console.log("ip is " + ip);
        if (dataOutput) {
            // server.send(idResult, rinfo.port, rinfo.address);
            if (i <= 1) {
                server.send(new Buffer(dataOutput), rinfo.port, ip);
            } else {
                dataOutput = fnCreateDataOfQuery(msg16);
                server.send(new Buffer(dataOutput), rinfo.port, ip);
            }
            console.log("向服务器发送：" + dataOutput);
        }
    }
});
server.bind('8089');


/**
 * 心跳包的相应数据
 * @param msg16 已经翻译为16进制的原始响应
 * @returns {*}
 */
function getDataResponseToHeartBeat(msg16) {
    var result = "";
    //1、前面加上固定7B 81 00 10
    result += "7B810010";
    //2、加上DTU ID
    //截取第9位到30位的数据
    var dtuid = msg16.substring(8, 30);
    result += dtuid;
    //结尾加上7B
    result += "7B";
    return fnAddSpaceBy2(result);
}

function fnGetIp(msg16) {
    //第16到19位，为终端IP（16进制转换为10进制，之间已点号分割）
    var ipMsg16 = msg16.substr(30, 8);
    var ip = "";
    for (var i = 0; i < 8; i += 2) {
        var oneIp = parseInt(ipMsg16.substr(i, 2), 16);
        ip += oneIp + ".";
    }
    ip = ip.substr(0, ip.length - 1);
    return ip;
}

function fnCreateDataOfQuery(msg16) {
    var dtuid = msg16.substring(8, 30);
    var result = "7B890010";
    result += dtuid;
    result += "7B010300000002C40B";
    return result;
}


//字符串22之间放一个空格
function fnAddSpaceBy2(str) {
    var result = "";
    for (var i = 0; i < str.length; i += 2) {
        var slice = str.substr(i, 2);
        result += slice + "";
    }
    return result;
}

function fnConvert8to16_2(buf) {
    var result = buf.toString('hex');
    return result;
}


function getBuffer(value, length) {
    var buffer = length && new Buffer(length);
    switch (length) {
        case 1:
            buffer.writeUInt8(value);
            return buffer;
        case 2:
            buffer.writeInt16BE(value);
            return buffer;
        case 4:
            buffer.writeFloatBE(value);
            return buffer;
        default:
            return new Buffer(value);
    }
}

/**
 * 解析udp的编码为原始文本
 * @param myUint8Arr
 * @returns {*}
 */
function uint8arrayToStringMethod(myUint8Arr) {
    //下述存在中文乱码
    return String.fromCharCode.apply(null, myUint8Arr);
}

function fnDealWithDataFromUser(arrFromUser) {
    // var arrFromUser = txtFromUser.split(" ");
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

function fnConvert8to16(arrMsg) {
    var arrResult = [];
    for (var i = 0; i < arrMsg.length; i++) {
        var one = String.fromCharCode(parseInt(arrMsg[i], 16));
        arrResult.push(one)
    }
    return arrResult;
}