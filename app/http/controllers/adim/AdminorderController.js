const order = require("../../../models/order");
function AdminorderContoller() {
  return {

    async index(req, res) {
        try {
            // Query the orders collection for orders that are not complete
            const orders = await order
                .find({ status: { $ne: 'complete' } })
                // Populate the CustomerId field, excluding the password
                .populate('CustomerId', '-password')
                // Sort the results by the updatedAt field in descending order
                .sort({ updatedAt: -1 });
    
            // If the request is an Ajax request, return JSON
            if (req.xhr) {
                return res.json(orders);
            } else {
                // Otherwise, render the view
                return res.render('Admin/order');
            }
        } catch (err) {
            // Send a 500 status code and the error message if an error occurs
            res.status(500).send(err);
        }
    },
    
  };
}

module.exports = AdminorderContoller;
