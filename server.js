const express= require("express");
const app= express();
const path=require('path');
const PORT=process.env.PORT||3000;
//telling express about static folder fro mwhere it has to pick css/js files
app.use(express.static('public'));
const ejs=require('ejs')
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


//handeling requests
app.get("/",function(req,res){
    res.render('home');
})


//port on which website will be hosted
app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})