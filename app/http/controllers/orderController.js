
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

            order.save().then(async (result)=>{
                const placedOrder = await Order.populate(result, { path: 'CustomerId' });

                // req.flash('success', 'Order Placed Successfully');
        
                // Emit an event to notify that an order has been placed
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced', placedOrder);
        
                // Clear the cart from the session
                delete req.session.cart;
        
                // Redirect the customer to the orders page
                return res.json({message: 'Order Placed Successfully'});
                 
            }).catch((err)=>{
                // req.flash('error','Something Went wrong')
                return res.json({message: 'Something went wrong'});
                // return  res.redirect("/cart");
            })
        },

        async index(req,res)
        {
            const orders = await Order.find({ CustomerId: req.user._id }, null, { sort: { updatedAt: -1 } });
            console.log(orders);
            res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
            res.render("customers/orders.ejs",{orders:orders})
        },

         async show(req,res)
        {
             const order=await Order.findById(req.params.id);
             
            //  console.log(req.user._id);
            //  console.log(order.customerId);

             if( req.user._id.toString() === order.CustomerId.toString())
             {
                
                res.render("customers/singleOrder.ejs",{order:order});
             }
             else
             {
                res.redirect("/");
             }
        }
    }
}

module.exports=orderContoller;