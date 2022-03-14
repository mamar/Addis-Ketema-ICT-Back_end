const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const bcrypt=require('bcrypt');
const saltRound=10
const cookieParser=require('cookie-parser')
const session=require('express-session')
const jwt=require('jsonwebtoken')
const etdate = require('ethiopic-date');
const ethiopic = require('ethiopic-js')
const date=require('date-and-time')
const format = require('date-format');
const ethiopianDate = require("ethiopian-date")

//create app server
var server = app.listen(8080,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
    const now=etdate.now()
    console.log(now)
    console.log(format.asString('dd/mm/yyyy hh:mm:ss', new Date()));
  
  });
var Connection=mysql.createConnection({
    host:"localhost", 
    user:"root",
    password:"",
    database:"ict"

})
Connection.connect(function(err) {
    
    if (err) throw err

    console.log('You are now connected...')
  })
//start body-parser configuration
app.use( express.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["Get","Post","DELETE","PUT","put","PATCH","patch"],
    credentials:true
}));
app.use(cookieParser())
app.use(session({
    key: 'userid',
    secret:'mamar',
    resave:false,
    saveUninitialized:false,
    cookie:{
        express:60*60*24
    }

}))

//end body-parser configuration

//test APi
app.get('/test',(req,res)=>{
    res.send("Welcome")
})
//Users Table
const verifyJWT=(req,res,netxt)=>{
    const token =req.headers("x-access-token")
    if(!token){
        res.send("We need a token ")

    }else{
        jwt.verify(token,"jwtsecre",(err,decode)=>{
            if(err){
                res.json({auth:falese,message:"Failed to authonticate"})
                
            }else{
                req.userid=decode.id
                netxt()

            }
        })
    }
}
app.get('/isuserauth',verifyJWT,(req,res)=>{
    res.send("You are authonticated")
}) 
app.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedin:true,user:req.session.user})
    }else{
        res.send({loggedin:false,message:"authontication failed"})
    }
})
//login 
app.post('/Login',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const loginuser='select * from users where username=?;'
    Connection.query(loginuser,[username],(err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            if(result.length > 0){
                bcrypt.compare(password,result[0].password,(err,response)=>{
                    if(response){
                        req.session.user=result
                        
                        res.send({user:req.session.user,auth:true})
                    }else{
                        res.send({auth:false,Message:"Wrong username or password"});
                
                    }
                })
               
            }
            else{
                res.send({auth:false,Message:"No user exists"});
                
            }
        }
    })
})
//
app.put('/blockuser/:userid',(req,res)=>{
    const userid=req.params.userid
    const blockuser='update users set status="block" where userid=? '
    Connection.query(blockuser,userid,(err,result)=>{
        if(result){
            res.send({Message:'blocked'})
        }else{
            res.send({Message:"allready blocked"})
        }
    })

})
app.put('/unblockuser/:userid',(req,res)=>{
    const userid=req.params.userid
    const unblockuser='update users set status="unblock" where userid=? '
    Connection.query(unblockuser,userid,(err,result)=>{
        if(result){
            res.send({Message:'ublocked'})
        }else{
            res.send({Message:"repition"})
        }
    })

})

