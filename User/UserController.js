const bcrypt = require("bcrypt")
const userModel = require("./UserModel")
const jwt = require("jsonwebtoken")
const Validator = require("./Validator")
 

class UserController {
    constructor() { }
    async insterUser(req, res) {
        try {
            const { firstName, lastName, email } = req.body

            const password = bcrypt.hashSync(req.body.password, 8)
            if (!password) {
                return res.status(500).send({ message: "Something Went Wrong" })

            }

            req.body.password = password
            const result = await userModel.create(req.body)
            if (result) {
                return res.status(200).send({ message: "success", user: result })

            }
            return res.status(500).send({ message: "Something Went Wrong" })
        } catch (error) {

            return res.status(500).send({ message: "internal server error" })

        }

    }

    async userLogin(req, res) {

        try {
            const { email, password } = req.body

            const ValidationResult = Validator(req.body, 'login')

            console.log(ValidationResult);

            if (ValidationResult.length > 0){

                return res.status(400).send({message:"Validation Error", errors : ValidationResult})

            }

            let user = await userModel.findOne({ email: email })
            if (!user) {
                return res.status(400).send({ message: "Auth Error", errors:[{key:"email", message:"Email is not exist"}] })
            }

            user = user._doc
            if (!(bcrypt.compareSync(password, user.password))) {

                return res.status(400).send({ message: "Auth Error", erros:[{key:"password", message:"password and email are not match"}] })


            }

            delete user.password

            const token = jwt.sign(user, process.env.JWT_SECRATE, { expiresIn: "30d" })
            if (!token) {
                return res.status(500).send({ message: "somethinng went wrong" })
            }
            return res.status(200).send({ message: "success", user: { ...user, token: token } })

        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: "internal server error" })
        }



    }

    async userRegister(req, res) {
        try {


            const ValidationResult = Validator (req.body, 'register')

            console.log(ValidationResult);

            if (ValidationResult.length > 0){
                console.log(ValidationResult);

                return res.status(400).send({message:"Validation Error validation", errors : ValidationResult})


            }

            

            const password = bcrypt.hashSync(req.body.password, 8)

            if(!password){
                return res.status(500).send({message:"somethinf went wront"})
            }

            

            let user = await userModel.create({...req.body, password:password})

            if(!user){
            return     res.status(500).send({message:"somethinf went wront"})
            }
            
            user = user._doc
            delete user.password

            const token = jwt.sign(user, process.env.JWT_SECRATE,{expiresIn : "30d"})
            if(!token){
                return  res.status(500).send({message:"somethinf went wront"})
            }
            return res.status(200).send({message:"success", user:{...user, token}})

            


        } catch (error) {
            console.log(error);
            if(error.code === 11000 || error.code === "11000"){
                return res.status(400).send({message:"Validation error", errors:[{key:"email", message:"Email is already exist"}]})
            }
            return  res.status(500).send({message:"internal error"})
            
        }

    }


}

const userController = new UserController()

module.exports = userController