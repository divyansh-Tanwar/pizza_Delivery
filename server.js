require('dotenv').config();
// console.log(process.env)
const express= require("express");
var moment = require('moment');
const app= express();
const path=require('path');
const expressLayout=require("express-ejs-layouts");
const PORT=process.env.PORT||3000;
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash')
const passport=require('passport')
const Emitter=require('events')

//setting up emmiter
const eventEmitter=new Emitter();
app.set('eventEmitter',eventEmitter);

//if we dont use this package we have to manually delete the the session after its lifespan is over but the connect-mongo package helps
//to delete the sesssion automatically after the lifespan of session is over
const mongodb_Store=require('connect-mongo');

//setting up database connection:
mongoose.connect("mongodb://127.0.0.1:27017/pizza")
.then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("database not connected");
    console.error(err);
});


//storing session into database instead of meamory
const mongo_session_store= mongodb_Store.create({
    mongoUrl:"mongodb://127.0.0.1:27017/pizza",
   Collection:'sessions'

})



//setting up session_middleware
 app.use(session({
    secret:process.env.Secret,
    resave: false,
    store:mongo_session_store,  //defining the path where to store session by default it will store session in meamory
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 }  //lifespane of cookie(t=ms)
 }));

 //passport config
 const passport_init=require("./app/config/passport")
 passport_init(passport);
 app.use(passport.initialize())
 app.use(passport.session())


 //setting up flash middleware
 app.use(flash());
 //we have to tell express which type of data can be received
 app.use(express.urlencoded({extended:false})); //to access form data
//  When extended is false, it uses the querystring library to parse the URL-encoded data.
// When extended is true, it uses the qs library, which allows for parsing of rich objects and arrays.
app.use(express.json()); //to access session data(type json)

//global middleware (to access cookie data in ejs files)
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()

})

//telling express about static folder fro mwhere it has to pick css/js files
app.use(express.static('public'));
const ejs=require('ejs');
const { Server } = require('http');
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.use(expressLayout);

 //calling function
 require("./routes/web")(app)



//port on which website will be hosted
const server=app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})


//sockets
const io=require("socket.io")(server)

io.on('connection', (socket) => {
    
    // console.log("inside socket")
    // console.log(socket.id);
    socket.on('join',(order_id)=>{
         
        console.log(order_id)
        socket.join(order_id)
    })
  });


  eventEmitter.on('orderUpdated',(data)=>{
      
    io.to(`order_${data.id}`).emit('orderUpdated',data);
  })

  eventEmitter.on('orderPlaced',(data)=>{
      
    io.to('adminRoom').emit('orderPlaced',data);
  })
