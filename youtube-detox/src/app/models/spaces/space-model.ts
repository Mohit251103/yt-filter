import mongoose from "mongoose";

const now = new Date();

const SpaceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        minlength:[1,"can't be blank"]
    },
    description:{
        type:String,
        maxlength:[200,"can't be more than 200 characters"]
    },
    displayPhoto:{
        type:String
    },
    tags:[String],
    shortsVisible:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:String,
        default:`${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`}
})

export const Space = mongoose.models.spaces || mongoose.model("spaces",SpaceSchema); 