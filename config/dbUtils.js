const config = require('../config/config');
const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;

mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;


// module.exports.getConnection = function (callback) {
//     if (!db) {
//         MongoClient.connect(config.mongodbURL, { useNewUrlParser: true }, function (err, database) {
//             if (err) {
//                 throw err;
//             }
//             console.log("Created database connection in db connection" + database);
//             db = database.db(config.masterDb)
//             //db = database;
//             callback(db);
//         });
//     } else {
//         //console.log("Else block of get connection");
//         callback(db);
//     }
// }

module.exports = {
    User: require('../app/models/app.users.model')
};