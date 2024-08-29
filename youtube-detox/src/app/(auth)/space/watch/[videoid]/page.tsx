"use client"
import Player from "@/app/components/video/Player";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";
import { ThemeContext } from "@/app/context/ThemeProvider";
import { ThreeDots } from "react-loader-spinner";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import axios from "axios";
import "../../css/scrollCssVideo.css"

interface videoDataType {
    title: String,
    description: String,
    lengthSeconds: String,
    channelId: String,
    channelDetails: channelDataType
    viewCount: String
}

interface channelDataType {
    title: string,
    avatar: [{ url: string, width: number, height: number }],
    subscriberCountText: string
}

const page = () => {
    const { videoid } = useParams();
    const { setDrop } = useContext(SidebarContext);
    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState<videoDataType>();
    const [expand, setExpand] = useState(false);

    const fetchChannelDetails = async (channelId: string) => {
        const options = {
            method: 'GET',
            url: 'https://yt-api.p.rapidapi.com/channel/about',
            params: {
                id: channelId
            },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY,
                'x-rapidapi-host': process.env.NEXT_PUBLIC_API_HOST
            }
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://yt-api.p.rapidapi.com/video/info',
            params: { id: videoid },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY,
                'x-rapidapi-host': process.env.NEXT_PUBLIC_API_HOST
            }
        };

        try {
            const response = await axios.request(options);
            const channelDetails = await fetchChannelDetails(response.data.channelId);
            console.log(channelDetails);
            const videoData = response.data;
            videoData.channelDetails = channelDetails;
            setData(videoData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (!data) {
        return (
            <div className='h-[100vh] flex flex-col justify-center items-center'>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="black"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    return (
        <div className={`bg-${theme === "dark" ? "[rgb(13,13,13)]" : "white"}`}>
            <Navbar />
            <div className={`flex flex-col ${theme === "dark" ? 'text-white' : 'text-black'}`} onClick={() => setDrop(false)}>
                <div className="w-full flex justify-center bg-[rgb(13,13,13)]">
                    <Player id={videoid as string} />
                </div>
                <div className="m-3 p-3 flex flex-col justify-center">
                    <p className="md:text-md lg:text-lg font-bold my-2">{data?.title}</p>
                    <div className="flex justify-center items-center w-fit">
                        <img src={`${data?.channelDetails.avatar[0].url}`} width={35} height={35} className="rounded-full mr-2" alt="" />
                        <div className="flex flex-col w-fi my-3">
                            <p>{data?.channelDetails.title}</p>
                            <p>{data.channelDetails.subscriberCountText} subscribers</p>
                        </div>
                    </div>
                    <div className={`rounded-md ${theme === "dark" ? "bg-black" : "bg-sky-50"} p-4 text-sm overflow-hidden hover:overflow-x-auto ${!expand ? "h-[30vh]" : ""} relative`}>
                        <p className="font-bold">{data.viewCount} views</p>
                        {data?.description.split("\n").map((line, index) => {
                            const urlRegex = /(https?:\/\/[^\s]+)/g;
                            const parts = line.split(urlRegex);
                            return (
                                <p key={index}>
                                    {parts.map((part, i) => {

                                        if (urlRegex.test(part)) {
                                            return (
                                                <a href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-indigo-600 text-nowrap">{part}</a>
                                            )
                                        }
                                        else {
                                            return (
                                                <span key={i}>{part}</span>
                                            )
                                        }

                                    })}
                                </p>
                            )
                        })}
                        {!expand ?
                            <div className={`w-[25px] h-[25px] rounded-full border-2 flex justify-center items-center ${theme=="dark"?
                            "border-white":"border-[black]"} z-10 absolute bottom-0 right-2`} onClick={() => setExpand(true)}>
                                <KeyboardDoubleArrowDownIcon />
                            </div> :
                            <div className={`w-[25px] h-[25px] rounded-full border-2 flex justify-center items-center ${theme=="dark"?
                                "border-white":"border-[black]"} z-10 absolute bottom-0 right-2`} onClick={() => setExpand(false)}>
                                <KeyboardDoubleArrowUpIcon />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;