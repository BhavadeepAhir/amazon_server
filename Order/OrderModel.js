const { default: mongoose } = require("mongoose");

class OrderModel {
    constructor() {
        this.schema = new mongoose.Schema({
            products: { type: Array, required: true },
            user: { type: Object, required: true },
            paymentMethod: { type: String, required: true, default: "cod" },
            paymentStatus: { type: String, required: true, default: "pending" },
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            ShippingDetails: { type: Object, required: true },
            deliveryStatus: { type: String, required: true, default: "pending" },
            deliverdIn: { type: Date, required: true },


        }, { timestamps: true })
    }
}

const order = new OrderModel();
const orderModel = mongoose.model("tbl_order", order.schema)
module.exports = orderModel
