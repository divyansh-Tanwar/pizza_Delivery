const homeController=require("../app/http/controllers/homeController");
const authController=require("../app/http/controllers/authContoller");
const cartController=require("../app/http/controllers/customers/cartController");
//homeController is a function which returns object 
function initRoutes(app)
{
    app.get("/",homeController().index)  //the get request sends req,res to second parameter so the index function defined in homeContoller will automatically get parameter req,res

    app.get("/cart",cartController().cart)
    
    app.get("/login",authController().login)
    
    app.get("/register",authController().register)
    
}

module.exports=initRoutes;