/**
 * Created by zc on 2017/6/22.
 */
var mongoose = require("mongoose");
var urlMongo = "mongodb://localhost/zc";
mongoose.connect(urlMongo);
var connMongoose = mongoose.connection;
connMongoose.on('error', console.error.bind(console, 'connection error:'));
connMongoose.once('open', function () {
    // we're connected!
    var dbMongo = connMongoose.db;
    var result = dbMongo.collection("user_safety_FLOORPLAN").find({
        "_id":"1"
    });
    console.log(result);
});
