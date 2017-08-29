/**
 * Created by zc on 2017/8/29.
 */
var soap = require('soap');
var url = 'http://120.27.19.171:8686/Service/GasService?wsdl';
var args = {userid: 'bjdata'};
soap.createClient(url, function (err, client) {
    client.getJksbList(args, function (err, result) {
        console.log(result);
    });
});