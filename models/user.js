const {Schema,model}= require("mongoose");
const {createHmac,randomBytes}=require("crypto");        //createHmac helps us to hach the password

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

//Process to hash a password
userSchema.pre("save",function (next){           //This function runs before we have tosave any user
    const user=this;

    if(!user.isModified("password"))return;

    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac("sha256",salt)
    .update(user.password).digest("hex");

    this.salt=salt;
    this.passwor=hashedPassword;      //we update the password with the hashed password

    next();
})

const User= model("user",userSchema);

module.exports=User;