var express = require('express');
const router=express.Router()
const mysql=require('mysql');
var Connection=mysql.createPool({
    host:"remotemysql.com", 
    port:"3306",
    user:"V8C3p0QyK2",
    password:"1DP4vbkGZC",
    database:"V8C3p0QyK2"
})
Connection.getConnection(function(err) {
    
    if (err) throw err

    console.log('You are now connected...')
  })
  module.exports=Connection