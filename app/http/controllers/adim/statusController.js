
const Order=require("../../../models/order")
function statusController(){
   
    return {
        
        // update(req,res)
        // {
        //     Order.updateOne({_id:req.order._id},{status:req.body.status}).then((res)=>{
                
        //         return res.redirect("/admin/orders");
        //     }).catch((err)=>{
        //         console.log(err);
        //         return res.redirect("/admin/orders");
        //     })
        // }

        async update(req, res) {

            console.log("update");
            console.log(req.body.orderId);
            try {
                await Order.updateOne({_id: req.body.orderId }, { status: req.body.status });
                return res.redirect("/admin/orders");
            } catch (err) {
                console.log(err);
                return res.redirect("/admin/orders");
            }
        }
        

    }
}

module.exports=statusController;