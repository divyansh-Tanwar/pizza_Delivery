const homeController=require("../app/http/controllers/homeController");
//homeController is a function which returns object 
function initRoutes(app)
{
    app.get("/",homeController().index)  //the get request sends req,res to second parameter so the index function defined in homeContoller will automatically get parameter req,res

    app.get("/cart",function(req,res){
        res.render("customers/cart");
    })
    
    app.get("/login",function(req,res){
        res.render("Auth/Login");
    })
    
    app.get("/register",function(req,res){
        res.render("Auth/register");
    })
    
}

module.exports=initRoutes;