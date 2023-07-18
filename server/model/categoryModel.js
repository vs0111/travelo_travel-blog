const mongoose=require('mongoose')

const CatSchema =new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    blogs:{
        type:Array,
        required:false
    }}, { timestamps: true }
        
);
  
    
const Category= mongoose.model("Category", CatSchema);

module.exports =Category;