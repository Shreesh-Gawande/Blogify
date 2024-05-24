const {Schema,model}= require("mongoose");

const blgSchema= new Schema({
    blogTitle:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    blogImageURL:{
        type:String,  
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
},{timestamps:true})

const Blog= model("blog",blgSchema);

module.exports={
    Blog
}