 Validator =   (data, type) => {
    let errors=[]

    if (type === "register"){
        if(!data.firstName){
            errors.push({key:"firstName", message:"Required Field Firstname is Empty"})
        }else if(data.firstName.length <= 2){
            errors.push({key:"firstName", message:"Firstname atleast 3 charachter"})
        } 
        if(!data.lastName){
            errors.push({key:"lastName", message:"Required Field Lastname is Empty"})
        }else if(data.lastName.length <= 2){
            errors.push({key:"lastName", message:"Lasttname atleast 3 charachter"})
        }
        if(!data.email){
            errors.push({key:"email", message:"Required Field email is Empty"})
            // eslint-disable-next-line
        }else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))){
            errors.push({key:"email", message:"Please enter Valid Email"})
        }
        if(!data.password){
            errors.push({key:"password", message:"Required Field password is Empty"})
            // eslint-disable-next-line
        }else if(!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(data.password))){
            errors.push({key:"password", message:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."})
        }


        if(!data.confirmpassword){
            errors.push({key:"confirmpassword", message:"requirefield confirmpassword is empty"})

        }else if(data.password !== data.confirmpassword){
            errors.push({key:"confirmpassword", message:"password and confirm password are not match"})
        }

        return errors

    }else {

        if(!data.email){
            errors.push({key:"email", message:"Required Field email is Empty"})
            // eslint-disable-next-line
        }else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))){
            errors.push({key:"email", message:"Please enter Valid Email"})
        }

        if(!data.password){
            errors.push({key:"password", message:"Required Field password is Empty"})
        }else if(!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(data.password))){
            errors.push({key:"password", message:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."})
        }

       

        return errors
    }
}

module.exports = Validator
