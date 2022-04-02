var express = require('express');
const router=express.Router()
const mysql=require('mysql');
const format = require('date-format');
const date=require('date-and-time')
const Connection=require('./Database')

router.post('/AddRequest/:requesterusername',(req,res)=>{
   
    const request_type=req.body.request_type
    const problem_desc=req.body.problem_desc
    const status="New"   
   //const Date1 = date.format(now,'DD/MM/YYYY ');
    //const Date1=new Date().getTime()
    const requesterusername=req.params.requesterusername
   

  const addRequest=
  'Insert into request (requesterusername,request_type,problem_desc,status) values(?,?,?,?)'
  Connection.query(addRequest,[requesterusername,request_type,problem_desc,status],(err,result)=>{
          if (err){
             res.send({Message:"Error"})
             console.log(err)
          
          }
          if(result){
              res.send({Message:"Success"})
              
          }
         
      })
})
// Get All Request 
router.get('/GetAllRequest',(req,res)=>{
  const getrequest='select r.request_id, r.requesterusername,r.workerusername,u.division,u.floor_no,u.office_no,r.Assignedby,'+
       ' u.phone,r.request_type,r.problem_desc,r.status,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") assignedDate,'+
       'DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s") finishedDate,DATE_FORMAT (r.Date,"%d/%m/%y %h:%m:%s")Date'+
       ' from request r,users u where r.requesterusername=u.username order by DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s") desc'
  Connection.query(getrequest,(err,result)=>{
      if(err){
          res.send('error')
      } else{
          res.send(result)
      }
         
      
  })
})
//get Request by id
router.get('/GetRequestbyid/:request_id',(req,res)=>{
  const request_id=req.params.request_id
  const getreq='select * from request where request_id=?'
  Connection.query(getreq,[request_id],(err,result)=>{
      if(err) {
          res.send('error')
      }else{
          res.send(result)
      }
          
      
  })
})
//Delete Request by id
router.delete('/DeleteRequest/:request_id',(req,res)=>{
  const request_id=req.params.request_id
  const Deletreq='Delete from request where request_id=?'
  Connection.query(Deletreq,[request_id],(err,result)=>{
      if(err){
          res.send({Message:'error'})
      } if(result){
          res.send({Message:'success'})
      }
     
  })
  

})
//Get new Request
router.get('/GetNewRequest',(req,res)=>{
  
  const getrequest='select r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,'+
         'u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,'+
         'u.division,u.floor_no,u.office_no,u.phone,r.request_type,r.problem_desc ,'+
        ' r.status from request r,users u  where r.status="New" and u.username=r.requesterusername order by DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") desc'
  Connection.query(getrequest,(err,result)=>{
      if(err) {
          res.send("error")
      }if(result){
          res.send(result)
      }                    
  })
})

//Get Work on Pregress Request
router.get('/Onprogress',(req,res)=>{
  const getrequest='select * from request where status="Work On Progress"'
  Connection.query(getrequest,(err,result)=>{
      if(err){
          res.send(err)
      } else{
          res.send(result)
      }
    
  })
})

