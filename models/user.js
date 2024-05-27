const {Schema,model}= require("mongoose");
const {createHmac,randomBytes}=require("crypto");        //createHmac helps us to hach the password
const {createTokenForUser}=require("../services/authentication")

const userSchema=new Schema({

    fullName:{
        type:String,
        required:true,
    },
    salt:{
        type:String,

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
        default:"uploads\profile.png",
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
    this.password=hashedPassword;      //we update the password with the hashed password

    next();
})

//using a virtula function
userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user= await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt=user.salt;
    const userProvidedHash=createHmac("sha256",salt)
    .update(password).digest("hex");

    const hashedPassword=user.password;

    if(hashedPassword!==userProvidedHash)throw new Error("Invalid password");

    const token=createTokenForUser(user);
    return token;
})

const User= model("user",userSchema);

module.exports=User;