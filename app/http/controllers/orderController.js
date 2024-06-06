
const Order=require("../../models/order");
function orderContoller()
{
    return {

        store(req,res)
        {
            // console.log(req.body);
            const {Phone_Number,Address}=req.body;
            if(!Phone_Number||!Address)
            {
               req.flash('error','All fields are required')
               return res.redirect('/cart')
            }

            const order=new Order({
                CustomerId:req.user._id,
                items:req.session.cart.item,
                phone:Phone_Number,
                address:Address
            });

            order.save().then(result=>{
                req.flash('success','Order Placed Successfully');
                delete req.session.cart  //once order is placed cart items will be deleted
                return  res.redirect("/customer/orders");
            }).catch((err)=>{
                req.flash('error','Something Went wrong')
                return  res.redirect("/cart");
            })
        },

        async index(req,res)
        {
            const orders = await Order.find({ CustomerId: req.user._id }, null, { sort: { updatedAt: -1 } });
            console.log(orders);
            res.render("customers/orders.ejs",{orders:orders})
        }
    }
}

module.exports=orderContoller;