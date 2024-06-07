const homeController=require("../app/http/controllers/homeController");
const authController=require("../app/http/controllers/authContoller");
const cartController=require("../app/http/controllers/customers/cartController");
const guest=require("../app/http/middleware/guest");
const orderContoller=require("../app/http/controllers/orderController");
const auth=require("../app/http/middleware/auth");
const AdminorderContoller=require("../app/http/controllers/adim/AdminorderController")
const admin_auth=require("../app/http/middleware/admin")
const status_controller=require("../app/http/controllers/adim/statusController")
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

    app.post("/orders",auth,orderContoller().store)

    //customers routes:
    app.get("/customer/orders",auth,orderContoller().index)
    app.get("/customer/orders/:id",auth,orderContoller().show)

    //admin routes
    app.get("/admin/orders",admin_auth,AdminorderContoller().index)

    //status of orders
    app.post("/admin/orders/status",admin_auth,status_controller().update)

    
}

module.exports=initRoutes;