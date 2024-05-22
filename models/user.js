const {Schema,model}= require("mongoose");

const userSchema=new Schema({

    fullName:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
     profilePhotoURL:{
        type:String,
        default:"/images/profile.png",
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User",
    }
},{timestamps:true})

const User= model("user",userSchema);

module.exports=User;