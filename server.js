const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors');
//const etdate = require('ethiopic-date');
//const date=require('date-and-time')
//const format = require('date-format');
const office=require('./Office')
const standard=require('./Standard')
const  Users=require('./Users')
const Request=require('./Request')
const Announce=require('./Announce')
//heroku
const cool = require('cool-ascii-faces');
const path = require('path');
const PORT = process.env.PORT || 5000;



//create app server
/* var server = app.listen( PORT  ,function () {

   // var host = server.address().address
    var port = server.address().port
    console.log("Example app listening a" , port)
 */

  
   // console.log("Example app listening at http://%s:%s", host, port)
    //const now=etdate.now()
    //console.log(now)
   /*  console.log(format.asString('dd/mm/yyyy hh:mm:ss', new Date()));
    const now1=new Date()    
    const Date1 = date.format(now1,'YYYY-MM-DD HH:mm:ss');
    console.log(Date1) */
  
  //});
  express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('./server.js'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//start body-parser configuration
app.use( express.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors({
    origin:["https://addis-erpp-backend.herokuapp.com","https://addis-erp.herokuapp.com"],
    methods:["Get","Post","DELETE","PUT","put","PATCH","patch"],
    credentials:true
}));
app.use('/Office',office)
app.use('/Standard',standard)
app.use('/user',Users)
app.use('/Request',Request)
app.use('/Announce',Announce)

