const { error } = require("laravel-mix/src/Log");
const User=require("../../models/User");
const bcrypt=require("bcrypt");
function authController(){
    return {

        login(req,res)
        {
            res.render("Auth/Login");
        },

        register(req,res)
        {
            res.render("Auth/register");
        },

        async postRegister(req,res)
        {
            const {name,Username,password}=req.body;
              console.log(req.body);
            //data validation
            if(!name||!Username||!password)
            {   
                req.flash('error','All fields are required')//for the notification 
                req.flash('name',name)
                req.flash('Username',Username)

                return res.redirect("/register");
            }
             

            //checking if email already exist in database or not 
              if(await User.exists({Email:Username}))
              {      
                    console.log("user exists");
                    req.flash('error','User Already Exists')
                    req.flash('name',name)
                    req.flash('Username',Username)
                    return res.redirect("/register");
              }
              //hashing the passowrd
              const pass= await bcrypt.hash(password,10); 

              //creating new user
              const newUser= new User({
                name:name,
                Email:Username,
                password:pass
              });

              //if user is created successfully
              newUser.save().then((user)=>{
                 console.log('user saved successfully');
                return res.redirect("/login");

              }).catch(error=>{
                req.flash('error','Please Try again')//for the notification 
                req.flash('name',name)
                req.flash('Username',Username)
                return res.redirect("/register");
              }); 

              
          
        }

    }
}

module.exports=authController;