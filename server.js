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


 
//create app server
var server = app.listen(8080,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
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
    const date3=new Date()
    const phone=req.body.Phone
    const office_id=req.body.office_id
    const usercheck='select username from users where username=?'
    const Adduser='insert into users(office_id,username,ROLES,password,user_fullname,age,Gender,Position,Phone,Date) values(?,?,?,?,?,?,?,?,?,?)'

    Connection.query(usercheck,[username],(err,result)=>{
        if(result.length >= 1){
            res.send({Message:"Username allready exist"})
        }else{
            bcrypt.hash(password,saltRound,(err,hash)=>{
                if(err){
                    res.send({err:"Server Error"})
                }
                Connection.query(Adduser,[office_id,username,ROLES,hash,user_fullname,age,gender,position,phone,date3],(err,result)=>{
                    if(result){
                        res.send(result)
        
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
    const getuser='select u.userid, o.office_name ,u.username,u.ROLES,u.user_fullname,u.age,u.Gender,u.Position,u.Phone,u.Date from users u,office o  where u.office_id=o.office_id'
    Connection.query(getuser,(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
//Get users by id
app.get('/Getuserbyusername',(req,res)=>{
    const userid=req.body.params
    const user=  req.session.user[0].username
    const getuserbyid='select * from users where username=?'
    Connection.query(getuserbyid,[user],(err,result)=>{
        if(err) throw err
        res.send(result)
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
            
        }
        res.send("User Deleted Succesfully")
    })
})
  //CReate office
  app.post('/AddOffice',(req,res)=>{
      const office_name=req.body.office_name
      const floor_no=req.body.floor_no
      const phone=req.body.phone
      const Date2=new Date()
      const insertoffice='insert into office(office_name,floor_no,phone,Date) values (?,?,?,?)'
      
      Connection.query(insertoffice,[office_name,floor_no,phone,Date2],(err,result)=>{
          res.send(result);
         
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
      const Date1=new Date()
     
      const requesterusername=req.params.requesterusername
     

    const addRequest=
    'Insert into request (requesterusername,division,floor_no,office_no,phone,request_type,problem_desc,status,Date) values(?,?,?,?,?,?,?,?,?)'
    Connection.query(addRequest,[requesterusername,division,floor_no,
        office_no,phone,request_type,problem_desc,status,Date1],(err,result)=>{
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
app.get('/GetAllRequest',(req,res)=>{
    const getrequest='select * from request'
    Connection.query(getrequest,(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
//get Request by id
app.get('/GetRequestbyid/:request_id',(req,res)=>{
    const request_id=req.params.request_id
    const getreq='select * from request where request_id=?'
    Connection.query(getreq,[request_id],(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
//Delete Request by id
app.delete('/DeleteRequest/:request_id',(req,res)=>{
    const request_id=req.params.request_id
    const Deletreq='Delete from request where request_id=?'
    Connection.query(Deletreq,[request_id],(err,result)=>{
        if(err) throw err
        res.send("Request Delete Successfully")
    })
    

})
//Get new Request
app.get('/GetNewRequest',(req,res)=>{
    const getrequest='select r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,r.Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc from request r,users u  where status="New" and u.username=r.requesterusername'
    Connection.query(getrequest,(err,result)=>{
        if(err) res.send(err)
     
        res.send(result)
    })
})

//Get Work on Pregress Request
app.get('/Onprogress',(req,res)=>{
    const getrequest='select * from request where status="Work On Progress"'
    Connection.query(getrequest,(err,result)=>{
        if(err) throw err
        res.send(result)
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
    const Date1=new Date()
    const assigntaks='update request set status="Work On Progress",assignedDate=?,workerusername=? where request_id=?'
    Connection.query(assigntaks,[Date1,workerusername,taskid],(err,result)=>{
        if(err){
            res.send({Message:'Error'})
            
        } if(result){
            res.send({Message:"Success"})
         
        }
        
    })
})
//finish Task
app.put('/finishTask/:request_id',(req,res)=>{
    const taskid=req.params.request_id
    const Date1=new Date()
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
/* app.get('/GetNewTasks',(req,res)=>{
    const gettask='select r.request_id,o.office_name,(select user_fullname from users u where u.username=r.requesterusername ) as fullname,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc,Date from request r,office o  where status="New" and r.office_id=o.office_id'
    Connection.query(gettask,(err,result)=>{
        res.send(result)
    })
}) */
//Progress 
 app.get('/GetProgressTask/:workerusername',(req,res)=>{
     const workerusername=req.params.workerusername
     const progreassTask='select r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,r.Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc ,r.assignedDate from request r,users u  where status="work on progress " and u.username=r.requesterusername and workerusername=?'
     Connection.query(progreassTask,[workerusername],(err,result)=>{
         if(err){
             res.send(err)
         }
         res.send(result)
     })
 })
//For Requester
 app.get('/GetRequestedTasks/:requesterusername',(req,res)=>{
    const requesterusername=req.params.requesterusername
    const progreassTask='select r.request_id,r.status,u.user_fullname,u.Position,u.Gender,u.Phone ,r.Date,r.request_type,r.problem_desc ,r.assignedDate,r.finishedDate,r.satisfaction from  request r,users u where  r.workerusername=u.username  and r.requesterusername=? and r.status !="finished"'
    Connection.query(progreassTask,[requesterusername],(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})
//Send Satisfaction 
app.put('/SendSatsfaction/:request_id',(req,res)=>{
    const taskid=req.params.request_id
    const satisfaction=req.body.satisfaction
    const satquery='update request set satisfaction=? where request_id=?'
    Connection.query(satquery,[satisfaction,taskid],(err,result)=>{
        if(err){
            res.send({Message:'error'})
            console.log(err)
        
        } if(result){
            res.send({Message:"success"})
            
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
    const progreassTask='select r.request_id,(select o.office_name from office o where o.office_id=(select office_id from users u1 where u1.username=r.requesterusername) )as  office_name,u.user_fullname,r.Date,r.division,r.floor_no,r.office_no,r.phone,r.request_type,r.problem_desc,r.finishedDate from request r,users u  where status="finished" and u.username=r.requesterusername and workerusername=?'
    Connection.query(progreassTask,[workerusername,workerusername],(err,result)=>{
        if(err){
            res.send(err)
          
        }
        res.send(result)
    })
})
app.get('/performance',(req,res)=>{
    const performance ='select u.user_fullname,(select count(*) as count from request r  where r.workerusername=u.username and r.status="finished")"Finished",  (select count(*) from request r where r.workerusername=u.username and status ="Work On Progress") "Assigned" from users u group  by u.username'
    Connection.query(performance,(err,result)=>{
        res.send(result)
    })
})
