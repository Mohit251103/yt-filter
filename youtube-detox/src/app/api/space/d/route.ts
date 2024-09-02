import dbconnect from "@/utils/dbConfig";
import { Space } from "@/app/models/spaces/space-model";

export const DELETE = async (req:Request) => {
    try {
        dbconnect();
        const spaceId = req.url.split("?")[1].split("=")[1];

        const space = await Space.findById(spaceId);
        if(!space){
            return Response.json({error:"Space does not exist", status:400})
        }

        await Space.deleteOne({_id:spaceId});
        return Response.json({message:"Space deleted successfully", status:200});

    } catch (error) {
        Response.json({error:"Internal server error", status:500});
    }
}