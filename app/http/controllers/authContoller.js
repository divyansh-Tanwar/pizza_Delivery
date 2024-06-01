const User=require("../../models/User");
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

        postRegister(req,res)
        {
            const {name,Username,password}=req.body;
            //data validation
            if(!name||!Username||!password)
            {   
                req.flash('error','All fields are required')//for the notification 
                req.flash('name',name)
                req.flash('Username',Username)

                return res.redirect("/register");
            }
            console.log(req.body);
        }

    }
}

module.exports=authController;