const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
})

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = {
    OrderModel
};
