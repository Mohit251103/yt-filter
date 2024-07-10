import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    // uid:{
    //     type:String,
    //     require:[true,"can't be blank"]
    // },
    username:{
        type:String,
        minlength:[5,"can't be less than 5"],
        maxlength:[15,"can't be greater"],
        unique:true,
        sparse:true
    },
    email:{
        type:String,
        required:true,
        match:[/^[a-z0-9]+(?:[._-][a-z0-9]+)*@[a-z0-9.-]+\.[a-z]{2,}$/,"must be a-z, 0-9, @,- and . "],
    },
    googleId:{
        type:String,
        unique:true,
        required:[true,"can't be blank"]
    },
    profilePhoto:{
        type:String
    }
})

export const User = mongoose.models.users || mongoose.model("users",UserSchema);