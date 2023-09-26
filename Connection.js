const { default: mongoose } = require("mongoose");


async function ConnectMongo (){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/amazon1")
        console.log("DB connected");
    } catch (error) {
        console.log("db not connected");
    }
}   

module.exports = ConnectMongo