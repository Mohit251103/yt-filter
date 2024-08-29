import dbconnect from "@/utils/dbConfig";
import { Space } from "@/app/models/spaces/space-model";
import axios from "axios";
import { duration } from "@mui/material";
import { cookies } from "next/headers";

const fetchVideos = async (query: string) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/search',
        params:
        {
            query: query,
            type: 'video'
        },
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        cookies().set("continuation", response.data.continuation);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const fetchMoreVideos = async (query: string, token: any) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/search',
        params:
        {
            query: query,
            type: 'video',
            token: token.value
        },
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST,
            // 'x-token': token.value
        }
    };

    try {
        const response = await axios.request(options);
        cookies().delete("continuation");
        if(response.data.continuation){
            cookies().set("continuation", response.data.continuation);
        }
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// const fetchShorts = async (query:string) => {
//     const options = {
//         method: 'GET',
//         url: 'https://yt-api.p.rapidapi.com/search',
//         params: {
//           query: query,
//           type: 'shorts'
//         },
//         headers: {
//           'x-rapidapi-key': 'f4ff319effmsh3ff795f274ad49ap1c7f10jsn1524befd613e',
//           'x-rapidapi-host': 'yt-api.p.rapidapi.com'
//         }
//       };

//       try {
//           const response = await axios.request(options);
//           console.log(response.data);
//       } catch (error) {
//           console.error(error);
//       }
// }

export const GET = async (req: Request) => {
    try {
        await dbconnect();

        const urlSplit = req.url.split("/");
        const page = urlSplit[urlSplit.length - 1].split("?")[1].split("=")[1];
        const spaceId = urlSplit[urlSplit.length - 1].split("?")[0];
        const userId = urlSplit[urlSplit.length - 2];

        const space = await Space.find({ _id: spaceId, userId });
        let query = space[0].category;
        if (space[0].tags) {
            for (let tag of space[0].tags) {
                query += " " + tag;
            }
        }
        let videos;
        if (parseInt(page) > 1 && cookies().get("continuation")) {
            videos = await fetchMoreVideos(query, cookies().get("continuation"));
        }
        else if(parseInt(page) === 1) {
            videos = await fetchVideos(query);
        }
        
        // if(!videos){
        //     return Response.json({ title: space[0].title, videos, status: 200, success: true })
        // }
        return Response.json({ title: space[0].title, videos, status: 200, success: true });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Internal server error", status: 500, success: false });
    }
}