function authController(){
    return {

        login(req,res)
        {
            res.render("Auth/Login");
        },

        register(req,res)
        {
            res.render("Auth/register");
        }

    }
}

module.exports=authController;