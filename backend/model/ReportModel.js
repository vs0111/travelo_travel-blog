const mongoose=require('mongoose')

const ReportSchema =new mongoose.Schema({
    blog:{
        type:String,
        required:true,
    },
    reportedBy:{
        type:String,
        required:false
    },
    reasons:{
        type: String,
        required:false
    },
},
    { timestamps: true })
        
  
    
const Report= mongoose.model("Report", ReportSchema);

module.exports =Report;