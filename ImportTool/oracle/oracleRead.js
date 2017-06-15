/**
 * oracle数据读取模块
 * Created by zc on 2017/6/7.
 */
// app.js

var oracledb = require('oracledb');

oracledb.getConnection({
    user: "emergencydev",
    password: "emergencydev",
    connectString: "192.168.29.68:1521/gxdev"
}, function (err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("SELECT * FROM zcblob",
        [],
        function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.metaData);
            console.log(result.rows);
            doRelease(connection);
        });
});

function doRelease(connection) {
    connection.release(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        }
    );
}