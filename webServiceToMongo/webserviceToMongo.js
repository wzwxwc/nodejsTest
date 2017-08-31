/**
 * Created by zc on 2017/8/29.
 */
var soap = require('soap');
var url = 'http://120.27.19.171:8686/Service/GasService/wsdl?wsdl';
// var url = 'http://120.27.19.171:8686/Service/GasService?wsdl';
// var args = {arg0: "bjdata"};
var opts = {
    "disableCache": true
}
soap.createClient(url, opts, function (err, client) {
    if (err) {
        console.log("发生错误:" + err);
    } else {
        client.getJksbList("bjdata", function (err2, result) {
            if (err2) {
                console.log("发生错误：" + err2);
            } else {
                console.log(result);
            }
        });
    }
});