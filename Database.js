var express = require('express');
const router=express.Router()
const mysql=require('mysql');
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
  module.exports=Connection