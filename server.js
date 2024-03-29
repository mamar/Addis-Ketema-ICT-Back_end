const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors');
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

//const etdate = require('ethiopic-date');
//const date=require('date-and-time')
const format = require('date-format');
const office=require('./Office')
const standard=require('./Standard')
const  Users=require('./Users')
const Request=require('./Request')
const Announce=require('./Announce')

app.set('trust proxy', 1);
//session 
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}))

//create app server
var server = app.listen( process.env.port || 5000, '127.0.0.1',function () {

   var host = server.address().address
    var port = server.address().port
    console.log('Example app listening a on http://%%:%%' ,host, port)
  
   // console.log("Example app listening at http://%s:%s", host, port)
    //const now=etdate.now()
    //console.log(now)
   /*  console.log(format.asString('dd/mm/yyyy hh:mm:ss', new Date()));
    const now1=new Date()    
    const Date1 = date.format(now1,'YYYY-MM-DD HH:mm:ss');
    console.log(Date1) */
  
  });
//start body-parser configuration
app.use( express.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors({
    origin:["https://addis-erpp-backend.herokuapp.com","https://addis-erp.herokuapp.com","http://addiserp.com:400","http://localhost:3000"],
    methods:["Get","Post","DELETE","PUT","put","PATCH","patch"],
    credentials:true
}));
app.use('/Office',office)
app.use('/Standard',standard)
app.use('/user',Users)
app.use('/Request',Request)
app.use('/Announce',Announce)

