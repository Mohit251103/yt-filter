import React from 'react'
import spaceData from '@/utils/spaceRaw'
import { Button, Card, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/navigation";
const SpaceList = () => {
    const router = useRouter();
    return (
        <>
            <div className='flex justify-center items-center h-[85vh] w-full'>
                <div className='flex flex-wrap gap-4 w-[70%] h-full overflow-y-auto overflow-x-hidden'>
                    <Card sx={{ width: "300px", height: "370px", margin: "20px", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CardContent>
                            <div className='rounded-full relative hover:cursor-pointer' onClick={()=> router.push("/space/c")}>
                                <div className='rounded-full text-[150px] absolute hover:bg-gray-500/50 hover:opacity-25 h-full w-full'></div>
                                <AddIcon sx={{ fontSize:"150px",color: "grey" }} className='rounded-full z-1' />
                            </div>
                        </CardContent>
                    </Card>
                    {
                        spaceData.map((space) => {
                            return (
                                <Card sx={{ width: "300px", height: "370px", margin: "20px" }}>
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
                                        <Button variant='outlined' sx={{ marginTop: "5px" }} onClick={()=> router.push("/space/react")}>
                                            Start
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SpaceList