//Logout
app.get('/logout',(req,res) => {
    res.clearCookie(cookieName)
    req.session.destroy();
    res.redirect('/login');
});
//post Users
app.post('/Register',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const ROLES=req.body.ROLES
    const user_fullname=req.body.user_fullname
    const age=req.body.age
    const gender=req.body.Gender
    const position=req.body.Position
    const phone=req.body.Phone
    const office_id=req.body.office_id
    const usercheck='select username from users where username=?'
    const Adduser='insert into users(office_id,username,ROLES,password,user_fullname,age,Gender,Position,Phone) values(?,?,?,?,?,?,?,?,?)'

    Connection.query(usercheck,[username],(err,result)=>{
        if(result.length >= 1){
            res.send({Message:"Username allready exist"})
        }else{
            bcrypt.hash(password,saltRound,(err,hash)=>{
                if(err){
                    res.send({err:"Server Error"})
                }
                Connection.query(Adduser,[office_id,username,ROLES,hash,user_fullname,age,gender,position,phone],(err,result)=>{
                    if(result){
                        res.send(result)
                        console.log(date3)
        
                    }else{
                        res.send({err:"Server Error"})
                    }
                    
                    
                })
        
            })
        }
    })
    
   
   
})
//Get All users
app.get('/Getusers',(req,res)=>{
    const getuser='select u.userid,u.status, o.office_name ,u.username,u.ROLES,u.user_fullname,u.Age,u.Gender,u.Position,u.Phone,u.Date from users u,office o  where u.office_id=o.office_id'
    Connection.query(getuser,(err,result)=>{
        if(err){
            res.send("error")
        } if(result){
            res.send(result)
        }
        
    })
})
//Get users by id
app.get('/Getuserbyusername',(req,res)=>{
    const userid=req.body.params
    const user=  req.session.user[0].username
    const getuserbyid='select * from users where username=?'
    Connection.query(getuserbyid,[user],(err,result)=>{
        if(err){
            res.send('error')
        } else{
            res.send(result)
        }
      
    })

})
//update users
app.patch('/Updateusers/:username',(req,res)=>{
    const username=req.params.username
    const phone=req.body.Phone
  const offic_id=req.body.office_id
    const position=req.body.Position
    const userfullname=req.body.user_fullname
    const updateuser='update users set office_id=?, user_fullname=? , Phone=? ,Position=? where username=?'
    Connection.query(updateuser,[offic_id,userfullname,phone,position,username],(err,result)=>{
        if(err){
            res.send({Message:'Error'})
    
        }if(result){
            res.send({Message:"Success"})
        }

    })
})
//Delete users 
app.delete('/Deleteusers/:userid',(req,res)=>{
    const userid=req.params.userid
    const deletuser='Delete  from users where userid=?'
    Connection.query(deletuser,[userid],(err,result)=>{
        if(err){
            res.send("Server Errorr")
            
        }else{
            res.send("User Deleted Succesfully")
        }
       
    })
})
  //CReate office
  app.post('/AddOffice',(req,res)=>{
      const office_name=req.body.office_name
      const floor_no=req.body.floor_no
      const phone=req.body.phone
     const ethioDate= ethiopianDate.toEthiopian(YYYY,MM,DD)
      const Date2=new Date().getTime()
      const insertoffice='insert into office(office_name,floor_no,phone) values (?,?,?,?)'
      
      Connection.query(insertoffice,[office_name,floor_no,phone],(err,result)=>{
          res.send(result);
          console.log(ethioDate)
         
      })
  })
  //Get All office 
  app.get('/GetOffice',(req,res)=>{
      const selectoffie='select * from office'
      Connection.query(selectoffie,(err,result)=>{
          if(err){ throw err}
          if(result){
            res.send(result)

          }
         
      })
  })
  //Get office by id
  app.get('/getOfficebyId/:office_id',(req,res)=>{
      
     const office_id=req.params.office_id
     const office_name=req.body.office_name
     const floor_no=req.body.floor_no
      const updateOffice='update office set office_name=? and floor_no=? and phone=? where office_id=?'
    Connection.query(updateOffice,[office_name,floor_no,office_id],(err,result)=>{
        res.send(result)
    })

  })
    //Update Office

  app.put('/updateOffice/:office_id',(req,res)=>{
      const office_id=req.params.office_id
      const office_name=req.body.office_name
      const floor_no=req.body.floor_no
      const phone=req.body.phone
      const updateOffice='update office set office_name=? , floor_no=? , phone =? where office_id=?'
      Connection.query(updateOffice,[office_name,floor_no,phone,office_id],(err,result)=>{
        
          res.send(result)
         
      })
  })
  //Delete Office
  app.delete('/DeleteOffice/:office_id',(req,res)=>{
      const office_id=req.params.office_id
      const deleteOffice='Delete  from office where office_id=?'
      
      Connection.query(deleteOffice,office_id,(err,result)=>{
          if(err){
              res.send("error")
          }
          res.send("Office Successfully Deleted")
      })
  })

  //Request Table

  //Post Request 
  app.post('/AddRequest/:requesterusername',(req,res)=>{
      const division=req.body.division
      const floor_no=req.body.floor_no
      const office_no=req.body.office_no
      const phone=req.body.phone
      const request_type=req.body.request_type
      const problem_desc=req.body.problem_desc
      const status="New"
      const now=etdate.now()
      const Date1=new Date().getTime()
      console.log(ethiopic.toEthiopic(Date1))
     console.log( ethiopic.toGregorian(now))
      console.log(now)
     //const Date1 = date.format(now,'DD/MM/YYYY ');
      //const Date1=new Date().getTime()
      const requesterusername=req.params.requesterusername
     

    const addRequest=
    'Insert into request (requesterusername,division,floor_no,office_no,phone,request_type,problem_desc,status) values(?,?,?,?,?,?,?,?)'
    Connection.query(addRequest,[requesterusername,division,floor_no,
        office_no,phone,request_type,problem_desc,status],(err,result)=>{
            if (err){
               res.send({Message:"Error"})
            
            }
            if(result){
                res.send({Message:"Success"})
                
            }
           
        })
  })
