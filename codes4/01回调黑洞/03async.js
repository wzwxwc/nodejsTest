/**
 * Created by zc on 2017/6/8.
 */

var async = require('async');

async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
        console.log('1');
    },
    function (arg1, arg2, callback) {
        callback(null, 'three');
        console.log(arg1);
        console.log(arg2);
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
        console.log(arg1);
    }
], function (err, result) {
    console.log(result);
    // result now equals 'done'
    //  console.log('4');
});
