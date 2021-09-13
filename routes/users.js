var express = require('express');
var router = express.Router();
//引入模块
var mysql = require('mysql');
const db = require('../database/DBConfig');
//引入数据库语句文件
var UserSQL = require('../database/querysql')

//登陆请求处理
router.post('/login',function (req,res,next) {
    console.log(req.data)
    const {username,password} = req.body 
    db.query( UserSQL.query,[username,password],function (err,result) {
        if(result.length === 0 ) {
          res.send ({
            status: 1,msg: '登陆失败，用户名或密码不正确' 
          })          
        } else {
          res.send ({         
            status: 0,msg:'登陆成功！'
          })
          console.log(result)
        }
      })  
  })

  //查询所有字段
  router.get('/analysis/allinfo',function (req,res,next) {
    const rules = [
      {  
        'id': 1,
        'name':'drg_mark',
        'value':'分组清单标记表'
      },
      {
        'id': 2,
        'name':'pre_ADRG',
        'value':'先期分组ADRG规则'
      },
      {
        'id': 3,
        'name':'MDC',
        'value':'MDC规则'
      },
      {
        'id': 4,
        'name':'ADRG_step1',
        'value':'ADRG规则'
      },
      {
        'id': 5,
        'name':'ADRFG_multiple',
        'value':'多因子ADRG规则'
      },
      {
        'id': 6,
        'name':'cc_class',
        'value':'合并症规则（次要诊断）'
      },
      {
        'id': 7,
        'name':'pdx_cc',
        'value':'主诊断自带合并症属性规则（主诊断）'
      },
      {
        'id': 8,
        'name':'exclude_cc',
        'value':'主诊断和次诊断互斥规则'
      },
      {
        'id': 9,
        'name':'ADRG_trauma',
        'value':'多发性创伤规则,用于动态trauma标记'
      },
      {
        'id': 10,
        'name':'icd_mapping',
        'value':'院内编码转化表，适配分组器编码版本'
      }
    ]
    const param = req.body
    db.query( UserSQL.queryInfo,function (err,result) {
        if(result) {
          res.send ({
            status: 0,msg:'查询成功！',data:result,rules
          })
        } else {
          res.send ({
            status: 1,msg: '查询失败' 
          })
        }
      })  
  })

  //条件查询
  router.post('/analysis/varqueries',function (req,res,next) {
    const data = req.body;
    console.log('我是',data)
    if(data.diag_name !== undefined){
    db.query(UserSQL.queryDiagName,data.diag_name,function(err,result){
      if(data.diag_name === '' ){
        res.send({
          status:404,msg:'查询失败，请输入查询关键字！'
        })
      } else {
        if(result){
          res.send({
            status:200,msg:"查询成功！",data: result
          })
        }else {
          res.send({
            status:404,msg:'查询失败'
          })
      }}
    });
  } else if (data.pid !== undefined){
      db.query(UserSQL.queryByPid,data.pid,function(err,result){
        if(result){
          res.send({
            status:200,data: result
          })
        }else {
          res.send({
            status:404
          })
      }
    });
  } else if(data.surg_name !== undefined){
      db.query(UserSQL.queryBySurgName,data.surg_name,function(err,result){
        if(result){
          res.send({
            status:200,data: result
          })
        }else {
          res.send({
            status:404
          })
      }
    });
  }
  })

  //更改数据
  router.post('/analysis/update',function(req,res,next){
    console.log(req.body)
    const {pid,diag_name,surg_name} = req.body
   
    db.query(UserSQL.updateByParam,[diag_name,surg_name,pid],function(err,result){
        if(err) {
          res.send({
            status: 1,
            msg: ' 修改未成功，请重新修改。'
          })
        }  else {
          res.send({
            status: 0 ,
            msg:'successful'
          })
        }
    })
  })




  // //根据Pid查询
  // router.post('/analysis/pid',function (req,res,next) {
  //   const {pid} = req.body
  //   db.query(UserSQL.queryByPid,pid,function(err,result){
  //       if(result){
  //         res.send({
  //           status:200,data: result
  //         })
  //       }else {
  //         res.send({
  //           status:404
  //         })
  //     }
  //   });
  // })

  // //根据surg_name查询
  // router.post('/analysis/surgname',function (req,res,next) {
  //   const {surg_name} = req.body
  //   db.query(UserSQL.queryBySurgName,surg_name,function(err,result){
  //       if(result){
  //         res.send({
  //           status:200,data: result
  //         })
  //       }else {
  //         res.send({
  //           status:404
  //         })
  //     }
  //   });
  // })


// router.post('/login',function (req,res,next) {
//   pool.getConnection(function (err,connection) {
//     const param = req.body
//     connection.query(UserSQL.query,[param.username,param.password] ,function (err,result) {
//         if(result) {
//           result = {
//             status: 0,msg:'登陆成功！',data:{id: 'a123',username,password}
//           }
//         } else {
//           result = {
//             status: 1,msg: '登陆失败，用户名或密码不正确' 
//           }
//         }
//       responseJSON(res,result);
//       //释放链接
//       connction.release();
//     })
//   })
 
// })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
