function cartController()
{
    return {
        cart(req,res)
        {
            res.render("customers/cart");
        },

        update(req,res)
        {  
            console.log("yaha hu");
           return res.json({data:'All ok'});
        }
    }
}

module.exports=cartController;