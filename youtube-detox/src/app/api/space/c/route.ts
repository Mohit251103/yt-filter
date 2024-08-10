import dbconnect from "@/utils/dbConfig";
import { Space } from "@/app/models/spaces/space-model";

export const POST = async (req: Request, res: Response) => {
    try {
        await dbconnect();
        const space:any = await req.json();

        const id = req.url?.split("?id=")[1];

        const tags = space.tags?.split("#").slice(1);
        const data = {
            userId:id,
            title:space.title,
            category:space.category,
            description:space.description,
            displayPhoto:space.photo,
            shortsVisible: space.needShorts === "1"? true : false,
            tags
        }

        await Space.create(data);
        return Response.json({message:"Space added successfully",status:200,success:true});

    } catch (error) {
        console.log(error)
        return Response.json({message:"Internal server error",error,status:500,success:false});
    }
}

dbconnect()