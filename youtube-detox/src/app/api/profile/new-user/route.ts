import { User } from "@/app/models/auth/user-model";
import dbconnect from "@/utils/dbConfig";
import type { NextApiRequest,NextApiResponse } from "next";

export const POST = async (req:NextApiRequest, res:NextApiResponse) => {
    // try {
    //     await dbconnect();
        
    //     res.status(200).json({success:true});
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({success:false});
    // }
}