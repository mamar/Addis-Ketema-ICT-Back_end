var express = require('express');
const router=express.Router()
const mysql=require('mysql');
var Connection=mysql.createPool({
    host:"localhost", 
    user:"root",
    password:"",
    database:"ict"
})
Connection.getConnection(function(err) {
    
    if (err) throw err

    console.log('You are now connected...')
  })
  module.exports=Connection