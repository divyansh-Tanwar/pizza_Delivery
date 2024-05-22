const express= require("express");
const app= express();
const path=require('path');
const expressLayout=require("express-ejs-layouts");
const PORT=process.env.PORT||3000;
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