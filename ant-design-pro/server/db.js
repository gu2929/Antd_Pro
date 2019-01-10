var mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'1605a',
    port:3306
});
var query=function (sql,options,callback) {
    pool.getConnection(function(err,coon){
        if(err){
            callback(err,null,null)
        }else{
            coon.query(sql,options,function(err,results,fields){
                coon.release();
                callback(err,results,fields)
            })
        }
    })
}

module.exports = query;