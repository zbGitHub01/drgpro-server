var mysql = require("mysql");
// var connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"123456",
//     database:"drgserver"
// });
// connection.connect();

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"drgserver"
});

function query(sql,params,callback) {
    pool.getConnection(function (err,connect) {
        if(err){
            console.log(`mysql链接失败${err}`)
        }else {
            connect.query(sql,params,function (err,rows) {
                callback(err,rows);
                connect.release();
            })
        }
    })
}

// function query(sql,params,callback){
//     pool.getConnection(function(err,connection){
//         connection.query(sql, params,function (err,rows) {
//             callback(err,rows);
//             connection.release();
//         });
//     });
// }

module.exports = pool
