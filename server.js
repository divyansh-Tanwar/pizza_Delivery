require('dotenv').config();
// console.log(process.env)
const express= require("express");
const app= express();
const path=require('path');
const expressLayout=require("express-ejs-layouts");
const PORT=process.env.PORT||3000;
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash')
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

 //setting up flash middleware
 app.use(flash());


//telling express about static folder fro mwhere it has to pick css/js files
app.use(express.static('public'));
const ejs=require('ejs')
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.use(expressLayout);

 //calling function
 require("./routes/web")(app)



//port on which website will be hosted
app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})