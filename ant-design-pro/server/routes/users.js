var express = require('express');
var query = require('../db.js');
var router = express.Router();
var {geneToken} =require ('../utils/index.js')
// var {geneToken, getIdFromToken} = require('../utils/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 登陆功能
router.post('/login', function(req, res, next) {
  console.log(req.body)
  query('select id from user where username=? and password = ?', [req.body.userName, req.body.password], function(error, results, fields){
    if (error){
      res.json({
        code: -1,
        msg: error.sqlMessage
      })
    }
    if (!results[0] || !results[0].id){
      res.json({
        code: -2,
        msg: '用户名或密码错误'
      })
    } else{
      var token = geneToken(results[0].id);
      query('insert into token set ?', {uid: results[0].id, token, create_time: +new Date()}, (error, result, fields)=>{
        res.json({
          code: 1,
          data: {token},
          msg: '登陆成功'
        })
      })
    }
  })
});

// 用户注册
router.post('/register', function(req, res, next){
  query('select id from user where phone = ?', [req.body.phone], function(error, results, fields){
    if (error){
      res.json({
        code: -1,
        msg: error.sqlMessage
      })
    }
    if (results[0] && results[0].id){
      res.json({
        code: -2,
        msg: '该手机号已被注册，请输入您的手机号'
      })
    } else{
      query('insert into user set ?', {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.mobile,
        avatar: 'http://img.52z.com/upload/news/image/20180721/20180721051014_12703.jpg',
        create_time: +new Date()}, (error, result, fields)=>{
          if (result.insertId){
            var token = geneToken(result.insertId);
            query('insert into token set ?', {uid: result.insertId, token, create_time: +new Date()}, (error, result, fields)=>{
              if (error){
                res.json({
                  code: -4,
                  msg: error.sqlMessage
                })
              }else{
                res.json({
                  code: 1,
                  data: {token},
                  msg: '注册成功'
                })
              }
              console.log('results...', error, result);
            })
          }else{
            res.json({
              code: -3,
              msg: '注册用户失败'
            })
          }
      })
    }
  })
});
//查询手机号
router.post('/find',function(req, res, next){
  query('select id from user where phone = ?', [req.body.phone], function(error, results, fields){
    if (error){
      res.json({
        code: -1,
        msg: error.sqlMessage
      })
    }
    if (results[0] && results[0].id){
      res.json({
        code: 1,
        msg: '该手机号被注册了'
      })
    } else{
      res.json({
        code: 0,
        msg: '该手机号还没有注册，请去注册手机号'
      })
    }
  })
})
// 获取用户信息
// router.get('/currentUser', (req, res)=>{
//   let token =  req.header('X-Token');
//   var uid = getIdFromToken(token);
//   console.log('token...', token);
//   query('select * from user where id = ?', [uid], (error, result, fields)=>{
//     if (error){
//       res.json({
//         code: -1,
//         msg: error.sqlMessage
//       })
//     }else{
//       if(result && result.length){
//         delete result[0].password;
//         res.json({
//           code: 1,
//           data: result[0],
//           msg: '获取用户信息成功'
//         })
//       }else{
//         res.json({
//           code: -2,
//           msg: '该用户不存在'
//         })
//       }
//     }
//     console.log('results...', error, result);
//   })
// })

module.exports = router;
