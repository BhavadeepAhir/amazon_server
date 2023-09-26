const productModel = require("./ProductModel")

class ProductController {

  // async InsertProducts(req, res) {
  //   try {
  //     const { products } = req.body
  //     if(!products){
  //       return res.status(400).send({ message: "Missing Dependency Product" })
  //     }
  //     const result = await productModel.insertMany(products)
  //     if(!result){
  //       return res.status(500).send({ message: "Something Went Wrong" })
  //     }

  //     return res.status(200).send({ message: "Success" })
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ message: "internal server error" })

  //   }
  // }

  async getProducts(req, res) {
    try {
      const result = await productModel.find()
      if (!result) return res.status(500).send({ message: "Something Went Wrong" })
      return res.status(200).send({ message: "Success", products: result })
    } catch (error) {
      return res.status(500).send({ message: "internal server error" })
    }
  }

  async GetProductById(req, res) {
    try {
      const { id } = req.params
      const result = await productModel.findById(id)
      if (!result) return res.status(500).send({ message: "Something Went Wrong" })
      return res.status(200).send({ message: "Success", products: result })
    } catch (error) {
      return res.status(500).send({ message: "internal server error" })
    }
  }

  async Getcart(req, res) {

    try {
      const { products } = req.body
      if (!products) {

        return res.status(400).send({ message: "Missing dependency products" })



      }
      const cart = await productModel.find({ _id: products }).select(['name', 'price', 'brand', 'countInStock', '_id', 'image'])
      if (!cart) return res.status(200).send({ message: "something went wrong" })
      return res.status(200).send({ message: "success", cart: cart })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "internal server error" })
    }

  }
}

const productController = new ProductController

module.exports = productController

