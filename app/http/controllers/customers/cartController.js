const session = require("express-session");

function cartController()
{
    return {
        cart(req,res)
        {
            res.render("customers/cart");
        },

        update(req,res)
        {  

            //look of cart object in session
            // let cart={
            //     item:{
            //         pizzaId:{item:pizzaobject,qty:0}
            //     },
            //     totalqty:0,
            //     totalprice:0
            // }

            //if session cointain no cart then add one(means no previous order is made)
            if(!req.session.cart)
            {
                req.session.cart={
                    item:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
           
                let cart =req.session.cart;
                 console.log(req.body);  //getting access to pizza data user has clicked
                
                //if item not present in cart then add it
                if(!cart.item[req.body._id])
                {
                     cart.item[req.body._id]={
                        item:req.body,
                        Qty:1
                     }

                     cart.totalQty=cart.totalQty+1;
                     cart.totalPrice=cart.totalPrice+req.body.price;
                }
                else
                {
                      cart.item[req.body._id].Qty=cart.item[req.body._id].Qty+1;
                      cart.totalQty=cart.totalQty+1;
                      cart.totalPrice=cart.totalPrice+req.body.price;
                }
                
           return res.json({totalQty:req.session.cart.totalQty,totalprice:req.session.cart.totalPrice});
        }
    }
}

module.exports=cartController;