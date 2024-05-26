const express= require("express");
const path=require("path");
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const { Blog } = require('./models/blog');


const app= express();
const PORT=8000;
app.use(express.static(path.resolve('./public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))



app.set("view engine","ejs");
app.set("views", path.resolve("./views"));
app.use("/user",userRoute)
app.use("/blog",blogRoute);

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(()=>console.log("MongoDB Connected"));


app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    return res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})

app.listen(PORT,()=> console.log("Server started at PORT 8000"));