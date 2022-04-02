var express = require('express');
const router=express.Router()
const Connection=require('./Database')
//CReate office
router.post('/AddOffice',(req,res)=>{
    const office_name=req.body.office_name
    const floor_no=req.body.floor_no
    const phone=req.body.phone
    const insertoffice='insert into office(office_name,floor_no,phone) values (?,?,?)'
    
    Connection.query(insertoffice,[office_name,floor_no,phone],(err,result)=>{
        res.send(result);       
       
    })
})
//Get All office 
router.get('/GetOffice',(req,res)=>{
    const selectoffie='select * from office'
    Connection.query(selectoffie,(err,result)=>{
        if(err){ throw err}
        if(result){
          res.send(result)

        }
       
    })
})
//Get office by id
router.get('/getOfficebyId/:office_id',(req,res)=>{
    
   const office_id=req.params.office_id
   const office_name=req.body.office_name
   const floor_no=req.body.floor_no
    const updateOffice='update office set office_name=? and floor_no=? and phone=? where office_id=?'
  Connection.query(updateOffice,[office_name,floor_no,office_id],(err,result)=>{
      res.send(result)
  })

})
  //Update Office

router.put('/updateOffice/:office_id',(req,res)=>{
    const office_id=req.params.office_id
    const office_name=req.body.office_name
    const floor_no=req.body.floor_no
    const phone=req.body.phone
    const updateOffice='update office set office_name=? , floor_no=? , phone =? where office_id=?'
    Connection.query(updateOffice,[office_name,floor_no,phone,office_id],(err,result)=>{
        if(err){
            res.send({Message:'error'})
        }if(result){
            res.send({Message:'success'})
        }       
    })
})
//Delete Office
router.delete('/DeleteOffice/:office_id',(req,res)=>{
    const office_id=req.params.office_id
    const deleteOffice='Delete  from office where office_id=?'
    
    Connection.query(deleteOffice,office_id,(err,result)=>{
        if(err){
            res.send({Message:"error"})
        }if(result){
          res.send({Message:'success'})
        }
        
    })
})

module.exports=router
