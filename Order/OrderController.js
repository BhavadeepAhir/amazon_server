const Razorpay = require("razorpay");
const orderModel = require("./OrderModel")

function CreateRazorPayOrder(options) {
    return new Promise((resolve, reject) => {
        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })
}

class OrderController {
    constructor() {

    }

    async CreateOrder(req, res) {
        try {
            const { products, paymentMethod, ShippingDetails, userInfo, totalPrice } = req.body
            console.log(req.body);
            if (!products) {
                return res.status(400).send({ message: "Bad Request of Product" })
            }
            if (!paymentMethod) {
                return res.status(400).send({ message: "Bad Request of payment Method" })
            }
            if (!ShippingDetails) {

                return res.status(400).send({ message: "Bad Request of Shipping Details" })
            }
            if (!userInfo) {
                return res.status(400).send({ message: "Bad Request of User" })
            }
            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + 5)
            const orderDetails = {
                products: products,
                paymentMethod,
                ShippingDetails,
                user: userInfo,
                deliverdIn: deliveryDate,
                totalPrice: totalPrice,
                price: totalPrice
            }


            const createOrder = await orderModel.create(orderDetails)
            if (!createOrder) return res.status(500).send({ message: "Somthing went wrong" })
            let order = { ...createOrder._doc, razorPayDetails: null }
            if (paymentMethod === "cod") {
                return res.status(200).send({ message: "Sucess", order })
            } else {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }

                const RazorpayResult = await CreateRazorPayOrder(options)
                console.log(RazorpayResult);
                if (!RazorpayResult) return res.status(500).send({ message: "something Went Wrong." })

                order = {
                    ...createOrder._doc,
                    razorPayDetails: { ...RazorpayResult, apikey: process.env.API_KEY }
                }
                return res.status(200).send({ message: "success", order })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async paymentVerify(req, res) {
        const { razorpayOrderId, orderId, razorpay_payment_id } = req.body
        const instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })
        try {
            const response = await instance.payments.fetch(razorpay_payment_id)
            if ((response.status === "captured" || response.status === "authorized") && response.order_id === razorpayOrderId) {
                const update = await orderModel.updateOne({ _id: orderId }, { paymentStatus: "verify" })
                if (update.modifiedCount > 0) {
                    return res.status(200).send({ message: "Success", orderId: orderId })
                }
                return res.status(500).send({ message: "Somthing went wrong" })
            } else {
                await orderModel.updateOne({ _id: orderId }, { paymentStatus: "reject" })

                return res.status(400).send({ message: "Payment Verification failed" })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }


    async getuserOrder(req, res) {
        try {
            const orders = await orderModel.find({ 'user._id': req.body.userInfo._id })
            if (orders) {
                return res.status(200).send({ message: "Success", orders })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params
            const order = await orderModel.findById(id)
            if (order) return res.status(200).send({ message: "Success", order })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }



}

const orderController = new OrderController()
module.exports = orderController