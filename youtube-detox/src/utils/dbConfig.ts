import mongoose from "mongoose";

const dbconnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("db successfully connected");
    } catch (error:any) {
        throw new Error(error);
    }
}

export default dbconnect;

