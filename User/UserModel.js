const { default: mongoose } = require("mongoose");

class UserModel {
    constructor(){
        this.schema = new mongoose.Schema ({
            email : {type:String , require:true, unique:true},
            firstName : {type:String , require:true},
            lastName : {type:String , require:true},
            phone : {type:String, require:true},
            password : {type:String , require:true},
            isAdmin : {type:Boolean,default:false}

        }, {timestamps:true})
    }
}
const user = new UserModel()

const userModel = mongoose.model("tbl_users", user.schema)
module.exports = userModel
