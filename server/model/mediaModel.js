const mongoose=require('mongoose')

const mediaSchema=new mongoose.Schema({
      location: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      likes:{
        type:Array,
        required:false,
      },
      userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      comment:{
        type:String,
      }
    }, { timestamps: true });

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
