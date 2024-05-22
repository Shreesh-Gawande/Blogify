const express= require("express");
const path=require("path");
const userRoute=require("./routes/user");
const mongoose=require("mongoose");


const app= express();
const PORT=8000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine","ejs");
app.set("views", path.resolve("./views"));
app.use("/user",userRoute)

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(()=>console.log("MongoDB Connected"));


app.get("/",(req,res)=>{
    return res.render("home");
})

app.listen(PORT,()=> console.log("Server started at PORT 8000"));