var express = require('express');
const router=express.Router()
const bcrypt=require('bcryptjs');
//const bcrypt1=require('bcrypt-nodejs');
const saltRound=10
const cookieParser=require('cookie-parser')
const session=require('express-session')
const Connection=require('./Database')


  router.use(cookieParser())
  //-momery unleaked---------
 app.set('trust proxy', 1);
  router.use(session({
      key: 'userid',
      secret:'mamar',
      resave:false,
      saveUninitialized:false,
      cookie:{
          express:60*60*24
      }
  
  }))

router.post('/Login',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const loginuser='select username,user_fullname,ROLES,password from users where username=? and status="unblock";'
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
router.put('/blockuser/:userid',(req,res)=>{
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
router.put('/unblockuser/:userid',(req,res)=>{
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
router.get('/logout',(req,res) => {
    res.clearCookie(cookieName)
    req.session.destroy();
    res.redirect('/login');
});
//post Users
router.post('/Register',(req,res,next)=>{
    const username=req.body.username
    const password=req.body.password
    const ROLES=req.body.ROLES
    const user_fullname=req.body.user_fullname
    const age=req.body.age
    const gender=req.body.Gender
    const position=req.body.Position
    const phone=req.body.Phone
    const office_id=req.body.office_id
    const division=req.body.division
    const floor_no=req.body.floor_no
    const office_no=req.body.office_no
    const status="unblock"
    const usercheck='select username from users where username=?'
    const Adduser='insert into users(office_id,username,ROLES,password,user_fullname,'+
        'age,Gender,division,floor_no,office_no,Position,Phone,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'

    Connection.query(usercheck,[username],(err,result)=>{
        if(result.length >=1){
            res.send({Message:"Username allready exist"})
        }if(err){
            res.send({Message:"error"})
        }
        else{
            bcrypt.hash(password,saltRound,(err,hash)=>{
                if(err){
                    res.send({Message:"error"})
                   
                }
                Connection.query(Adduser,[office_id,username,ROLES,hash,user_fullname,age,gender,division,floor_no,office_no,position,phone,status],(err,result)=>{
                    if(result){
                        res.send({Message:"sucess"})
                     
        
                    }if(err){
                        res.send({Message:"error"})
                    }
                    
                    
                })
        
            })
        }
    })
    
   
   
})
//Get All users
router.get('/Getusers',(req,res)=>{
    const getuser='select u.userid,u.status,u.division,u.floor_no,u.office_no, o.office_name ,u.username,u.ROLES,u.user_fullname,u.Age,u.Gender,u.Position,u.Phone,u.Date from users u,office o  where u.office_id=o.office_id order by Date desc'
    Connection.query(getuser,(err,result)=>{
        if(err){
            res.send("error")
        } if(result){
            res.send(result)
        }
        
    })
})
//Get users by usernameGetuserbyusername
router.get('/Getuserbyusername/:username',(req,res)=>{
    const username=req.params.username
    const getuserbyid='select * from users where username=?'
    Connection.query(getuserbyid,[username],(err,result)=>{
        if(err){
            res.send({Message:'error'})
        } else{
            res.send(result)
        }
      
    })

})
// Get users by userid
router.get('/Getuserbyid/:userid',(req,res)=>{
    const userid=req.params.userid
    const getuserbyid='select * from users where userid=?'
    Connection.query(getuserbyid,[userid],(err,result)=>{
        if(err){
            res.send({Message:'error'})
        } else{
            res.send(result)
        }
      
    })

})

//update users by userid
router.patch('/Updateusersbyid/:userid',(req,res)=>{
    const userid=req.params.userid
    const phone=req.body.Phone
  const office_id=req.body.office_id
    const position=req.body.Position
    const userfullname=req.body.user_fullname
    const gender=req.body.Gender
    const ROLES=req.body.ROLES
    const division=req.body.division
    const floor_no=req.body.floor_no
    const office_no=req.body.office_no
    const updateuser='update users set office_id=?,ROLES=? ,user_fullname=? ,Gender=?,division=?,floor_no=?,office_no=?, Phone=? ,Position=? where userid=?'
    
        Connection.query(updateuser,[office_id,ROLES,userfullname,gender,division,floor_no,office_no,phone,position,userid],(err,result)=>{
            if(result){
                res.send({Message:'Success'})

            }else{
                res.send({Message:"Error"})
            }
            
            
        })

    })
//update users
router.patch('/Updateusers/:username',(req,res)=>{
    const username=req.params.username
    const phone=req.body.Phone
  const offic_id=req.body.office_id
    const position=req.body.Position
    const userfullname=req.body.user_fullname
    const division=req.body.division
    const floor_no=req.body.floor_no
    const office_no=req.body.office_no
    const updateuser='update users set  user_fullname=?,division=?,floor_no=?,office_no=? , Phone=? ,Position=? where username=?'
    Connection.query(updateuser,[userfullname,division,floor_no,office_no,phone,position,username],(err,result)=>{
        if(err){
            res.send({Message:'Error'})
    
        }if(result){
            res.send({Message:"Success"})
        }

    })
})
//Delete users 
router.delete('/Deleteusers/:userid',(req,res)=>{
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
// Display Users Roles IT
router.get('/GetuserIT/',(req,res)=>{
    const getuserbyid='select * from users where ROLES="IT"'
    Connection.query(getuserbyid,(err,result)=>{
        if(err){
            res.send({Message:'error'})
        } else{
            res.send(result)
        }
      
    })

})
  module.exports=router
