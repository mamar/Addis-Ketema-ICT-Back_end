var express = require('express');
const router=express.Router()
const mysql=require('mysql');
var Connection=mysql.createConnection({
    host:"209.209.40.88", 
    user:"root",
    password:"0949050454",
    database:"ict",
    port:19073
})
Connection.connect(function(err) {
    
    if (err) throw err

    console.log('You are now connected...')
  })
  module.exports=Connection