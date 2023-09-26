
const express = require("express")
const productController = require("./Product/ProductController")
const app = express()
const cors = require("cors")
const ConnectMongo = require("./Connection")
const userController = require("./User/UserController")
const orderController = require("./Order/OrderController")
const Authentication = require("./AUTH/Auth")

require("dotenv").config()

ConnectMongo()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
})
// app.post("/product" , productController.InsertProducts)
app.get("/product", productController.getProducts)
app.get("/product/:id", productController.GetProductById)
app.post("/User", userController.insterUser)
app.post("/cart", productController.Getcart)
app.post("/User/login", userController.userLogin)
app.post("/User/signup", userController.userRegister)
app.use(Authentication.CreateOrderAuth,)
app.post("/order", orderController.CreateOrder)



app.listen(5000, () => {
    console.log("serve is started");
})





