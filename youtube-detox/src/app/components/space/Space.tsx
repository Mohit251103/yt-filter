import { ThemeContext } from "@/app/context/ThemeProvider"
import { useContext } from "react"
import { video } from '@/utils/rawData';
import { Button, Card, CardContent, CardMedia } from '@mui/material';

export const Space = () => {
    const {theme} = useContext(ThemeContext);
    let shorts: any = video.data.map((item) => {
        if (item.type === "shorts_listing") {
            return item.data;
        }
    });
    shorts = shorts[shorts.length - 1];
    return (
    <>
    <h2 className={`text-center text-4xl font-bold ${theme==="dark"?"text-white":"text-black"} mb-4`}><span className='text-indigo-500'>React</span> Space</h2>
    <div className='flex h-[83vh] m-auto justify-center items-center'>

        <div className='w-fit h-full overflow-auto grid grid-cols-2 gap-2'>
            {video.data.map((item) => {
                if (item.type === "video") {
                    return (
                        <div className='relative m-4 w-fit h-fit'>
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
            {/* <FolderCopyIcon color='primary' sx={{ fontSize: "100px" }} />
            <p className='text-slate-500/100 text-3xl font-medium'>No Spaces</p> */}
        </div>

        <div className='flex flex-col overflow-auto overflow-x-hidden h-full w-fit m-3'>
            <p className={`${theme==="dark"?'bg-[rgb(13,13,13)]':'bg-white'} sticky top-0 text-center text-2xl font-bold text-indigo-500`}>Shorts</p>
            {
                shorts.length && shorts.map((item: any) => {
                    if (item && item.type === "shorts") {
                        return (
                            <div className='w-fit m-3'>
                                <Card sx={{ width: "320px", backgroundColor: theme === "dark" ? "black" : "white" }}>
                                    <CardMedia sx={{ height: "fit-content", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                        <img src={`${item.thumbnail?.length && item.thumbnail[0].url}`} />
                                    </CardMedia>
                                    <CardContent>
                                        <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.title}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    }
                })
            }
        </div>
    </div>
    </>)
}