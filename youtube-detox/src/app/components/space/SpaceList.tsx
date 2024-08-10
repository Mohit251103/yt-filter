import React, { useContext } from 'react'
import spaceData from '@/utils/spaceRaw'
import { Button, Card, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import "./css/space.css"
import { Footer } from '../footer/Footer';
import { ThemeContext } from '@/app/context/ThemeProvider';
const SpaceList = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[92vh] w-full'>
                <div className='flex justify-center flex-wrap gap-4 w-[70%] h-full overflow-y-auto overflow-x-hidden'>
                    <Card sx={{ width: "300px", height: "370px", margin: "20px", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CardContent>
                            <div className='rounded-full relative hover:cursor-pointer' onClick={() => router.push("/space/c")}>
                                <div className='rounded-full text-[150px] absolute hover:bg-gray-500/50 hover:opacity-25 h-full w-full'></div>
                                <AddIcon sx={{ fontSize: "150px", color: "grey" }} className='rounded-full z-1' />
                            </div>
                        </CardContent>
                    </Card>
                    {
                        spaceData.map((space) => {
                            return (
                                // <div className='shadow-xl w-fit h-fit'>
                                    <Card sx={{ width: "300px", margin: "20px", backgroundColor:`${theme=="dark" && "black"}`, color:`${theme=="dark" && "rgb(203 213 225)"}`}} className={`md:h-[380px] sm:h-fit shadow-xl ${theme=="dark"? "shadow-black":""}`}>
                                        <CardMedia >
                                            <img src={space.displayPhoto} className='brightness-50' />
                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant='h4' sx={{ fontWeight: "bold" }}>
                                                {space.title}
                                            </Typography>
                                            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                                                Category: {space.category}
                                            </Typography>
                                            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                                                Created At: {space.createdAt}
                                            </Typography>
                                            <Button variant='outlined' sx={{ marginTop: "5px" }} onClick={() => router.push("/space/react")}>
                                                Start
                                            </Button>
                                        </CardContent>
                                    </Card>
                                // </div>
                            )
                        })
                    }
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default SpaceList