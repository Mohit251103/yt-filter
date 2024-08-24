import dbconnect from "@/utils/dbConfig";
import { Space } from "@/app/models/spaces/space-model";
import axios from "axios";
import { duration } from "@mui/material";

const fetchVideos = async (query:string) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/search',
        params: {
          query: query,
          type: 'video'
        },
        headers: {
          'x-rapidapi-key': 'f4ff319effmsh3ff795f274ad49ap1c7f10jsn1524befd613e',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
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
        const videos = await fetchVideos(query);
        // const shorts = await fetchShorts(query);

        return Response.json({title: space[0].title, videos,status:200, success:true});
    } catch (error) {
        console.log(error);
        return Response.json({message:"Internal server error", status:500, success:false});
    }
}