const homeController=require("../app/http/controllers/homeController");
const authController=require("../app/http/controllers/authContoller");
const cartController=require("../app/http/controllers/customers/cartController");
const guest=require("../app/http/middleware/guest");
//homeController is a function which returns object 
function initRoutes(app)
{
    app.get("/",homeController().index)  //the get request sends req,res to second parameter so the index function defined in homeContoller will automatically get parameter req,res

    app.get("/cart",cartController().cart)
    
    app.get("/login",guest,authController().login)
    app.post("/login",authController().postLogin)

    app.get("/register",guest,authController().register)
    app.post("/register",authController().postRegister)
    app.post("/logout",authController().postlogout)

    app.post("/update_cart",cartController().update)
    
}

module.exports=initRoutes;