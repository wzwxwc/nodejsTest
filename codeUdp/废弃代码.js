/**
 * Created by zc on 2017/8/21.
 */
//这个ip没有什么意义
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


/**
 * 主机向从机发送查询数据包
 * @param msg16
 * @returns {string}
 */
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