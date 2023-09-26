const { default: mongoose } = require("mongoose");

class ProductModel {
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type: String, require:true},
            price:{type:String,require:true},
            numReviews:{type:Number, require:true},
            desc:{type:String, default:null },
            rating:{type:Number, require:true, default:1},
            image:{type:String,require:true},
            brand:{type:String,require:true},
            category:{type:String,require:true},
            countInStock:{type:Number, require:true}

        })
    }
}

const Product = new ProductModel 

const productModel = mongoose.model("tbl_products", Product.schema)

module.exports = productModel