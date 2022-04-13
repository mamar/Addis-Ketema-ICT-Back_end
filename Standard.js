var express = require('express');
const router=express.Router()
const Connection=require('./Database')

router.post('/AddStandard',(req,res)=>{
    const service=req.body.service
    const measurement=req.body.measurement
    const time=req.body.time
    const price=req.body.price
    const standard='insert into standard (service,measurement,time,price) values(?,?,?,?)'
    Connection.query(standard,[service,measurement,time,price],(err,result)=>{
        if(err){
            res.send({Message:'error'})
           
        }if(result){
            res.send({Message:'success'})
        }
      
    })
})
//It Standard form
router.post('/ItStandardForm/:requestid',(req,res)=>{
    const standardid=req.body.standardid
    const requestid=req.params.requestid
    const itsatndardq="insert into requestwithstandard(requestid,standardid) values(?,?)"
    Connection.query(itsatndardq,[requestid,standardid],(err,result)=>{
        if(err){
            res.send({Message:"error"})
           
        }if(result){
            res.send({Message:"success"})
        }
    })
})
//select All Standard
router.get('/GetAllStandard',(req,res)=>{
    const standardq="select * from Standard"
    Connection.query(standardq,(err,result)=>{
        res.send(result)
    })
})
//Update standard
router.put('/UpdateStandard/:standardid',(req,res)=>{
    const standardid=req.params.standardid
    const service=req.body.service
    const measurement=req.body.measurement
    const time=req.body.time
    const price=req.body.price
    const standardq="update standard set service=? ,measurement=? ,time=?,price=? where standardid=?"
    Connection.query(standardq,[service,measurement,time,price,standardid],(err,result)=>{
        if(err){
            res.send({Message:"Error"})
        }if(result){
            res.send({Message:"Success"})
        }
    })
})
//Getfor Standard for Update
router.get('/GetStandardForUpdate/:Standardid',(req,res)=>{
    const standardid=req.params.Standardid
    const standardq='select standardid,service,measurement,'+
                     'time,price from Standard where standardid=?'
    Connection.query(standardq,[standardid],(err,result)=>{
        if(err){
            res.send({Message:"Error"})
        }if(result){
            res.send(result)
        }
    })
})
//user Standard 
router.get('/UserStandard/:username/:startDate/:endDate',(req,res)=>{
    const user=req.params.username
    const startDate=req.params.startDate
    const endDate=req.params.endDate
    const userstandq1='select s.service,s.measurement,s.time,'+
       '(case when DATEDIFF(r.finishedDate,r.assignedDate)+1 < s.time then COUNT(*) END) belowStandard,'+
        '(case  when DATEDIFF(r.finishedDate,r.assignedDate)+1 = s.time then COUNT(*) END) WithinStandard,'+
        '(case when DATEDIFF(r.finishedDate,r.assignedDate)+1 > s.time then COUNT(*) END) AboveStandard, '+
         ' "100%" AS "Standard",(SUM(r.satisfaction)/(COUNT(*))) "Actual",'+
         '( case when (SUM(r.satisfaction)/(COUNT(*))) >= 95  then "በጣም ከፍተኛ" '+
       'when (SUM(r.satisfaction)/(COUNT(*)))between 75 and 95 then "ከፍተኛ" '+
       'when (SUM(r.satisfaction)/(COUNT(*))) between 50 and 75  then "መካከለኛ" '+
       'when (SUM(r.satisfaction)/(COUNT(*))) <= 50  then "በጣም ዝቅተኛ" end ) as standardAmh,'+
       '(s.price * COUNT(*)) price  from request r inner join requestwithstandard rs '+
        'on rs.requestid = r.request_id inner join standard s '+
         'on s.standardid=rs.standardid where r.workerusername=? and '+
          'DATE_FORMAT(finishedDate,"%d-%m-%y") between  ? and ? '+
         'and r.satisfaction is not null and  r.status="finished"  GROUP by s.service'
    Connection.query(userstandq1,[user,startDate,endDate],(err,result)=>{
        res.send(result)
        
    
    })
})
router.delete('/DeleteStandard/:standardid',(req,res)=>{
    const standardid=req.params.standardid
    const deletStand='Delete from Standard where standardid=?'
    Connection.query(deletStand,[standardid],(err,result)=>{
        if(result){
            res.send({Message:'success'})
        }if(err){
            res.send({Message:'error'})
            console.log(err)
        }
    })
})
module.exports=router
