const express= require("express");
const app= express();
const path=require('path');
const PORT=process.env.PORT||3000;
//step1:require ejs 
const ejs=require('ejs')
//step2:telling express from where he has to pic ejs files (setting file path )
app.set('views',path.join(__dirname,'/resources/views'));
//step3:telling express which template engine to use
app.set('view engine','ejs');


//handeling requests
app.get("/",function(req,res){
    res.render('home');
})


//port on which website will be hosted
app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})