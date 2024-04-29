import mongoose from "mongoose";
const message=new mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ReceiverId:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"User"
    },
    message:{
        type:String,
        required:true
    },{timestamps:true}
})