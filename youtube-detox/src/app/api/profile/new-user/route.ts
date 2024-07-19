import { User } from "@/app/models/auth/user-model";
import dbconnect from "@/utils/dbConfig";
import { getServerSession } from "next-auth";
import options from "../../auth/[...nextauth]/options";
import { cookies } from "next/headers";
// import type { NextApiRequest,NextApiResponse } from "next";

export const POST = async (req:Request) => {
    try {
        await dbconnect();
        const {username} = await req.json();

        if(await User.findOne({username})){
            return Response.json({message:"Username occupied",success:false});
        }

        const session = await getServerSession(options);
        const user = await User.findOne({email:session?.user.email});
        if(!user){
            return Response.json({message:"User does not exist",success:false, status:404});
        }

        user.username = username;
        await user.save();
        cookies().set("username",username);
        return Response.json({message:"Username successfully added",success:true,status:200});
    } catch (error) {
        console.log(error);
        Response.json({message:error,status:500,success:false});
    }
}