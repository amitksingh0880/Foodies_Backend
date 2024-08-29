const express = require('express');
const { OrderModel } = require('../Models/Order.models');
const OrderRouter = express.Router();

OrderRouter.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Check if the email exists in the database
        let existingOrder = await OrderModel.findOne({ email: req.body.email });

        if (existingOrder === null) {
            // Email does not exist, create a new order
            try {
                await OrderModel.create({
                    email: req.body.email,
                    order_data: [data]
                });
                return res.json({ success: true });
            } catch (error) {
                console.error("Error creating order:", error.message);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        } else {
            // Email exists, update the order data
            try {
                await OrderModel.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                return res.json({ success: true });
            } catch (error) {
                console.error("Error updating order:", error.message);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        }
    } catch (error) {
        console.error("Error handling request:", error.message);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


OrderRouter.post('/myOrders', async (req, res) => {
    try {
        const myData = await OrderModel.findOne({ email: req.body.email });
        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.status(404).json({ message: "Order data not found" });
        }
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});




module.exports = { OrderRouter };

