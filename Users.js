var express = require('express');
const router=express.Router()
const bcrypt=require('bcrypt');
const saltRound=10
const cookieParser=require('cookie-parser')
const session=require('express-session')
const Connection=require('./Database')


  router.use(cookieParser())
  router.use(session({
      key: 'userid',
      secret:'mamar',
      resave:false,
      saveUninitialized:false,
      cookie:{
          express:60*60*24
      }
  
  }))


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
router.get('/isuserauth',verifyJWT,(req,res)=>{
    res.send("You are authonticated")
}) 
router.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedin:true,user:req.session.user})
    }else{
        res.send({loggedin:false,message:"authontication failed"})
    }
})
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
router.post('/Register',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const ROLES=req.body.ROLES
    const user_fullname=req.body.user_fullname
    const age=req.body.age
    const gender=req.body.Gender
    const position=req.body.Position
    const phone=req.body.Phone
    const office_id=req.body.office_id
    const status="unblock"
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
                Connection.query(Adduser,[office_id,username,ROLES,hash,user_fullname,age,gender,position,phone,status],(err,result)=>{
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
router.get('/Getusers',(req,res)=>{
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
router.get('/Getuserbyusername',(req,res)=>{
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
router.patch('/Updateusers/:username',(req,res)=>{
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
  module.exports=router
