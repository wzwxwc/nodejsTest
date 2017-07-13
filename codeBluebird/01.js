/**
 * Created by zc on 2017/7/10.
 */
var fs = require('fs');
var Promise = require('bluebird');

var readFileAsync = function (name) {
    return new Promise(function (resolve, reject) {
        fs.readFile(name, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};

readFileAsync('1.txt')
    .then(function (data1) {
        console.log(data1);
        return readFileAsync('2.txt');
    })
    .then(function (data2) {
        console.log(data2);
    })
    .catch(function (err) {
        console.error(err)
    });