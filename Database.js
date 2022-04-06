var express = require('express');
const router=express.Router()
const mysql=require('mysql');
var Connection=mysql.createConnection({
    host:"localhost", 
    port:"3306",
    user:"V8C3p0QyK2",
    password:"1DP4vbkGZC",
    database:"V8C3p0QyK2"
})
Connection.connect(function(err) {
    
    if (err) throw err

    console.log('You are now connected...')
  })
  module.exports=Connection