router.get('/CountAllTask',(req,res)=>{
  const counttask='select count(*)  total from request'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
router.get('/CountSolutionOffered',(req,res)=>{
  const counttask='select count(*)  total from request where status="finished"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
router.get('/CountOnProgress',(req,res)=>{
  const counttask='select count(*)  total from request where status="Work On Progress"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
//Count Taks done on Computer
router.get('/CountComputer',(req,res)=>{
  const counttask='select count(*)  total from request where request_type like "%Computer%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
////Count Taks done on Printer

router.get('/CountPrinter',(req,res)=>{
  const counttask='select count(*)  total from request where request_type like "%Printer%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
// Count Software
router.get('/CountSoftware',(req,res)=>{
  const counttask='select count(*)  total from request where request_type like "%Software%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
//Count Network
router.get('/CountNetwork',(req,res)=>{
  const counttask='select count(*)  total from request where request_type like "%Network%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
//Count PhotoCopy
router.get('/CountPhotocopy',(req,res)=>{
  const counttask='select count(*)  total from request where request_type like "%Photocopy%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})
//Count PhotoCopy
router.get('/CountOthers',(req,res)=>{
  const counttask='select count(*)  total from request where request_type="%Others%"'
  Connection.query(counttask,(err,result)=>{
      res.send(result)
  })
})


//self Assign Assign Task
router.put('/AssignTask/:request_id/:workerusername',(req,res)=>{
  const taskid=req.params.request_id
  const workerusername=req.params.workerusername
  const now=new Date()
  const Date1 = date.format(now,'YYYY-MM-DD HH:mm:ss');
  //const Date1=new Date().getTime()
  const assigntaks='update request set Assignedby="Self" ,status="Work On Progress",assignedDate=?,workerusername=? where request_id=?'
  Connection.query(assigntaks,[Date1,workerusername,taskid],(err,result)=>{
      if(err){
          res.send({Message:'Error'})
          
      } if(result){
          res.send({Message:"Success"})
        
       
      }
      
  })
})
// Assign  Task For user
router.put('/AssignUser/:request_id/:Assignedby',(req,res)=>{
    const taskid=req.params.request_id
    const workerusername=req.body.workerusername
    const Assignedby=req.params.Assignedby
    const now=new Date()
    const Date1 = date.format(now,'YYYY-MM-DD HH:mm:ss');
    //const Date1=new Date().getTime()
    const assigntaks='update request set status="Work On Progress",assignedDate=?,workerusername=?,Assignedby=? where request_id=?'
    Connection.query(assigntaks,[Date1,workerusername,Assignedby,taskid],(err,result)=>{
        if(err){
            res.send({Message:'Error'})
            
        } if(result){
            res.send({Message:"Success"})
          
         
        }
        
    })
  })
//finish Task
router.put('/finishTask/:request_id',(req,res)=>{
  const taskid=req.params.request_id
  const now=new Date()    
  const Date1 = date.format(now,'YYYY-MM-DD HH:mm:ss');
  const assigntaks='update request set status="finished",finishedDate=? where request_id=?'
  Connection.query(assigntaks,[Date1,taskid],(err,result)=>{
      if(err){
          res.send({Message:'Error'})
      
      } if(result){
              res.send({Message:"Success"})
         
          
      }
      
  })
})
//Finished Task

//Tasks 
//New Tasks
/* router.get('/GetNewTasks',(req,res)=>{
  const gettask='select r.request_id,o.office_name,(select user_fullname from users u where u.username=r.requesterusername ) as fullname,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc,Date from request r,office o  where status="New" and r.office_id=o.office_id'
  Connection.query(gettask,(err,result)=>{
      res.send(result)
  })
}) */
//Progress 
router.get('/GetProgressTask/:workerusername',(req,res)=>{
   const workerusername=req.params.workerusername
   const progreassTask='select (select count(*) FROM  requestwithstandard rs where   r.request_id =rs.requestid)  checkstandard,'+
   ' r.status, r.request_id,r.Assignedby,'+
    '(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,'+
    'u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%Y %h:%m:%s") as Date,'+
    'u.division,u.floor_no,u.office_no,u.phone,r.request_type,r.problem_desc ,'+
    'DATE_FORMAT(r.assignedDate,"%d/%m/%Y %h:%m:%s") as assignedDate ,r.satisfaction,r.comment'+
   ' from request r,users u  where r.status="work on progress " and'+
    ' u.username=r.requesterusername and workerusername=? order by DATE_FORMAT(r.assignedDate,"%d/%m/%Y %h:%m:%s") desc'
   Connection.query(progreassTask,[workerusername],(err,result)=>{
       if(err){
           res.send(err)
       }else{
          res.send(result)
       }
      
   })
})
//For Requester
router.get('/GetRequestedTasks/:requesterusername',(req,res)=>{
  const requesterusername=req.params.requesterusername
  const progreassTask='select r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,'+
  'DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc ,'+
  'DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") as assignedDate,'+
  'DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s")finishedDate,'+
  'r.satisfaction from  request r,users u where  r.workerusername=u.username '+
   'and r.requesterusername=? and r.status ="finished" and satisfaction is null order by DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s") desc'
  Connection.query(progreassTask,[requesterusername],(err,result)=>{
      if(err){
          res.send(err)
      }else{
          res.send(result)
      }
      
  })
})
//Finished Tasks With Satisfaction 
router.get('/FinishedTasksWithSatisfaction/:requesterusername',(req,res)=>{
  const requesterusername=req.params.requesterusername
  const progreassTask='select r.comment, r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") as assignedDate,DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s") as finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  and r.requesterusername=? and r.status ="finished" and satisfaction is not null order by finishedDate desc'
  Connection.query(progreassTask,[requesterusername],(err,result)=>{
      if(err){
          res.send(err)
      }else{
          res.send(result)
      }
      
  })
})
//Progress Tasks for Requester
router.get('/ProgressTasksForRequester/:requesterusername',(req,res)=>{
  const requesterusername=req.params.requesterusername
  const progreassTask='select count(*) "ProgressTask", r.request_id,r.status,u.user_fullname,'+
  'u.Position,u.Gender,u.Phone ,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,'+
 ' r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") assignedDate,'+
 ' r.finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  '+
  'and r.requesterusername=? and r.status ="Work On Progress" order by DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") desc'
  Connection.query(progreassTask,[requesterusername],(err,result)=>{
      if(err){
          res.send(err)
      }else{
          res.send(result)
      }
      
  })
})
//New Request For Requester
router.get('/NewRequestsForRequester/:requesterusername',(req,res)=>{
  const requesterusername=req.params.requesterusername
  const progreassTask='select r.request_id,r.status ,'+
  'DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc '+
  'from  request r,users u where  r.requesterusername=u.username  and r.requesterusername=?'+ 
  'and r.status ="New" order by r.Date desc'
  Connection.query(progreassTask,[requesterusername],(err,result)=>{
      if(err){
          res.send({Message:"error"})
      }else{
          res.send(result)
      }
      
  })
})
//Send Satisfaction 
router.put('/SendSatsfaction/:requestid',(req,res)=>{
  const taskid=req.params.requestid
  const satisfaction=req.body.satisfaction
  const comment=req.body.comment
  const satquery='update request set satisfaction=? ,comment=? where request_id=?'
  Connection.query(satquery,[satisfaction,comment,taskid],(err,result)=>{
      if(err){
          res.send({Message:'error'})
          
      
      } if(result){
          res.send({Message:"success"})
          
          
      }
      
  })
})
//Get progress task by user
router.get('/GetProgressTaskbyUser/:username',(req,res)=>{
  const progreassTask='select * from request where  status="OnProgress"'
  Connection.query(progreassTask,(err,result)=>{
      res.send(result)
  })
})

//  Solution Offered Tasks  by user

router.get('/finishedTasksbyUser/:workerusername',(req,res)=>{
  const workerusername=req.params.workerusername
  const progreassTask='select r.comment,r.status,r.request_id,'+
  '(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,'+
  'u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%Y %h:%m:%s") as Date,'+
 ' u.division,u.floor_no,u.office_no,u.phone,r.request_type,r.problem_desc,r.Assignedby,'+
  'DATE_FORMAT(r.assignedDate,"%d/%m/%Y %h:%m:%s") as assignedDate,'+
  'DATE_FORMAT(r.finishedDate,"%d/%m/%Y %h:%m:%s") as finishedDate ,r.satisfaction '+
  'from request r,users u  where r.status="finished" and u.username=r.requesterusername and workerusername=? order by DATE_FORMAT(r.finishedDate,"%d/%m/%Y %h:%m:%s") desc'
  Connection.query(progreassTask,[workerusername,workerusername],(err,result)=>{
      if(err){
          res.send(err)
        
      }else{
          res.send(result)
      }
    
  })
})
router.get('/performance/:startDate/:endDate',(req,res)=>{
  const startDate=req.params.startDate
  const endDate=req.params.endDate
  const performance =  'select u.user_fullname,'+
                       '(select count(*) as count from request r  where r.workerusername=u.username and r.status="finished")"Finished",'+ 
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress") "Assigned",'+
                        '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Computer%" ) "ComputerProgress",'+ 
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Computer%" ) "ComputerFinished",'+
                      '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Printer%" ) "PrinterProgress",'+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Printer%" ) "PrinterFinished" ,'+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Photocopy%" ) "PhotoCopyFinished",'+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Photocopy%" ) "PhotoCopyProgress", '+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Network%" ) "NetworkProgress",'+
                      '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Network%" ) "NetworkFinished",'+  
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Software%" ) "SoftwareFinished",'+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Software%" ) "SoftwareProgress",'+
                       '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type like "%Others%" ) "OtherProgress",(select count(*)'+
                      ' from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type like "%Others%" ) "OtherFinished"  from users u ,request r WHERE u.username=r.workerusername and DATE_FORMAT(r.assignedDate,"%d-%m-%y") between ? and  ? group  by u.username '
  Connection.query(performance,[startDate,endDate],(err,result)=>{
      res.send(result)
  })
})
module.exports=router