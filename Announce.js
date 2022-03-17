var express = require('express');
const router=express.Router()
const mysql=require('mysql');
const Connection=require('./Database')

router.post('/AddAnnounce',(req,res)=>{
    const anounceName=req.body.anounceName
    const status="New"
    const anounceq='insert into announcement (anounceName,status) values(?,?)'
    Connection.query(anounceq,[anounceName,status],(err,result)=>{
        if(err){
            res.send({Message:'error'})
           
        }else{
            res.send({Message:'success'})
        }
    })

})
//Display Announcement
router.get('/DisplayAnnounce',(req,res)=>{
    const announce='select anouncid,anounceName,DATE_FORMAT(anounceDate,"%d-%m-%y") anounceDate ,status from announcement'
    Connection.query(announce,(err,result)=>{
        res.send(result)
    })
})
router.get('/DisplayAnnounceForEmployee',(req,res)=>{
    const announce='select anouncid,anounceName,DATE_FORMAT(anounceDate,"%d-%m-%y") anounceDate ,status from announcement where status="Finish"'
    Connection.query(announce,(err,result)=>{
        res.send(result)
    })
})
router.delete('/DeleteAnnounce/:anouncid',(req,res)=>{
    const anouncid=req.params.anouncid
    const announceD='Delete  from announcement where anouncid=?'
    Connection.query(announceD,[anouncid],(err,result)=>{
        if(err){
            res.send({Message:'|Derror'})
           
        }if(result){
            res.send({Message:"Dsuccess"})
        }
    })
})
router.put('/EndAnnounce/:anouncid',(req,res)=>{
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
module.exports=router