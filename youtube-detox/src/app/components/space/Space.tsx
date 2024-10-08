import { ThemeContext } from "@/app/context/ThemeProvider"
import { useContext, useEffect, useRef, useState } from "react"
import { video } from '@/utils/rawData';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import { Footer } from "../footer/Footer";
import axios from "axios";
import { UserContext } from "@/app/context/UserProvider";
import { useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
import "./css/space.css"
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";

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

export const Space = ({ id, userId }: { id: string, userId: string }) => {
    const { theme } = useContext(ThemeContext);
    // const { data: session, status } = useSession();

    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const [video, setVideo] = useState<videoDataType[]>([]);
    const [more, setMore] = useState(true);
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/space/get/${userId}/${id}?page=${page}`);
            console.log(res.data.videos);
            if (!res.data.videos) {
                setMore(false);
                setLoading(false);
                return;
            }
            setVideo(() => [...video, ...res.data.videos.data]);
            setName(res.data.title);
            setLoading(false);
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
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && more) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading]);


    // console.log(video);
    // let shorts: any = video.map((item) => {
    //     // console.log(item.title.split("#"), item.type);
    //     let itemType = item.title.split("#")[1];
    //     if (itemType === "shorts") {
    //         return item;
    //     }
    // });
    if (!video.length) {
        return (
            <div className={`flex flex-col justify-center items-center h-[95vh] w-[100vw] ${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`}>
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
        // <div className="flex flex-col justify-center items-center">
        <>
            <p className={`text-center md:text-4xl text-2xl text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mb-4`}><span className='text-indigo-500'>{name[0].toUpperCase() + name.substring(1)}</span> Space</p>
            <div className='flex flex-col w-[100vw] justify-center items-center overflow-y-scroll overflow-x-hidden'>

                <div className='flex flex-wrap gap-4 lg:w-[900px] md:w-[80vw] w-[95vw]'>
                    {video.map((item) => {
                        if (item.type === 'video') {
                            return (
                                <div className='relative'>
                                    <Card sx={{ backgroundColor: theme === "dark" ? "black" : "white", display: "flex", flexDirection: "row" }} className="lg:w-[900px] w-[95vw] md:w-[80vw]">
                                        <CardMedia >
                                            {/* <div className={`w-[${item.thumbnail?.length && item.thumbnail[0].width}px] h-[${item.thumbnail?.length && item.thumbnail[0].height}px]`}></div> */}
                                            {item.thumbnail?.length && <img src={item.thumbnail[0].url} className="lg:w-[360px] md:w-[30vw] lg:h-[202px] h-full w-[33vw]" />}
                                        </CardMedia>
                                        <CardContent className="p-[8px]">
                                            <Link className={`text-xs md:text-[1.1rem] lg:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`} href={`/space/watch/${item.videoId}`}>{item.title}</Link>
                                            <p className={`text-xs md:text-xl text-slate-500 flex`}>
                                                <img src={`${item.channelThumbnail?.length && item.channelThumbnail[0].url}`} className='rounded-full me-1 h-[20px] w-[20px] md:h-[30px] md:w-[30px]' alt="" />
                                                {item.channelTitle}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        }
                    })}
                </div>

                {loading && <p><ColorRing
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['black','black','black','black','black']}
                /></p>}
                <div ref={observerRef} style={{ height: '20px', color: "white" }}></div>

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
        </>)
    // </div>)
}