// Get All Request 
app.get('/GetAllRequest',(req,res)=>{
    const getrequest='select requesterusername,workerusername,division,floor_no,floor_no,'+
         ' phone,request_type,problem_desc,status,DATE_FORMAT(assignedDate,"%d/%m/%y %h:%m:%s") assignedDate,'+
         'DATE_FORMAT(finishedDate,"%d/%m/%y %h:%m:%s") finishedDate,DATE_FORMAT (Date,"%d/%m/%y %h:%m:%s")Date'+
         ' from request'
    Connection.query(getrequest,(err,result)=>{
        if(err){
            res.send('error')
        } else{
            res.send(result)
        }
           
        
    })
})
//get Request by id
app.get('/GetRequestbyid/:request_id',(req,res)=>{
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
app.delete('/DeleteRequest/:request_id',(req,res)=>{
    const request_id=req.params.request_id
    const Deletreq='Delete from request where request_id=?'
    Connection.query(Deletreq,[request_id],(err,result)=>{
        if(err){
            res.send('error')
        } else{
            res.send("Request Delete Successfully")
        }
       
    })
    

})
//Get new Request
app.get('/GetNewRequest',(req,res)=>{
    
    const getrequest='select r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc ,r.status from request r,users u  where r.status="New" and u.username=r.requesterusername'
    Connection.query(getrequest,(err,result)=>{
        if(err) {
            res.send("error")
        }if(result){
            res.send(result)
        }                    
    })
})

//Get Work on Pregress Request
app.get('/Onprogress',(req,res)=>{
    const getrequest='select * from request where status="Work On Progress"'
    Connection.query(getrequest,(err,result)=>{
        if(err){
            res.send(err)
        } else{
            res.send(result)
        }
      
    })
})

app.get('/CountAllTask',(req,res)=>{
    const counttask='select count(*)  total from request'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
app.get('/CountSolutionOffered',(req,res)=>{
    const counttask='select count(*)  total from request where status="finished"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
app.get('/CountOnProgress',(req,res)=>{
    const counttask='select count(*)  total from request where status="Work On Progress"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
//Count Taks done on Computer
app.get('/CountComputer',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Computer"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
////Count Taks done on Printer

app.get('/CountPrinter',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Printer"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
// Count Software
app.get('/CountSoftware',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Software"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
//Count Network
app.get('/CountNetwork',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Network"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
//Count PhotoCopy
app.get('/CountPhotocopy',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Photocopy"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})
//Count PhotoCopy
app.get('/CountOthers',(req,res)=>{
    const counttask='select count(*)  total from request where request_type="Others"'
    Connection.query(counttask,(err,result)=>{
        res.send(result)
    })
})


//Assign Task
app.put('/AssignTask/:request_id/:workerusername',(req,res)=>{
    const taskid=req.params.request_id
    const workerusername=req.params.workerusername
    const now=new Date()
    const Date1 = date.format(now,'YYYY-MM-DD HH:mm:ss');
    //const Date1=new Date().getTime()
    const assigntaks='update request set status="Work On Progress",assignedDate=?,workerusername=? where request_id=?'
    Connection.query(assigntaks,[Date1,workerusername,taskid],(err,result)=>{
        if(err){
            res.send({Message:'Error'})
            
        } if(result){
            res.send({Message:"Success"})
            console.log(Date1)
         
        }
        
    })
})
//finish Task
app.put('/finishTask/:request_id',(req,res)=>{
    const taskid=req.params.request_id
    const standardid=req.body.standardid
    const now=new Date()
    const Date1 = date.format(now,'DD/MM/YYYY HH:mm:ss');
    console.log(Date1)
    //const Date1=new Date().getTime()
    const standard='insert into requestwithstandard(requestid,standardid) values(?,?)'
    const assigntaks='update request set status="finished",finishedDate=? where request_id=?'
    Connection.query(assigntaks,[now,taskid],(err,result)=>{
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
/* app.get('/GetNewTasks',(req,res)=>{
    const gettask='select r.request_id,o.office_name,(select user_fullname from users u where u.username=r.requesterusername ) as fullname,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc,Date from request r,office o  where status="New" and r.office_id=o.office_id'
    Connection.query(gettask,(err,result)=>{
        res.send(result)
    })
}) */
//Progress 
 app.get('/GetProgressTask/:workerusername',(req,res)=>{
     const workerusername=req.params.workerusername
     const progreassTask='select r.status, r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%Y %h:%m:%s") as Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%Y %h:%m:%s") as assignedDate from request r,users u  where r.status="work on progress " and u.username=r.requesterusername and workerusername=?'
     Connection.query(progreassTask,[workerusername],(err,result)=>{
         if(err){
             res.send(err)
         }else{
            res.send(result)
         }
        
     })
 })
//For Requester
 app.get('/GetRequestedTasks/:requesterusername',(req,res)=>{
    const requesterusername=req.params.requesterusername
    const progreassTask='select r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") as assignedDate,DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s")finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  and r.requesterusername=? and r.status ="finished" and satisfaction is null'
    Connection.query(progreassTask,[requesterusername],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
        
    })
})
//Finished Tasks With Satisfaction 
app.get('/FinishedTasksWithSatisfaction/:requesterusername',(req,res)=>{
    const requesterusername=req.params.requesterusername
    const progreassTask='select r.comment, r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") as assignedDate,DATE_FORMAT(r.finishedDate,"%d/%m/%y %h:%m:%s") as finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  and r.requesterusername=? and r.status ="finished" and satisfaction is not null'
    Connection.query(progreassTask,[requesterusername],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
        
    })
})
//Progress Tasks for Requester
app.get('/ProgressTasksForRequester/:requesterusername',(req,res)=>{
    const requesterusername=req.params.requesterusername
    const progreassTask='select count(*) "ProgressTask", r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc ,DATE_FORMAT(r.assignedDate,"%d/%m/%y %h:%m:%s") assignedDate,r.finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  and r.requesterusername=? and r.status ="Work On Progress"'
    Connection.query(progreassTask,[requesterusername],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
        
    })
})
//New Request For Requester
app.get('/NewRequestsForRequester/:requesterusername',(req,res)=>{
    const requesterusername=req.params.requesterusername
    const progreassTask='select r.request_id,r.status ,'+
    'DATE_FORMAT(r.Date,"%d/%m/%y %h:%m:%s") as Date,r.request_type,r.problem_desc '+
    'from  request r,users u where  r.requesterusername=u.username  and r.requesterusername=?'+ 
    'and r.status ="New"'
    Connection.query(progreassTask,[requesterusername],(err,result)=>{
        if(err){
            res.send({Message:"error"})
        }else{
            res.send(result)
        }
        
    })
})
//Send Satisfaction 
app.put('/SendSatsfaction/:requestid',(req,res)=>{
    const taskid=req.params.requestid
    const satisfaction=req.body.satisfaction
    const comment=req.body.comment
    const satquery='update request set satisfaction=? ,comment=? where request_id=?'
    Connection.query(satquery,[satisfaction,comment,taskid],(err,result)=>{
        if(err){
            res.send({Message:'error'})
            console.log(err)
        
        } if(result){
            res.send({Message:"success"})
            console.log(result)
            
        }
        
    })
})
//Get progress task by user
 app.get('/GetProgressTaskbyUser/:username',(req,res)=>{
    const progreassTask='select * from request where  status="OnProgress"'
    Connection.query(progreassTask,(err,result)=>{
        res.send(result)
    })
})

 //  Solution Offered Tasks  by user

 app.get('/finishedTasksbyUser/:workerusername',(req,res)=>{
    const workerusername=req.params.workerusername
    const progreassTask='select r.comment,r.status,r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,DATE_FORMAT(r.Date,"%d/%m/%Y %h:%m:%s") as Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc,DATE_FORMAT(r.assignedDate,"%d/%m/%Y %h:%m:%s") as assignedDate,DATE_FORMAT(r.finishedDate,"%d/%m/%Y %h:%m:%s") as finishedDate ,r.satisfaction from request r,users u  where r.status="finished" and u.username=r.requesterusername and workerusername=?'
    Connection.query(progreassTask,[workerusername,workerusername],(err,result)=>{
        if(err){
            res.send(err)
          
        }else{
            res.send(result)
        }
      
    })
})
app.get('/performance/:startDate/:endDate',(req,res)=>{
    const startDate=req.params.startDate
    const endDate=req.params.endDate
    const performance =  'select u.user_fullname,'+
                         '(select count(*) as count from request r  where r.workerusername=u.username and r.status="finished")"Finished",'+ 
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress") "Assigned",'+
                          '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Computer" ) "ComputerProgress",'+ 
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Computer" ) "ComputerFinished",'+
                        '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Printer" ) "PrinterProgress",'+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Printer" ) "PrinterFinished" ,'+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Photocopy" ) "PhotoCopyFinished",'+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Photocopy" ) "PhotoCopyProgress", '+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Network" ) "NetworkProgress",'+
                        '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Network" ) "NetworkFinished",'+  
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Software" ) "SoftwareFinished",'+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Software" ) "SoftwareProgress",'+
                         '(select count(*) from request r where r.workerusername=u.username and r.status ="Work On Progress" AND r.request_type="Others" ) "OtherProgress",(select count(*)'+
                        ' from request r where r.workerusername=u.username and r.status ="finished" AND r.request_type="Others" ) "OtherFinished"  from users u ,request r WHERE u.username=r.workerusername and DATE_FORMAT(r.assignedDate,"%d-%m-%y") between ? and  ? group  by u.username '
    Connection.query(performance,[startDate,endDate],(err,result)=>{
        res.send(result)
    })
})

//standard
app.post('/AddStandard',(req,res)=>{
    const service=req.body.service
    const measurement=req.body.measurement
    const time=req.body.time
    const price=req.body.price
    const standard='insert into standard (service,measurement,time,price) values(?,?,?,?)'
    Connection.query(standard,[service,measurement,time,price],(err,result)=>{
        if(err){
            res.send({Message:'error'})
            console.log(err)
        }if(result){
            res.send({Message:'success'})
        }
      
    })
})
//It Standard form
app.post('/ItStandardForm/:requestid',(req,res)=>{
    const standardid=req.body.standardid
    const requestid=req.params.requestid
    const itsatndardq="insert into requestwithstandard(requestid,standardid) values(?,?)"
    Connection.query(itsatndardq,[requestid,standardid],(err,result)=>{
        if(err){
            res.send({Message:"error"})
            console.log(err)
        }if(result){
            res.send({Message:"success"})
        }
    })
})
//select All Standard
app.get('/GetAllStandard',(req,res)=>{
    const standardq="select * from Standard"
    Connection.query(standardq,(err,result)=>{
        res.send(result)
    })
})
//Update standard
app.put('/UpdateStandard/:standardid',(req,res)=>{
    const standardid=req.params.standardid
    const service=req.body.service
    const measurement=req.body.measurement
    const time=req.body.time
    const price=req.body.price
    const standardq="update standard set service=? ,measurement=? ,time=?,price=? where standardid=?"
    Connection.query(standardq,[service,measurement,time,price],(err,result)=>{
        res.send(result)
    })
})
//Getfor Standard for Update
app.get('/GetStandardForUpdate/:Standardid',(req,res)=>{
    const standardid=req.params.Standardid
    const standardq="select * from Standard where standardid=?"
    Connection.query(standardq,[standardid],(err,result)=>{
        res.send(result)
    })
})
//user Standard 
app.get('/UserStandard/:username/:startDate/:endDate',(req,res)=>{
    const user=req.params.username
    const startDate=req.params.startDate
    const endDate=req.params.endDate
    const userstandq1='select s.service,s.measurement,s.time,'+
       '(case when DATEDIFF(r.finishedDate,r.assignedDate) < s.time then COUNT(*) END) belowStandard,'+
        '(case  when DATEDIFF(r.finishedDate,r.assignedDate) = s.time then COUNT(*) END) WithinStandard,'+
        '(case when DATEDIFF(r.finishedDate,r.assignedDate) > s.time then COUNT(*) END) AboveStandard, '+
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
        console.log(err)
    
    })
})
//Annoncement
app.post('/AddAnnounce',(req,res)=>{
    const anounceName=req.body.anounceName
    const status="New"
    const anounceq='insert into announcement (anounceName,status) values(?,?)'
    Connection.query(anounceq,[anounceName,status],(err,result)=>{
        if(err){
            res.send({Message:'error'})
            console.log(err)
        }else{
            res.send({Message:'success'})
        }
    })

})
//Display Announcement
app.get('/DisplayAnnounce',(req,res)=>{
    const announce='select anouncid,anounceName,DATE_FORMAT(anounceDate,"%d-%m-%y") anounceDate ,status from announcement'
    Connection.query(announce,(err,result)=>{
        res.send(result)
    })
})
app.get('/DisplayAnnounceForEmployee',(req,res)=>{
    const announce='select anouncid,anounceName,DATE_FORMAT(anounceDate,"%d-%m-%y") anounceDate ,status from announcement where status="Finish"'
    Connection.query(announce,(err,result)=>{
        res.send(result)
    })
})
app.delete('/DeleteAnnounce/:anouncid',(req,res)=>{
    const anouncid=req.params.anouncid
    const announceD='Delete  from announcement where anouncid=?'
    Connection.query(announceD,[anouncid],(err,result)=>{
        if(err){
            res.send({Message:'|Derror'})
            console.log(err)
        }if(result){
            res.send({Message:"Dsuccess"})
        }
    })
})
app.put('/EndAnnounce/:anouncid',(req,res)=>{
    const anouncid=req.params.anouncid
    const announceD='update announcement set status="Finish" where anouncid=?'
    Connection.query(announceD,[anouncid],(err,result)=>{
        if(err){
            res.send({Message:'Eerror'})
        }if(result){
            res.send({Message:"Esuccess"})

        }
    })
})
