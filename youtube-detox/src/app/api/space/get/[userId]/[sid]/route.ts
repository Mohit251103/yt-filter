import dbconnect from "@/utils/dbConfig";
import { Space } from "@/app/models/spaces/space-model";
import axios from "axios";

const fetchVideos = async (query:string) => {
    try {
        const config = {
            url:`https://yt-api.p.rapidapi.com/search`,
            method:"GET",
            headers:{
                'content-type':'application/json',
                'x-rapidapi-host':process.env.API_HOST,
                'x-rapidapi-key':process.env.API_KEY
            },
            params:{
                'query':query
            }
        }
        const data = await axios(config);
        // console.log(data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const GET = async (req:Request) => {
    try {
        await dbconnect();
        // console.log(req.url.split("/"));
        // console.log(req.url)
        const urlSplit = req.url.split("/");
        // console.log(urlSplit);
        const spaceId = urlSplit[urlSplit.length-1];
        const userId = urlSplit[urlSplit.length-2];

        const space = await Space.find({_id:spaceId, userId});

        // console.log(spaceId,userId);
        // console.log(space)
        let query = space[0].category;
        if (space[0].tags){
            for(let tag of space[0].tags){
                query += " "+tag;
            }
        }
        const data = await fetchVideos(query);

        return Response.json({data:data,status:200, success:true});
    } catch (error) {
        console.log(error);
        return Response.json({message:"Internal server error", status:500, success:false});
    }
}