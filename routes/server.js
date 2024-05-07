const express= require("express");
const app= express();
const PORT=process.env.PORT||3000;
//step1:require ejs 
const ejs=require('ejs')
const expressJsLayout=require('express-ejs-layouts')
// step2:setting template engine
app.use(expressJsLayout);


//handeling requests
app.get("/",function(req,res){
    res.send("Hello from server");
})

app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})