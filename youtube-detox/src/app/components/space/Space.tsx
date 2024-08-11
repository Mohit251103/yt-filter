import { ThemeContext } from "@/app/context/ThemeProvider"
import { useContext, useEffect, useState } from "react"
import { video } from '@/utils/rawData';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import { Footer } from "../footer/Footer";
import axios from "axios";
import { UserContext } from "@/app/context/UserProvider";
import { useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
// import "./css/space.css"

interface videoDataType {
    type: string,
    title: string,
    channelTitle: string,
    description: string
    thumbnail: [{ url: string, width: number, height: number }],
    viewCount: string,
    videoId: string,
    publishedTimeText: string,
    channelThumbnail: [{ url: string, width: number, height: number }]
}

export const Space = ({ name, id, userId }: { name: string, id: string, userId: string }) => {
    const { theme } = useContext(ThemeContext);
    const { data: session, status } = useSession();

    const [video, setVideo] = useState<videoDataType[]>([]);
    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/space/get/${userId}/${id}`);
            console.log(res.data.data.data);
            setVideo(res.data.data.data);
            return res.data.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(userId);
        // console.log(session);
        // if (userId) {
        fetchData()
        // }
    }, [])

    // console.log(video);
    let shorts: any = video.map((item) => {
        // console.log(item.title.split("#"), item.type);
        let itemType = item.title.split("#")[1];
        if (itemType === "shorts") {
            return item;
        }
    });
    if (!video.length) {
        return (
            <div className='flex flex-col justify-center items-center'>
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
    // shorts = shorts[shorts.length - 1];
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className={`text-center text-4xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mb-4`}><span className='text-indigo-500'>{name[0].toUpperCase() + name.substring(1)}</span> Space</h2>
            <div className='flex h-[80vh] w-[100vw] justify-center items-center'>

                <div className='flex flex-wrap gap-4 w-min h-full overflow-y-auto overflow-x-hidden'>
                    {video.map((item) => {
                        if (item.type === 'video') {
                            return (
                                <div className='relative w-fit h-fit'>
                                    <Card sx={{ width: item.thumbnail?.length && item.thumbnail[0].width, height: item.thumbnail?.length && item.thumbnail[0].height + 150, backgroundColor: theme === "dark" ? "black" : "white" }}>
                                        <CardMedia sx={{ width: item.thumbnail?.length && item.thumbnail[0].width, height: item.thumbnail?.length && item.thumbnail[0].height }}>
                                            {item.thumbnail?.length && <img src={item.thumbnail[0].url} />}
                                        </CardMedia>
                                        <CardContent>
                                            <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.title}</p>
                                            <p className={`absolute bottom-3 text-lg text-slate-500 flex`}>
                                                <img src={`${item.channelThumbnail?.length && item.channelThumbnail[0].url}`} className='rounded-full me-1' width={30} height={20} alt="" />
                                                {item.channelTitle}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        }
                    })}
                </div>

                {/* {shorts?.length && <div className='flex flex-col overflow-y-auto overflow-x-hidden w-fit h-full mr-3'>
                    <p className={`${theme === "dark" ? 'bg-[rgb(13,13,13)]' : 'bg-white'} sticky top-0 text-center text-2xl font-bold text-indigo-500`}>Shorts</p>

                    {shorts.map((item: any) => {
                        // if (item && item.type === "shorts") {

                        <div className='w-fit m-3'>
                            <Card sx={{ width: "320px", backgroundColor: theme === "dark" ? "black" : "white", boxShadow: "" }} className="sm: md:h-[500px] shadow-black">
                                <CardMedia sx={{ height: "fit-content", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                    <img src={`${item.thumbnail?.length && item.thumbnail[0].url}`} />
                                </CardMedia>
                                <CardContent>
                                    <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.title}</p>
                                </CardContent>
                            </Card>
                        </div>

                        // }
                    })}

                </div>} */}
            </div>
            <Footer />
        </div>)
}