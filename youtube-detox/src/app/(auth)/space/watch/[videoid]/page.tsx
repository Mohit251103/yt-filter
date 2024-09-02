"use client"
import Player from "@/app/components/video/Player";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation"
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";
import { ThemeContext } from "@/app/context/ThemeProvider";
import { ThreeDots } from "react-loader-spinner";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios";
import "../../css/scrollCssVideo.css"
import { SetStateAction } from "react";

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
    const { setDrop,setOpen } = useContext(SidebarContext);
    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState<videoDataType>();
    const [expand, setExpand] = useState(false);
    const overflow = useRef<HTMLDivElement>(null);
    // const [overflowing, setOverflowing] = useState(false);

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

    const isOverflowing = () => {
        let element = overflow.current;
        console.log(element)
        if ((element as HTMLDivElement)?.scrollHeight > (element as HTMLDivElement)?.clientHeight) {
            return true;
        }
        return false;
    }
    // useEffect(() => {
    //     if (!data) return;

    //     let element = overflow.current;
    //     if (element?.scrollHeight > element?.clientHeight) {
    //         setOverflowing(true);
    //     }
    // }, [data?.description]);

    if (!data) {
        return (
            <div className={`flex flex-col justify-center items-center h-[100vh] w-[100vw] ${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`}>
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
        <div className={`bg-${theme === "dark" ? "[rgb(13,13,13)]" : "white"} ${!expand?"md:h-[100vh]":""} lg:h-auto`}>
            <Navbar />
            <div className={`flex flex-col ${theme === "dark" ? 'text-white' : 'text-black'}`} onClick={() => {setDrop(false); setOpen(false);}}>
                <div className="w-full flex justify-center bg-[rgb(13,13,13)]">
                    <Player id={videoid as string} />
                </div>
                <div className={`m-3 p-3 flex flex-col justify-center`}>
                    <p className="md:text-md lg:text-lg font-bold my-2">{data?.title}</p>
                    <div className="flex justify-center items-center w-fit">
                        <img src={`${data?.channelDetails.avatar[0].url}`} width={35} height={35} className="rounded-full mr-2" alt="" />
                        <div className="flex flex-col w-fi my-3">
                            <p>{data?.channelDetails.title}</p>
                            <p>{data.channelDetails.subscriberCountText} subscribers</p>
                        </div>
                    </div>

                    <div
                        ref={overflow}
                        className={`rounded-md ${theme === "dark" ? "bg-black" : "bg-sky-50"} p-4 text-sm overflow-hidden hover:overflow-x-auto text-ellipsis ${!expand ? "sm:h-[20vh] lg:h-[25vh] h-[33vh]" : ""} relative`}
                    >
                        <p className="font-bold">{data.viewCount} views</p>
                        <>
                            {data?.description.split("\n").filter((line, index) => index < 5).map((line, index) => {
                                const urlRegex = /(https?:\/\/[^\s]+)/g;
                                const parts = line.split(urlRegex);
                                return (
                                    <p key={index}>
                                        {parts.map((part, i) => (
                                            urlRegex.test(part) ? (
                                                <a href={part} key={i} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-indigo-600 text-nowrap">
                                                    {part}
                                                </a>
                                            ) : (
                                                <span key={i}>{part}</span>
                                            )
                                        ))}
                                    </p>
                                );
                            })}

                            {data?.description.split("\n").length>5 && !expand && (
                                <span className="font-bold text-blue-600 hover:cursor-pointer" onClick={() => setExpand(true)}>
                                    ...show more
                                </span>
                            )}
                        </>

                        {expand && (
                            <>
                                {data?.description.split("\n").map((line, index) => {
                                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                                    const parts = line.split(urlRegex);
                                    return (
                                        <p key={index}>
                                            {parts.map((part, i) => (
                                                urlRegex.test(part) ? (
                                                    <a href={part} key={i} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-indigo-600 text-nowrap">
                                                        {part}
                                                    </a>
                                                ) : (
                                                    <span key={i}>{part}</span>
                                                )
                                            ))}
                                        </p>
                                    );
                                })}

                                <p className="font-bold text-blue-600 hover:cursor-pointer" onClick={() => setExpand(false)}>
                                    Show Less
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;