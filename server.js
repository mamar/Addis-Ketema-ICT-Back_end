const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors');
const etdate = require('ethiopic-date');
const date=require('date-and-time')
const format = require('date-format');
const office=require('./Office')
const standard=require('./Standard')
const  Users=require('./Users')
const Request=require('./Request')
const Announce=require('./Announce')

//create app server
var server = app.listen(  8080  ,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
    const now=etdate.now()
    console.log(now)
    console.log(format.asString('dd/mm/yyyy hh:mm:ss', new Date()));
    const now1=new Date()    
    const Date1 = date.format(now1,'YYYY-MM-DD HH:mm:ss');
    console.log(Date1)
  
  });
//start body-parser configuration
app.use( express.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors({
    origin:["http://www.erp.com:300","http://erp.com:500","http://localhost:3000"],
    methods:["Get","Post","DELETE","PUT","put","PATCH","patch"],
    credentials:true
}));
app.use('/Office',office)
app.use('/Standard',standard)
app.use('/user',Users)
app.use('/Request',Request)
app.use('/Announce',Announce)

