
const Order = require("../../models/order");
const stripe = require("stripe")(process.env.stripePrivateKey);
function orderContoller() {
  return {
    store(req, res) {
      // console.log(req.body);
      const { Phone_Number, Address, stripeToken, paymentType } = req.body;
      if (!Phone_Number || !Address) {
        return res.status(422).json({ error: "Something went wrong" });
      }

      const order = new Order({
        CustomerId: req.user._id,
        items: req.session.cart.item,
        phone: Phone_Number,
        address: Address,
      });

      order
        .save()
        .then(async (result) => {

          const placedOrder = await Order.populate(result, {
            path: "CustomerId",
          });

          // step4:stripe payment(sending request from server to stripe)
          if (paymentType === "card")
             {
                        stripe.charges
                        .create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: "inr",
                            description: `pizza Order:${placedOrder._id}`,
                        })
                        .then(() => {
                             placedOrder.paymentStatus = true;
                             placedOrder.paymentType=paymentType;
                            placedOrder
                            .save()
                            .then((ord) => {
                                console.log(ord);

                                const eventEmitter = req.app.get("eventEmitter");
                                eventEmitter.emit("orderPlaced", ord);

                                delete req.session.cart;

                                return res.json({ message: "Order Placed Successfully" });
                            })
                            .catch((err) => {
                                console.log(err);
                                return res.json({ message: "" });
                            });
                        })
                        .catch((err) => {
                             
                            delete req.session.cart;
                            return res.json({ message: "(payment failed)Some problem Occured during payment u can pay at delivery time" });
                        });
          }
          
          if(paymentType === "COD")
          {
             // Emit an event to notify that an order has been placed
                    const eventEmitter = req.app.get("eventEmitter");
                    eventEmitter.emit("orderPlaced", placedOrder);

                    // Clear the cart from the session
                    delete req.session.cart;

                    // Redirect the customer to the orders page
                    return res.json({ message: "Order Placed Successfully" });
          }
         
        })
        .catch((err) => {
          return res.json({ message: "Something went wrong" });
        });
    },

    async index(req, res) {
      const orders = await Order.find({ CustomerId: req.user._id }, null, {
        sort: { updatedAt: -1 },
      });
      console.log(orders);
      res.header(
        "Cache-Control",
        "no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0"
      );
      res.render("customers/orders.ejs", { orders: orders });
    },

    async show(req, res) {
      const order = await Order.findById(req.params.id);

      //  console.log(req.user._id);
      //  console.log(order.customerId);

      if (req.user._id.toString() === order.CustomerId.toString()) {
        res.render("customers/singleOrder.ejs", { order: order });
      } else {
        res.redirect("/");
      }
    },
  };
}

module.exports = orderContoller;
