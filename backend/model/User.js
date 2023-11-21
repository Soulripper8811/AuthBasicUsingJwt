import mongoose from "mongoose";

const  UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
    }
})
const UserModel=mongoose.model("user",UserSchema);
export default UserModel





